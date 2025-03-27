import { getBookText } from "@/services/gutenbergService";
import { createGraphData } from "@/services/aiServices";

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

  const graphData = await createGraphData(bookText.result);
  if (!graphData.success)
    return <p className="text-destructive">Error creating graph</p>;

  return (
    <div>
      <h1>Book {bookId} Page</h1>
      <p>{JSON.stringify(graphData.result)}</p>
    </div>
  );
};

export default BookPage;
