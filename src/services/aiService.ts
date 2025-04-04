import {
  generateObject,
  streamText,
  type CoreMessage,
  generateText,
  type GenerateObjectResult,
} from "ai";
import { z } from "zod";

import { getBookText } from "@/services/gutenbergService";

import { google } from "@ai-sdk/google";
import { groq } from "@ai-sdk/groq";
import { asyncWrapper } from "@/utils/asyncWrapper";

const CHUNK_SIZE = 2_000_000;

const models = [
  google("gemini-2.5-pro-exp-03-25"),
  google("gemini-2.0-flash-001"),
  groq("deepseek-r1-distill-llama-70b"),
  groq("gemma2-9b-it"),
];

const splitText = (text: string, chunkSize: number) => {
  const chunks = [];
  for (let i = 0; i < text.length; i += chunkSize) {
    chunks.push(text.slice(i, i + chunkSize));
  }
  return chunks;
};

export const graphAiSchema = z.object({
  nodes: z.array(z.object({ id: z.string(), description: z.string() })).max(20),
  links: z.array(
    z.object({
      source: z.string(),
      target: z.string(),
      relation: z.string(),
      isPositive: z.boolean(),
    })
  ),
});

export type GraphData = z.infer<typeof graphAiSchema>;

export const createGraphData = async (bookText: string) => {
  return asyncWrapper(async () => {
    const chunks = splitText(bookText, CHUNK_SIZE);

    const systemMessage = `
      You will receive as prompt the text of a book, extract the characters and the relation between them
      All characters (nodes) must have links (as much as better)
      Limit in the 20 most important
      Add a description of each character, add his main relations on the text (should be reflected on links)
      Group characters in Clusters
      All links should be related to the characters
      Add a relation name and if it is a positive or negative
    `;

    let fulfilled: PromiseFulfilledResult<GenerateObjectResult<GraphData>>[] =
      [];
    let chunkAttempt = 0;

    while (chunkAttempt < models.length && fulfilled.length === 0) {
      const currentModel = models[chunkAttempt];

      const chunkPromises = chunks.map((chunk) =>
        generateObject({
          model: currentModel,
          schema: graphAiSchema,
          system: systemMessage,
          prompt: chunk,
        })
      );

      const results = await Promise.allSettled(chunkPromises);
      fulfilled = results.filter(
        (r): r is PromiseFulfilledResult<GenerateObjectResult<GraphData>> =>
          r.status === "fulfilled"
      );

      if (fulfilled.length === 0) {
        console.warn(`Model ${currentModel} failed. Trying next model...`);
      }
      chunkAttempt++;
    }

    if (fulfilled.length === 0) {
      throw new Error("All AI calls failed");
    }

    if (fulfilled.length === 1) {
      return { bookGraphData: fulfilled[0].value.object };
    }

    const summaryPrompt = fulfilled
      .map((res, i) => `Chunk ${i + 1}: ${JSON.stringify(res.value.object)}`)
      .join("\n");

    let finalResult: GenerateObjectResult<GraphData> | null = null;
    let compiledAttempt = 0;

    while (compiledAttempt < models.length && finalResult === null) {
      const currentModel = models[compiledAttempt];

      try {
        finalResult = await generateObject({
          model: currentModel,
          schema: graphAiSchema,
          system:
            "You will receive multiple character-relationship maps from different parts of the book. Combine them into one coherent map.",
          prompt: summaryPrompt,
        });
      } catch {}
      compiledAttempt++;
    }

    if (!finalResult) {
      throw new Error("All AI calls failed for final summary step");
    }

    return { bookGraphData: finalResult.object as GraphData };
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

    const fullText = bookContent.result;

    // If small enough, stream the whole thing
    if (fullText.length <= CHUNK_SIZE) {
      return streamText({
        model: google("gemini-2.0-flash-001"),
        system: `You are a helpful assistant that will answer questions about this book: ${fullText}`,
        messages,
      });
    }

    // Split the book into chunks
    const chunks = [];
    for (let i = 0; i < fullText.length; i += CHUNK_SIZE) {
      chunks.push(fullText.slice(i, i + CHUNK_SIZE));
    }

    // Get static responses for each chunk using generateText
    const chunkResponses = await Promise.allSettled(
      chunks.map((chunk) =>
        generateText({
          model: google("gemini-2.0-flash-001"),
          system: `You are a helpful assistant. Based on the following part of a book, answer the user's questions.`,
          prompt: `Book segment:\n${chunk}\n\nUser messages:\n${messages
            .map((m) => `${m.role}: ${m.content}`)
            .join("\n")}`,
        })
      )
    );

    const validAnswers = chunkResponses
      .filter((res) => res.status === "fulfilled")
      .map((res, i) => `Chunk ${i + 1} answer:\n${res.value.text}`);

    const compiledSummary = validAnswers.join("\n\n");
    // Final streamed response using the compiled summaries and user messages
    return streamText({
      model: google("gemini-2.0-flash-001"),
      system: `Here is a compiled summary from multiple parts of the book:\n\n${compiledSummary}\n\nNow answer the user's question based on that.`,
      messages,
    });
  });
};
