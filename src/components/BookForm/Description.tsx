import Link from "next/link";
import { Info } from "lucide-react";

import { Button } from "@/components/ui/button";
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
import { Badge } from "@/components/ui/badge";

import { MaybeBookIds } from "@/app/HomePageClient";

const Note = ({ ids }: { ids: string[] }) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          Or check a book that a previous user already create the Graph
        </AccordionTrigger>
        <AccordionContent>
          {ids.map((id) => (
            <Link href={`/book/${id}/metadata`} key={id}>
              <Badge>{id}</Badge>
            </Link>
          ))}
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
              >
                <Button variant="link" className="p-1">
                  Project Gutenberg
                </Button>
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
