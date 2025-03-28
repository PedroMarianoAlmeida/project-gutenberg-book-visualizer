import type { Metadata } from "next";

import { ThemeProvider } from "@/components/layout/theme-provider";
import { Logo } from "@/components/layout/Logo";
import "./globals.css";

export const metadata: Metadata = {
  title: "Project Gutenberg Book Visualizer",
  description:
    "Check the connection between the characters of any book on Project Gutenberg",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="overflow-hidden">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Logo />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
