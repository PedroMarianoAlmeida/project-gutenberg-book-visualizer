import { getBookMetadata } from "@/services/gutenbergService";

export const BookPage = async ({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) => {
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
  return (
    <main>
      <h1>Book #{bookId}</h1>
      <h2>Is this book?</h2>
      <ul>
        <li>Title: {bookMetadata.result.Title}</li>
        <li>Author(s): {bookMetadata.result.Authors}</li>
      </ul>
    </main>
  );
};

export default BookPage;
