"use client";
import Stepper, { Step } from "@/components/react-bits/Stepper";

interface MetaDataClientProps {
  bookId: number;
  bookTitle: string;
  bookAuthor: string;
}
export const MetaDataClient = ({
  bookAuthor,
  bookId,
  bookTitle,
}: MetaDataClientProps) => {
  return (
    <main>
      <Stepper initialStep={1} disableStepIndicators>
        <Step>
          <></>
        </Step>
        <Step>
          <h1>Book #{bookId}</h1>
          <h2 className="text-center mb-4 text-xl">
            It is this book that you are looking for? 🤓
          </h2>
          <ul>
            <li>Title: {bookTitle}</li>
            <li>Author(s): {bookAuthor}</li>
          </ul>
        </Step>
        <Step>
          <></>
        </Step>
      </Stepper>
    </main>
  );
};
