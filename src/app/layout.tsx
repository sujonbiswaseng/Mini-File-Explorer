import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { FileSystemProvider } from "@/context/FilleSystemContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mini File Explorer",
  description: "A modern SaaS-style file explorer built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased text-gray-900 dark:text-gray-100 bg-white dark:bg-zinc-950 h-screen overflow-hidden`}>
        <FileSystemProvider>
          {children}
        </FileSystemProvider>
      </body>
    </html>
  );
}
