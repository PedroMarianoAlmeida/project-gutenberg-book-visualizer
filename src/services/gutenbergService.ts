"use server"

import { asyncWrapper } from "@/utils/asyncWrapper";
import { streamToString } from "@/utils/streamToString";
import rawMetadata from "@/data/gutenbergMetadata.json";

const gutenbergUrl = "https://www.gutenberg.org/";

export const getBookText = async (bookId: number) => {
  return asyncWrapper(async () => {
    const res = await fetch(`${gutenbergUrl}files/${bookId}/${bookId}-0.txt`);
    if (res.status === 404) throw new Error("Book not found");
    if (!res.ok) throw new Error("Error fetching book");
    if (res.body === null) throw new Error("Book has no content");

    const bookText = await streamToString(res.body);
    return bookText;
  });
};

type BookMetadata = {
  "Text#": string;
  Title: string;
  Authors: string;
  Issued: string;
  Subjects: string;
  LoCC: string;
  Bookshelves: string;
  [key: string]: string;
};
const gutenbergMetadata = rawMetadata as BookMetadata[];
export const getBookMetadata = async (bookId: number) => {
  return asyncWrapper(async () => {
    const metadata = gutenbergMetadata.find(
      (book) => Number(book["Text#"]) === bookId
    );

    if (!metadata) throw new Error("Book metadata not found");

    return metadata;
  });
};
