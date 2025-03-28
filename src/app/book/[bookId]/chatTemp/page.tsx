import { ChatCTA } from "./ChatCTA";

export default async function Page({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) {
  const { bookId } = await params;

  return <ChatCTA bookId={bookId} />;
}
