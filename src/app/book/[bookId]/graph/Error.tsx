import Link from "next/link";

import { Button } from "@/components/ui/button";

export const Error = ({message}: {message: string}) => {
  return (
    <main className="w-full h-screen flex justify-center items-center flex-col gap-4">
      <h1 className="text-destructive text-4xl">{message}</h1>
      <Link href="/">
        <Button>Try again</Button>
      </Link>
    </main>
  );
};
