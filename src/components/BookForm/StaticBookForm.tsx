import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

import { Description } from "./Description";

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

export const BookForm = () => {
  const form = useForm<z.infer<typeof rawSchema>>({
    resolver: zodResolver(rawSchema),
    defaultValues: {
      bookId: "999",
    },
  });

  return (
    <section>
      <Form {...form}>
        <form className="flex flex-col items-center gap-4">
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
                  <Description ids={null} />
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled>
            Check Book
          </Button>
        </form>
      </Form>
    </section>
  );
};
