"use client";
import React, { useEffect, useRef } from "react";

import Stepper, { StepperHandle, Step } from "@/components/react-bits/Stepper";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

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
            <div className="flex gap-2">
              <h1 className="text-center">Book #</h1>
              <Skeleton className="w-4" />
            </div>
            <h2 className="text-center text-xl">
              It is this book that you are looking for? 🤓
            </h2>
            <ul>
              <li className="mb-4">
                <div className="flex flex-col items-center gap-4">
                  <span className="font-bold">Title</span>
                  <div className="flex gap-2">
                    <Skeleton className="w-4 h-6" />
                    <Skeleton className="w-20 h-6" />
                    <Skeleton className="w-8 h-6" />
                  </div>
                </div>
              </li>
              <li>
                <div className="flex flex-col items-center gap-4">
                  <span className="font-bold">Author(s)</span>
                  <div className="flex gap-2">
                    <Skeleton className="w-30 h-6" />
                    <Skeleton className="w-16 h-6" />
                    <Skeleton className="w-20 h-6" />
                  </div>
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
