"use client";
import dynamic from "next/dynamic";
import { z } from "zod";
import { useWindowSize } from "@uidotdev/usehooks";

import { graphAiSchema } from "@/services/aiServices";
import { calculateCharacterImportance } from "@/app/book/[bookId]/graph/graphDataSanitize";

const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
  ssr: false,
});

type CustomNode = {
  id: string;
  x: number;
  y: number;
  __bckgDimensions?: [number, number];
} & import("react-force-graph-2d").NodeObject;

type GraphData = z.infer<typeof graphAiSchema>;

export const Result = ({ graphData }: { graphData: GraphData }) => {
  const { height, width } = useWindowSize();
  const characterImportance = calculateCharacterImportance(graphData);
  const isSystemDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  return (
    <div className="flex justify-center items-center">
      <ForceGraph2D
        height={height ?? 500}
        width={width ?? 500}
        graphData={graphData}
        linkColor={() => (isSystemDark ? "#d9eaef" : "black")}
        linkLabel={(link) => link.relation}
        nodeCanvasObject={(node, ctx, globalScale) => {
          const customNode = node as CustomNode;
          const label = customNode.id;

          const radius = characterImportance[customNode.id] ?? 5;
          const fontSize = 15 / globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;

          ctx.beginPath();
          ctx.arc(customNode.x, customNode.y, radius, 0, 2 * Math.PI, false);
          ctx.fillStyle = isSystemDark ? "#8a651f" : "#cc9933";
          ctx.fill();

          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = isSystemDark ? "white" : "black";
          ctx.fillText(label, customNode.x, customNode.y);

          customNode.__bckgDimensions = [radius * 2, radius * 2];
        }}
        nodePointerAreaPaint={(node, color, ctx) => {
          const customNode = node as CustomNode;
          const bckgDimensions = customNode.__bckgDimensions;
          if (bckgDimensions) {
            ctx.fillStyle = color;
            ctx.fillRect(
              customNode.x - bckgDimensions[0] / 2,
              customNode.y - bckgDimensions[1] / 2,
              ...bckgDimensions
            );
          }
        }}
      />
    </div>
  );
};
