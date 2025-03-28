import Link from "next/link";
import { Tangerine } from "next/font/google";

const tangerine = Tangerine({ weight: "700", subsets: ["latin"] });

export const Logo = () => {
  return (
    <div className="p-4 absolute text-4xl z-10 w-full text-center">
      <Link href="/" className={tangerine.className}>
        Project Gutenberg Helper
      </Link>
    </div>
  );
};
