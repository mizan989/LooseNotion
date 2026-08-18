import type { Metadata } from "next";
import "./globals.css";
import { LenisProvider } from "@/components/providers/lenis-provider";

export const metadata: Metadata = {
  title: "LooseNotion",
  description: "Your connected workspace for docs and databases.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: "dark" }}>
      <body className="antialiased bg-background text-foreground min-h-screen">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}

