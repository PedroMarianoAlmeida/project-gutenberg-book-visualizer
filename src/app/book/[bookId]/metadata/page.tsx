export const BookPage = async ({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) => {
  const { bookId } = await params;

  return (
    <div>
      <h1>Book {bookId} Page</h1>
    </div>
  );
};

export default BookPage;
