import Link from "next/link";
import { Tangerine } from "next/font/google";

const tangerine = Tangerine({ weight: "700", subsets: ["latin"] });

export const Logo = () => {
  return (
    <Link
      className={`${tangerine.className} text-4xl fixed top-4 left-4 z-10 md:relative  w-full text-center`}
      href="/"
    >
      Project Gutenberg Helper
    </Link>
  );
};
