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
          <SheetTitle>Graph's Info</SheetTitle>
          <SheetDescription>
            <div className="flex flex-col gap-2 mt-2">
              {enhancedGraphData.nodes.map((node) => (
                <div key={node.id} className="flex gap-2 items-center">
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
              ))}
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
