import { getBookText } from "@/services/gutenbergService";
export const BookPage = async ({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) => {
  const { bookId } = await params;
  const bookText = await getBookText(Number(bookId));

  if (!bookText.success) {
    return (
      <p className="text-destructive">
        {bookText.message === "Book not found"
          ? "Book not found"
          : "Error fetching data"}
      </p>
    );
  }

  return (
    <div>
      <h1>Book {bookId} Page</h1>
      <p>{bookText.result}</p>
    </div>
  );
};

export default BookPage;
