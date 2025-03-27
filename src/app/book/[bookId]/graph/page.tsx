import { getBookText } from "@/services/gutenbergService";
import { createGraphData } from "@/services/aiServices";
import mockData from "./graphDataSample.json";
import { Result } from "./Result";
import { Error } from "./Error";

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
  if (!graphData.success) return <Error />;

  return (
    <div>
      <h1>Book {bookId} Page</h1>
      <Result graphData={graphData.result.bokGraphData} />
      {/* <Result graphData={mockData}/> */}
    </div>
  );
};

export default BookPage;
