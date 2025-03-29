"use client";
import { Info } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";

import { EnhancedGraphData } from "@/utils/graphDataSanitize";
import { useDarkMode } from "@/hooks/useDarkTheme";

export const GraphInfo = ({
  enhancedGraphData,
}: {
  enhancedGraphData: EnhancedGraphData;
}) => {
  const isDark = useDarkMode();
  return (
    <Sheet>
      <SheetTrigger>
        <Info />
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Graph{"'"}s Info</SheetTitle>
          <SheetDescription>
            <ScrollArea className="h-screen">
              <Accordion type="single" collapsible className="w-full px-3">
                {enhancedGraphData.nodes.map((node) => (
                  <AccordionItem value={node.id} key={node.id}>
                    <AccordionTrigger key={node.id}>
                      <div className="flex gap-2 items-center">
                        <div
                          className="h-4 w-4 rounded-full"
                          style={{
                            backgroundColor: isDark
                              ? node.color.dark
                              : node.color.light,
                          }}
                        />
                        <p>{node.id}</p>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>{node.description}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </ScrollArea>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
