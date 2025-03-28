"use client";
import { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";

import { useWindowSize } from "@uidotdev/usehooks";

import { GraphData } from "@/services/aiService";
import { calculateCharacterImportance } from "@/app/book/[bookId]/graph/graphDataSanitize";

const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
  ssr: false,
});

const ForceGraph3D = dynamic(() => import("react-force-graph-3d"), {
  ssr: false,
});

type CustomNode = {
  id: string;
  x: number;
  y: number;
  __bckgDimensions?: [number, number];
} & import("react-force-graph-2d").NodeObject;

export const Result = ({ graphData }: { graphData: GraphData }) => {
  const [isSystemDark, setIsSystemDark] = useState(false);
  const { height, width } = useWindowSize();
  const characterImportance = calculateCharacterImportance(graphData);

  // Sanitize graphData by filtering out links with missing nodes.
  const filteredGraphData = useMemo(() => {
    // Create a set of valid node ids.
    const validNodeIds = new Set(graphData.nodes.map((node) => node.id));
    // Filter links to only include those where both source and target exist.
    const validLinks = graphData.links.filter(
      (link) =>
        validNodeIds.has(link.source as string) &&
        validNodeIds.has(link.target as string)
    );
    return { ...graphData, links: validLinks };
  }, [graphData]);

  useEffect(() => {
    // This code runs only on the client side.
    if (typeof window !== "undefined") {
      setIsSystemDark(
        window.matchMedia("(prefers-color-scheme: dark)").matches
      );
    }
  }, []);

  return (
    <div className="flex justify-center items-center">
      <ForceGraph3D graphData={filteredGraphData} />
      {/* <ForceGraph2D
        height={height ?? 500}
        width={width ?? 500}
        graphData={filteredGraphData}
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
      /> */}
    </div>
  );
};
