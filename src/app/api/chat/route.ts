import { google } from "@ai-sdk/google";
import { streamText } from "ai";

import { getBookText } from "@/services/gutenbergService";

// Allow streaming responses up to 30 seconds
export const maxDuration = 60;

export async function POST(req: Request) {
  const { messages, bookId } = await req.json();

  const bookContent = await getBookText(bookId);
  if (!bookContent.success) return;

  const result = streamText({
    model: google("gemini-2.0-flash-001"),
    system: `You are a helpfull assistent that will answer questions about this book: ${bookContent.result}`,
    messages,
  });
  return result.toDataStreamResponse();
}
