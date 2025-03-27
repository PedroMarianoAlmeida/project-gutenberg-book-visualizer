"use client";
import { BookForm } from "@/components/BookForm";
import Stepper, { Step } from "@/components/react-bits/Stepper";

export default function Home() {
  return (
    <main>
      <Stepper initialStep={1} disableStepIndicators>
        <Step>
          <h2 className="text-center mb-4 text-xl">Start adding a book! 📖</h2>
          <BookForm />
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
}
