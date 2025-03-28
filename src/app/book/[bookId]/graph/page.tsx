export const maxDuration = 60;

import Link from "next/link";
import { Home } from "lucide-react";

import { getBookText, getBookMetadata } from "@/services/gutenbergService";
import { createGraphData } from "@/services/aiServices";
// import mockData from "./graphDataSample.json";
import { Result } from "./Result";
import { Error } from "./Error";
import { ChatCTA } from "./ChatCTA";

export default async function Page({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) {
  const { bookId } = await params;

  const [bookText, bookMetadata] = await Promise.all([
    getBookText(Number(bookId)),
    getBookMetadata(Number(bookId)),
  ]);

  if (!bookMetadata.success)
    return (
      <Error
        message={
          bookMetadata.message === "Book not found"
            ? "Book not found"
            : "Error fetching book content"
        }
      />
    );

  if (!bookText.success) {
    return (
      <Error
        message={
          bookText.message === "Book not found"
            ? "Book not found"
            : "Error fetching book content"
        }
      />
    );
  }

  const graphData = await createGraphData(bookText.result);
  if (!graphData.success) return <Error message="Error creating graph" />;

  return (
    <main className="p-4 w-full">
      <h1 className="text-center text-xl w-full">
        {bookMetadata.result.Title}
      </h1>
      <Link
        href="/"
        className="absolute bottom-4 left-4 p-2 rounded-full bg-background/80 backdrop-blur-sm shadow-sm hover:bg-background transition-colors duration-200 z-10"
        aria-label="Go back to home page"
      >
        <Home className="h-5 w-5" />
      </Link>
      <Result graphData={graphData.result.bokGraphData} />
      <ChatCTA bookId={bookId} />
      {/* <Result graphData={mockData} /> */}
    </main>
  );
}
