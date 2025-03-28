import { google } from "@ai-sdk/google";
import { generateText } from "ai";

import { getBookText } from "@/services/gutenbergService";

// Allow streaming responses up to 30 seconds
export const maxDuration = 60;

export async function POST(req: Request) {
  const { messages, bookId } = await req.json();

  const bookContent = await getBookText(bookId);
  if (!bookContent.success) return;
  console.log({ bookContent });

  const result = generateText({
    model: google("gemini-2.5-pro-exp-03-25"),
    system: `You are a helpfull assistent that will answer questions about this book: ${bookContent.result}`,
    messages,
  });

  return (await result).text;
}
