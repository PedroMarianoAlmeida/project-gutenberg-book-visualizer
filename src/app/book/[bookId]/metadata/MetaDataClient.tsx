"use client";
import Link from "next/link";
import React from "react";

import Stepper, { Step } from "@/components/react-bits/Stepper";

import { Button } from "@/components/ui/button";

import { BookForm } from "@/components/StaticBookForm";

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
      <Stepper initialStep={2} disableStepIndicators>
        <Step>
          <></>
        </Step>
        <Step>
          <div className="flex flex-col gap-4 items-center">
            <h1 className="text-center">Book #{bookId}</h1>
            <h2 className="text-center text-xl">
              It is this book that you are looking for?
            </h2>
            <ul>
              <li className="mb-4">
                <div className="flex flex-col items-center">
                  <span className="font-bold">Title</span>
                  <span className="text-center">{bookTitle}</span>
                </div>
              </li>
              <li>
                <div className="flex flex-col items-center">
                  <span className="font-bold">Author(s)</span>
                  <span className="text-center">{bookAuthor}</span>
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
