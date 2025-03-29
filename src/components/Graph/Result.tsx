"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

import { useWindowSize } from "@uidotdev/usehooks";
import { Switch } from "@/components/ui/switch";

import { EnhancedGraphData } from "@/utils/graphDataSanitize";
import { useDarkMode } from "@/hooks/useDarkTheme";

const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
  ssr: false,
});

const ForceGraph3D = dynamic(() => import("react-force-graph-3d"), {
  ssr: false,
});

export const Result = ({ graphData }: { graphData: EnhancedGraphData }) => {
  const isSystemDark = useDarkMode();
  const [is2D, setIs2d] = useState(true);
  const { height, width } = useWindowSize();

  return (
    <div className="flex justify-center items-center">
      <div className="absolute top-4 right-4 z-20 flex gap-3 items-center">
        <p className="text-[20px] font-bold mb-1 text-[#cc9933]">2D</p>
        <Switch id="airplane-mode" onClick={() => setIs2d((curr) => !curr)} />
        <Image src="/3D.png" height={30} width={30} alt="3d" />
      </div>

      {is2D ? (
        <ForceGraph2D
          graphData={graphData}
          nodeColor={(node) =>
            isSystemDark ? node.color.dark : node.color.light
          }
          nodeLabel={(node) => node.label}
          linkColor={(link) =>
            isSystemDark ? link.color.dark : link.color.light
          }
          linkLabel={(link) => link.relation}
          height={height ?? 500}
          width={width ?? 500}
        />
      ) : (
        <ForceGraph3D
          graphData={graphData}
          nodeColor={(node) =>
            isSystemDark ? node.color.dark : node.color.light
          }
          nodeLabel={(node) => node.label}
          linkColor={(link) =>
            isSystemDark ? link.color.dark : link.color.light
          }
          linkLabel={(link) => link.relation}
          linkWidth={3}
          height={height ?? 500}
          width={width ?? 500}
          backgroundColor={isSystemDark ? "#0B0B0B" : "white"}
        />
      )}
    </div>
  );
};
