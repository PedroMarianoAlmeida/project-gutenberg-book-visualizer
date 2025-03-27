import { getBookMetadata } from "@/services/gutenbergService";

export const BookPage = async ({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) => {
  const { bookId } = await params;
  const bookMetadata = await getBookMetadata(Number(bookId));
  console.log({ bookMetadata });
  return (
    <div>
      <h1>Book {bookId} Page</h1>
    </div>
  );
};

export default BookPage;
