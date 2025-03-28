import { Chat } from "./Chat";
import { getBookText } from "@/services/gutenbergService";

export default async function Page({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) {
  const { bookId } = await params;

  return <Chat bookId={bookId} />;
}
