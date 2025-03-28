export const maxDuration = 60;

import Link from "next/link";
import { Home } from "lucide-react";

import { getBookText, getBookMetadata } from "@/services/gutenbergService";
import { createGraphData } from "@/services/aiService";
import { getGraphFromDatabase } from "@/services/dbService";

import mockData from "./graphDataSample.json";
import { Result } from "./Result";
import { Error } from "./Error";
import { ChatCTA } from "./ChatCTA";

export default async function Page({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) {
  const { bookId } = await params;
  const bookIdNumber = Number(bookId);

  const [bookTextResult, bookMetadataResult, graphFromDbResult] =
    await Promise.allSettled([
      getBookText(bookIdNumber),
      getBookMetadata(bookIdNumber),
      getGraphFromDatabase(bookIdNumber),
    ]);

  if (
    bookMetadataResult.status !== "fulfilled" ||
    !bookMetadataResult.value.success
  ) {
    return (
      <Error
        message={
          bookMetadataResult.status === "fulfilled" &&
          !bookMetadataResult.value.success &&
          bookMetadataResult.value.message === "Book not found"
            ? "Book not found"
            : "Error fetching book content"
        }
      />
    );
  }

  if (bookTextResult.status !== "fulfilled" || !bookTextResult.value.success) {
    return (
      <Error
        message={
          bookTextResult.status === "fulfilled" &&
          !bookTextResult.value.success &&
          bookTextResult.value.message === "Book not found"
            ? "Book not found"
            : "Error fetching book content"
        }
      />
    );
  }

  const bookTitle = bookMetadataResult.value.result.Title;

  let graphData;
  if (
    graphFromDbResult.status === "fulfilled" &&
    graphFromDbResult.value.success
  ) {
    graphData = graphFromDbResult.value;
    console.log({ graphData });
  } else {
    graphData = await createGraphData(bookTextResult.value.result);
    if (!graphData.success) return <Error message="Error creating graph" />;
  }

  console.log({ bookText: bookTextResult.value.result });

  return (
    <main className="p-4 w-full">
      <h1 className="text-center text-xl w-full">{bookTitle}</h1>
      <Link
        href="/"
        className="absolute bottom-4 left-4 p-2 rounded-full bg-background/80 backdrop-blur-sm shadow-sm hover:bg-background transition-colors duration-200 z-10"
        aria-label="Go back to home page"
      >
        <Home className="h-5 w-5" />
      </Link>
      {/* <Result graphData={graphData.result.bokGraphData} /> */}
      <ChatCTA bookId={bookId} />
    </main>
  );
}
