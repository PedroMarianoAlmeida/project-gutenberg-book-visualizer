"use client";
import RotatingText from "@/components/react-bits/RotatingText";

export const GraphLoading = () => {
  return (
    <main className="w-full h-screen flex justify-center items-center">
      <RotatingText
        texts={["Generating Graph", "This can take a while"]}
        mainClassName="px-2 sm:px-2 md:px-3 bg-[#aa873b] text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg w-72"
        staggerFrom={"last"}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "-120%" }}
        staggerDuration={0.025}
        splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
        transition={{ type: "spring", damping: 30, stiffness: 400 }}
        rotationInterval={2000}
      />
    </main>
  );
};

export default GraphLoading;
