export const BookPage = async ({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) => {
  const { bookId } = await params;
  return <h1>Book {bookId} Page</h1>;
};

export default BookPage;
