import { generateObject, streamText, type CoreMessage } from "ai";
import { z } from "zod";

import { getBookText } from "@/services/gutenbergService";

import { google } from "@ai-sdk/google";
import { asyncWrapper } from "@/utils/asyncWrapper";

const CHUNK_SIZE = 2_000_000;

const splitText = (text: string, chunkSize: number) => {
  const chunks = [];
  for (let i = 0; i < text.length; i += chunkSize) {
    chunks.push(text.slice(i, i + chunkSize));
  }
  return chunks;
};

export const graphAiSchema = z.object({
  nodes: z.array(z.object({ id: z.string() })),
  links: z.array(
    z.object({
      source: z.string(),
      target: z.string(),
      relation: z.string(),
    })
  ),
});

export type GraphData = z.infer<typeof graphAiSchema>;

export const createGraphData = async (bookText: string) => {
  return asyncWrapper(async () => {
    const chunks = splitText(bookText, CHUNK_SIZE);

    const systemMessage =
      "You will receive as prompt the text of a book, extract the characters and the relation between them";

    const chunkPromises = chunks.map((chunk) =>
      generateObject({
        model: google("gemini-2.0-flash-001"),
        schema: graphAiSchema,
        system: systemMessage,
        prompt: chunk,
      })
    );

    const results = await Promise.allSettled(chunkPromises);
    const fulfilled = results.filter(
      (r): r is PromiseFulfilledResult<any> => r.status === "fulfilled"
    );

    if (fulfilled.length === 0) {
      throw new Error("All AI calls failed");
    }

    if (fulfilled.length === 1) {
      return { bookGraphData: fulfilled[0].value.object };
    }

    const summaryPrompt = fulfilled
      .map((res, i) => `Chunk ${i + 1}: ${JSON.stringify(res.value.object)}`)
      .join("\n");

    const final = await generateObject({
      model: google("gemini-2.0-flash-001"),
      schema: graphAiSchema,
      system:
        "You will receive multiple character-relationship maps from different parts of the book. Combine them into one coherent map.",
      prompt: summaryPrompt,
    });

    return { bookGraphData: final.object as GraphData };
  });
};

interface ChatAboutTheBook {
  bookId: string;
  messages: CoreMessage[];
}
export const chatAboutTheBook = async ({
  bookId,
  messages,
}: ChatAboutTheBook) => {
  return asyncWrapper(async () => {
    const bookContent = await getBookText(Number(bookId));
    if (!bookContent.success) throw new Error("Book not found");

    const result = streamText({
      model: google("gemini-2.0-flash-001"),
      system: `You are a helpfull assistent that will answer questions about this book: ${bookContent.result}`,
      messages,
    });

    return result
  });
};
