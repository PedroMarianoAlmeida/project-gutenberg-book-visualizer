"use client";
import React, { useEffect, useRef } from "react";

import Stepper, { StepperHandle, Step } from "@/components/react-bits/Stepper";

import { Button } from "@/components/ui/button";

import { BookForm } from "@/components/StaticBookForm";

export default function Loading() {
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
          <BookForm bookId={"???"} />
        </Step>
        <Step>
          <div className="flex flex-col gap-4 items-center">
            <h1 className="text-center">Book #XXX</h1>
            <h2 className="text-center text-xl">
              It is this book that you are looking for? 🤓
            </h2>
            <ul>
              <li className="mb-4">
                <div className="flex flex-col items-center">
                  <span className="font-bold">Title</span>
                  <span className="text-center">Skeleton 1</span>
                </div>
              </li>
              <li>
                <div className="flex flex-col items-center">
                  <span className="font-bold">Author(s)</span>
                  <span className="text-center">Skeleton 2</span>
                </div>
              </li>
            </ul>
            <div className="flex flex-col gap-4">
              <Button variant="outline" disabled>
                Yes, create my Graph
              </Button>

              <Button variant="destructive" disabled>
                No, I will add another Id
              </Button>
            </div>
          </div>
        </Step>
        <Step>
          <></>
        </Step>
      </Stepper>
    </main>
  );
}
