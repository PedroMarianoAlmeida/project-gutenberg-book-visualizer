"use client";
import { BookForm } from "@/components/BookForm/BookForm";
import Stepper, { Step } from "@/components/react-bits/Stepper";

export const HomePageClient = ({ ids }: { ids: string[] | null }) => {
  return (
    <main>
      <Stepper initialStep={1} disableStepIndicators>
        <Step>
          <h2 className="text-center mb-4 text-xl">Start adding a book! 📖</h2>
          <BookForm ids={ids} />
        </Step>
        <Step>
          <></>
        </Step>
        <Step>
          <></>
        </Step>
      </Stepper>
    </main>
  );
};
