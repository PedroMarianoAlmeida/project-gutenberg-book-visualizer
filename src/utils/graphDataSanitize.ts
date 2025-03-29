import { GraphData } from "@/services/aiService";
const colorPalette: { dark: string; light: string }[] = [
  { dark: "#264653", light: "#a8dadc" },
  { dark: "#2a9d8f", light: "#d9f8f0" },
  { dark: "#e76f51", light: "#ffddd2" },
  { dark: "#1d3557", light: "#d0ebff" },
  { dark: "#f4a261", light: "#ffe5b4" },
  { dark: "#6d6875", light: "#e9d8fd" },
  { dark: "#457b9d", light: "#a8dadc" },
  { dark: "#ff7f50", light: "#ffd6cc" },
  { dark: "#43aa8b", light: "#caffbf" },
  { dark: "#9d4edd", light: "#e0bbff" },
  { dark: "#b5179e", light: "#ffc8dd" },
  { dark: "#3a0ca3", light: "#b8c0ff" },
  { dark: "#2b9348", light: "#d8f3dc" },
  { dark: "#8338ec", light: "#cdb4db" },
  { dark: "#ff6d00", light: "#ffe0b2" },
  { dark: "#0077b6", light: "#90e0ef" },
  { dark: "#8e44ad", light: "#e4d0f3" },
  { dark: "#4a4e69", light: "#c9ada7" },
  { dark: "#ef476f", light: "#ffd6e0" },
  { dark: "#118ab2", light: "#d0f0fd" },
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

  // Create a new object for normalized importance.
  const normalizedImportance: Record<string, number> = {};
  const counts = Object.values(rawImportance);
  const min = Math.min(...counts);
  const max = Math.max(...counts);

  if (min === max) {
    // If all nodes have the same raw importance, assign the midpoint value (12.5).
    for (const key in rawImportance) {
      normalizedImportance[key] = 12.5;
    }
  } else {
    for (const key in rawImportance) {
      const value = rawImportance[key];
      // Linear normalization: map raw value to range [5, 20]
      normalizedImportance[key] = 5 + ((value - min) * 15) / (max - min);
    }
  }

  return normalizedImportance;
};

const getColorPairForId = (id: string): { dark: string; light: string } => {
  const hash = [...id].reduce((acc, char) => acc + char.charCodeAt(0), 0);

  // Use hash to generate HSL values
  const hue = hash % 360;
  return {
    dark: `hsl(${hue}, 70%, 30%)`, // darker tone
    light: `hsl(${hue}, 70%, 80%)`, // lighter tone
  };
};

const linkColorBySentiment = (
  isPositive: boolean
): { dark: string; light: string } => {
  return isPositive
    ? { dark: "hsl(140, 70%, 30%)", light: "hsl(140, 70%, 80%)" } // green tones
    : { dark: "hsl(0, 70%, 30%)", light: "hsl(0, 70%, 80%)" }; // red tones
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
    .sort((a, b) => b.importance - a.importance)
    .slice(0, 20)
    .map((node, index) => ({
      ...node,
      color: colorPalette[index % colorPalette.length],
    }));

  return topNodes;
};

export const graphDataSanitize = (graphData: GraphData): GraphData => {
  const nodes = getTop20ImportantNodesWithColor(graphData);
  const links = usedLinks({ nodes, links: graphData.links });
  return { nodes, links };
};
