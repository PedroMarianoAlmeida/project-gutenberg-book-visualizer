"use client";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const rawSchema = z.object({
  bookId: z
    .string()
    .nonempty("Book ID is required")
    .refine((val) => !isNaN(Number(val)), {
      message: "Book ID must be a valid number",
    })
    .refine((val) => Number(val) !== 0, {
      message: "Book ID must not be zero",
    }),
});

const transformedSchema = rawSchema.transform(({ bookId }) => ({
  bookId: Number(bookId),
}));

export const BookForm = ({ ids }: { ids: string[] | null }) => {
  console.log({ ids });
  const router = useRouter();
  const form = useForm<z.infer<typeof rawSchema>>({
    resolver: zodResolver(rawSchema),
    defaultValues: {
      bookId: "",
    },
  });

  function onSubmit(values: z.infer<typeof transformedSchema>) {
    router.push(`book/${values.bookId}/metadata`);
  }

  return (
    <section>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => {
            const result = transformedSchema.safeParse(data);
            if (result.success) {
              onSubmit(result.data);
            } else {
              result.error.issues.forEach((issue) => {
                form.setError(issue.path[0] as "bookId", {
                  message: issue.message,
                });
              });
            }
          })}
          className="flex flex-col items-center gap-4"
        >
          <FormField
            control={form.control}
            name="bookId"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center">
                <FormLabel className="mb-2">Book ID</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="47715"
                    {...field}
                    className="max-w-40 text-center"
                  />
                </FormControl>
                <FormDescription className="flex gap-1 items-center justify-center">
                  <span>Book id from</span>
                  <a
                    href="https://www.gutenberg.org/"
                    className="hover:underline flex items-center gap-1 font-bold"
                    target="__blank"
                    rel="noopener noreferrer"
                  >
                    <span>Project Gutenberg</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Check Book</Button>
        </form>
      </Form>
    </section>
  );
};
