"use client";
import { BookForm } from "@/components/BookForm";
import Stepper, { Step } from "@/components/react-bits/Stepper";

export default function Home() {
  return (
    <div>
      <Stepper initialStep={1}>
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
    </div>
  );
}
