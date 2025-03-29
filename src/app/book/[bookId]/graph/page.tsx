export const maxDuration = 60;

import Link from "next/link";
import { Home } from "lucide-react";

import { getBookText, getBookMetadata } from "@/services/gutenbergService";
import { createGraphData, GraphData } from "@/services/aiService";
import {
  getGraphFromDatabase,
  saveGraphFromDatabase,
} from "@/services/dbService";

import { Result } from "@/components/Graph/Result";
import { Error } from "./Error";
import { ChatCTA } from "@/components/Chat/ChatCTA";
import { GraphInfo } from "@/components/Graph/GraphInfo";
import { graphDataSanitize } from "@/utils/graphDataSanitize";

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

  let graphData: GraphData | null = null;
  if (
    graphFromDbResult.status === "fulfilled" &&
    graphFromDbResult.value.success
  ) {
    graphData = graphFromDbResult.value.result.bokGraphData;
  } else {
    const aiGraphData = await createGraphData(bookTextResult.value.result);
    if (!aiGraphData.success) return <Error message="Error creating graph" />;
    graphData = aiGraphData.result.bookGraphData;
    if (graphData === null) {
      return <Error message="Graph data is missing or failed to generate." />;
    }
    await saveGraphFromDatabase({
      bookGraph: graphData,
      bookId: bookIdNumber,
    });
  }

  const graphSanitized = graphDataSanitize(graphData);
  console.log({ graphSanitized });

  return (
    <main className="p-4 w-full ">
      <div className="flex gap-2 w-full mt-18 md:mt-12 items-center justify-center">
        <h1 className="text-center text-xl ">{bookTitle}</h1>
        <GraphInfo />
      </div>

      <Link
        href="/"
        className="fixed bottom-4 left-4 p-2 rounded-full bg-background/80 backdrop-blur-sm shadow-sm hover:bg-background transition-colors duration-200 z-10"
        aria-label="Go back to home page"
      >
        <Home className="h-5 w-5" />
      </Link>
      {/* <Result graphData={graphData} /> */}
      <ChatCTA bookId={bookId} />
    </main>
  );
}
