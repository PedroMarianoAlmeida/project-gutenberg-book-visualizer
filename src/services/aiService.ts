import { generateObject } from "ai";
import { z } from "zod";

import { google } from "@ai-sdk/google";
import { asyncWrapper } from "@/utils/asyncWrapper";

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
    const res = await generateObject({
      model: google("gemini-2.0-flash-001"),
      schema: graphAiSchema,
      system:
        "You will receive as prompt the text of a book, extract the characters and the relation between them",
      prompt: bookText,
    });

    return { bokGraphData: res.object };
  });
};
