"use client";
import { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

import { useWindowSize } from "@uidotdev/usehooks";
import { Switch } from "@/components/ui/switch";

import { GraphData } from "@/services/aiService";
import { calculateCharacterImportance } from "@/services/graphDataSanitize";

const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
  ssr: false,
});

const ForceGraph3D = dynamic(() => import("react-force-graph-3d"), {
  ssr: false,
});

export const Result = ({ graphData }: { graphData: GraphData }) => {
  const [isSystemDark, setIsSystemDark] = useState(false);
  const [is2D, setIs2d] = useState(true);
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
      <div className="absolute top-4 right-4 z-20 flex gap-3 items-center">
        <p className="text-[20px] font-bold mb-1 text-[#cc9933]">2D</p>
        <Switch id="airplane-mode" onClick={() => setIs2d((curr) => !curr)} />
        <Image src="/3D.png" height={30} width={30} alt="3d" />
      </div>

      {is2D ? (
        <ForceGraph2D
          height={height ?? 500}
          width={width ?? 500}
          graphData={filteredGraphData}
          linkColor={(link) => (link.isPositive ? "green" : "red")}
          linkLabel={(link) => link.relation}
          nodeLabel={(node) => String(node.id)}
          // nodeRelSize={(node) => characterImportance[node.id] }
          nodeAutoColorBy={(node) => "red"}
          // nodeColor={(node) => "blue"}
        />
      ) : (
        <ForceGraph3D
          graphData={filteredGraphData}
          backgroundColor={isSystemDark ? "black" : "white"}
          linkColor={() => (isSystemDark ? "#d9eaef" : "black")}
          linkLabel={(link) => link.relation}
          linkWidth={1}
          nodeLabel={(node) => String(node.id)}
        />
      )}
    </div>
  );
};
