import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const inter = Inter({ subsets: ["latin"] });

// Utility for Tailwind class merging
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const metadata: Metadata = {
  title: "InnovaSci AI Labs | Center for Computational Science & AI Research",
  description: "Advanced AI Academy, Computational Research, and Digital Marketplace.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={cn(
          inter.className,
          "min-h-screen bg-slate-50 text-slate-900 antialiased"
        )}
      >
        <main className="relative flex min-h-screen flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
