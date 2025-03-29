import { useState } from "react";
import Link from "next/link";
import { Info, Loader2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

import { MaybeBookIds } from "@/app/HomePageClient";

const Note = ({ ids }: { ids: string[] }) => {
  const [loading, setLoading] = useState(false);

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger className="border-0 focus-visible:border-0 focus-visible:ring-0">
          Or check a book that a previous user already create the Graph{" "}
          {loading && <Loader2 className="animate-spin" />}
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-wrap gap-2">
            {ids.map((id) => (
              <Link
                href={`/book/${id}/metadata`}
                key={id}
                className={loading ? "pointer-events-none" : ""}
              >
                <Button
                  className="rounded-3xl h-5 px-2 cursor-pointer"
                  onClick={() => setLoading(true)}
                  disabled={loading}
                >
                  {id}
                </Button>
              </Link>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export const Description = ({ ids }: MaybeBookIds) => {
  return (
    <div className="flex items-center gap-2">
      <p>
        Book id from<span className="font-bold ml-1">Project Gutenberg</span>
      </p>
      <Dialog>
        <DialogTrigger asChild>
          <Info className="cursor-pointer" />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Project Gutenberg Books</DialogTitle>
            <DialogDescription>
              You can visit{" "}
              <Link
                href="https://www.gutenberg.org/"
                target="__blank"
                rel="noopener noreferrer"
                className="font-bold hover:underline"
              >
                Project Gutenberg
              </Link>{" "}
              official website to search books
              {ids && <Note ids={ids} />}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};
