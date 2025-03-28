import Link from "next/link";
import { Tangerine } from "next/font/google";

const tangerine = Tangerine({ weight: "700", subsets: ["latin"] });

export const Logo = () => {
  return (
    <Link
      className={`${tangerine.className} absolute text-4xl z-10 w-full text-center`}
      href="/"
    >
      <div className="p-4">Project Gutenberg Helper</div>
    </Link>
  );
};
