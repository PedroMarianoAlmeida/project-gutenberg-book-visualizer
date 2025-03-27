"use client";
import Link from "next/link";
import React, { useEffect, useRef } from "react";

import Stepper, { StepperHandle, Step } from "@/components/react-bits/Stepper";
import DecryptedText from "@/components/react-bits/DecryptedText";

import { Button } from "@/components/ui/button";

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
          <div className="flex flex-col gap-4 items-center">
            <h1 className="text-center">Book #{bookId}</h1>
            <h2 className="text-center text-xl">
              It is this book that you are looking for? 🤓
            </h2>
            <ul>
              <li className="mb-4">
                <div className="flex flex-col items-center">
                  <span className="font-bold">Title</span>
                  <DecryptedText
                    text={bookTitle}
                    animateOn="view"
                    speed={200}
                    maxIterations={20}
                    useOriginalCharsOnly
                    revealDirection="start"
                  />
                </div>
              </li>
              <li>
                <div className="flex flex-col items-center">
                  <span className="font-bold">Author(s)</span>
                  <DecryptedText
                    text={bookAuthor}
                    animateOn="view"
                    speed={200}
                    maxIterations={20}
                    useOriginalCharsOnly
                    revealDirection="start"
                  />
                </div>
              </li>
            </ul>
            <div className="flex flex-col gap-4">
              <Link href={`/book/${bookId}/graph`}>
                <Button variant="outline">Yes, create my Graph</Button>
              </Link>
              <Link href="/">
                <Button variant="destructive">No, I will add another Id</Button>
              </Link>
            </div>
          </div>
        </Step>
        <Step>
          <></>
        </Step>
      </Stepper>
    </main>
  );
};
