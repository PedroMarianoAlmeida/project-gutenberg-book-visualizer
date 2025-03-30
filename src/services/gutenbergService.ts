"use server";

import { asyncWrapper } from "@/utils/asyncWrapper";
import { streamToString } from "@/utils/streamToString";
import rawMetadata from "@/data/gutenbergMetadata.json";

const gutenbergUrl = "https://www.gutenberg.org/";

export const getBookText = async (bookId: number) => {
  return asyncWrapper(async () => {
    const urls = [
      `${gutenbergUrl}files/${bookId}/${bookId}-0.txt`,
      `${gutenbergUrl}/cache/epub/${bookId}/pg${bookId}.txt`,
    ];

    const results = await Promise.allSettled(urls.map((url) => fetch(url)));

    for (const result of results) {
      if (
        result.status === "fulfilled" &&
        result.value.ok &&
        result.value.body !== null
      ) {
        return await streamToString(result.value.body);
      }
    }

    throw new Error("Book not found in any known location");
  });
};

type BookMetadata = {
  "Text#": number;
  Title: string;
  Authors: string;
  Issued: string;
  Subjects: string;
  LoCC: string;
  Bookshelves: string;
};
const gutenbergMetadata = rawMetadata as BookMetadata[];
export const getBookMetadata = async (bookId: number) => {
  return asyncWrapper(async () => {
    const metadata = gutenbergMetadata.find(
      (book) => Number(book["Text#"]) === bookId
    );

    if (!metadata) throw new Error("Book not found");

    return metadata;
  });
};
