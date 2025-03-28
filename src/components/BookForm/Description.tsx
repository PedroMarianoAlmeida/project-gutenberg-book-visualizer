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

import { MaybeBookIds } from "@/app/HomePageClient";

export const Description = ({ ids }: MaybeBookIds) => {
  return (
    <div className="flex items-center gap-2">
      <p>
        Book id from<span className="font-bold ml-1">Project Gutenberg</span>
      </p>
      <Dialog>
        <DialogTrigger asChild>
          <Info />
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
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};
