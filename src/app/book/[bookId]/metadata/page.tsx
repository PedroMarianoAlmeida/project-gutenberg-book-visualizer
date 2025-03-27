import { getBookMetadata } from "@/services/gutenbergService";
import { MetaDataClient } from "./MetaDataClient";

export default async function Page({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) {
  const { bookId } = await params;
  const bookMetadata = await getBookMetadata(Number(bookId));

  if (!bookMetadata.success) {
    return (
      <p className="text-destructive">
        {bookMetadata.message === "Book not found"
          ? "Book not found"
          : "Error fetching data"}
      </p>
    );
  }

  const { Authors, Title } = bookMetadata.result;
  return (
    <MetaDataClient
      bookAuthor={Authors}
      bookId={Number(bookId)}
      bookTitle={Title}
    />
  );
}
