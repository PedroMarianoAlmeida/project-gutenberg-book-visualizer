import { chatAboutTheBook } from "@/services/aiService";

export const maxDuration = 60;

export async function POST(req: Request) {
  const { messages, bookId } = await req.json();
  const chat = await chatAboutTheBook({ bookId, messages });
  if (!chat.success)
    return new Response(
      JSON.stringify({ error: chat.message || "Something went wrong" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );

  return chat.result.toDataStreamResponse({ sendUsage: false });
}
