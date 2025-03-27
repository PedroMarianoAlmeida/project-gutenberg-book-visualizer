"use client";
import React, { useEffect, useRef } from "react";

import Stepper, { StepperHandle, Step } from "@/components/react-bits/Stepper";

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
  const stepperRef = useRef<StepperHandle>(null);

  useEffect(() => {
    if (stepperRef.current) {
      stepperRef.current.nextStep();
    }
  }, []);

  return (
    <main>
      <Stepper initialStep={1} disableStepIndicators ref={stepperRef}>
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
