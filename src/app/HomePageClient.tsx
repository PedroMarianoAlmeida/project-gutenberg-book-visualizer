"use client";
import { BookForm } from "@/components/BookForm/BookForm";
import Stepper, { Step } from "@/components/react-bits/Stepper";

export interface MaybeBookIds {
  ids: string[] | null;
}
export const HomePageClient = ({ ids }: MaybeBookIds) => {
  return (
    <main className="flex justify-center items-center h-screen">
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
