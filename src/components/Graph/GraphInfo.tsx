"use client";
import {Info} from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export const GraphInfo = () => {
  return (
    <Sheet >
      <SheetTrigger><Info/></SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Graph's Info</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
