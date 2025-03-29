import { GraphData } from "@/services/aiService";

type ColoredNode = GraphData["nodes"][number] & {
  importance: number;
  color: { dark: string; light: string };
  label: string;
};

type ColoredLink = GraphData["links"][number] & {
  color: { dark: string; light: string };
};

export type EnhancedGraphData = {
  nodes: ColoredNode[];
  links: ColoredLink[];
};

const colorPalette: { dark: string; light: string }[] = [
  { dark: "#1f77b4", light: "#aec7e8" },
  { dark: "#9467bd", light: "#c5b0d5" },
  { dark: "#2c3e50", light: "#bdc3c7" },
  { dark: "#8a2be2", light: "#d8b8ff" },
  { dark: "#4b0082", light: "#b19cd9" },
  { dark: "#4682b4", light: "#b0c4de" },
  { dark: "#5d4037", light: "#d7ccc8" },
  { dark: "#708090", light: "#c0c0c0" },
  { dark: "#34495e", light: "#95a5a6" },
  { dark: "#6c5ce7", light: "#dfe6e9" },
  { dark: "#FF8C00", light: "#FFDAB9" },
  { dark: "#8B4513", light: "#F5DEB3" },
  { dark: "#191970", light: "#87CEFA" },
  { dark: "#800080", light: "#D8BFD8" },
  { dark: "#2F4F4F", light: "#DCDCDC" },
  { dark: "#00008B", light: "#ADD8E6" },
  { dark: "#9932CC", light: "#E6E6FA" },
  { dark: "#6A5ACD", light: "#E0FFFF" },
  { dark: "#CD853F", light: "#FFE4C4" },
  { dark: "#D2691E", light: "#FFEBCD" },
];

export const calculateCharacterImportance = (graphData: GraphData) => {
  // Compute raw importance counts for all nodes.
  const rawImportance = Object.fromEntries(
    graphData.nodes.map((node) => [node.id, 0])
  );

  graphData.links.forEach((link) => {
    const sourceCandidate = link.source as unknown;
    const targetCandidate = link.target as unknown;

    const sourceId =
      typeof sourceCandidate === "object" &&
      sourceCandidate !== null &&
      "id" in sourceCandidate
        ? (sourceCandidate as { id: string }).id
        : link.source;
    const targetId =
      typeof targetCandidate === "object" &&
      targetCandidate !== null &&
      "id" in targetCandidate
        ? (targetCandidate as { id: string }).id
        : link.target;

    if (rawImportance.hasOwnProperty(sourceId)) {
      rawImportance[sourceId]++;
    }
    if (rawImportance.hasOwnProperty(targetId)) {
      rawImportance[targetId]++;
    }
  });

  return rawImportance;
};

const linkColorBySentiment = (
  isPositive: boolean
): { dark: string; light: string } => {
  return isPositive
    ? { dark: "lightGreen", light: "darkGreen" } // green tones
    : { dark: "red", light: "red" }; // red tones
};
// Sanitize graphData by filtering out links with missing nodes.
const usedLinks = (graphData: GraphData) => {
  // Create a set of valid node ids.
  const validNodeIds = new Set(graphData.nodes.map((node) => node.id));
  // Filter links to only include those where both source and target exist.
  const validLinks = graphData.links
    .filter(
      (link) =>
        validNodeIds.has(link.source as string) &&
        validNodeIds.has(link.target as string)
    )
    .map((link) => ({
      ...link,
      color: linkColorBySentiment(link.isPositive),
    }));
  return validLinks;
};

export const getTop20ImportantNodesWithColor = (graphData: GraphData) => {
  const importanceMap = calculateCharacterImportance(graphData);

  const topNodes = [...graphData.nodes]
    .map((node) => ({
      ...node,
      importance: importanceMap[node.id],
    }))
    .filter((node) => node.importance > 0)
    .sort((a, b) => b.importance - a.importance)
    .slice(0, 20)
    .map((node, index) => ({
      ...node,
      color: colorPalette[index % colorPalette.length],
      label: `${node.id}: ${node.description}`,
    }));

  return topNodes;
};

export const graphDataSanitize = (graphData: GraphData): EnhancedGraphData => {
  const nodes = getTop20ImportantNodesWithColor(graphData);
  const links = usedLinks({ nodes, links: graphData.links });
  return { nodes, links };
};
