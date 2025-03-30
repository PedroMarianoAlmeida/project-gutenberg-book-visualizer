"use client";
import { useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

export const Error = ({ message }: { message: string }) => {
  const [loading, setLoading] = useState(false);

  return (
    <main className="w-full h-screen flex justify-center items-center flex-col gap-4">
      <h1 className="text-destructive text-4xl">{message}</h1>
      <Link href="/">
        <Button onClick={() => setLoading(true)}>
          Try again {loading && <Loader2 className="animate-spin" />}
        </Button>
      </Link>
    </main>
  );
};
