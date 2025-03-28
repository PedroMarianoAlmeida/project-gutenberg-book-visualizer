import { MaybeBookIds } from "@/app/HomePageClient";

export const Description = ({ ids }: MaybeBookIds) => {
  return (
    <div>
      <span>Book id from</span>
      <a
        href="https://www.gutenberg.org/"
        className="hover:underline flex items-center gap-1 font-bold"
        target="__blank"
        rel="noopener noreferrer"
      >
        <span>Project Gutenberg</span>
      </a>
    </div>
  );
};
