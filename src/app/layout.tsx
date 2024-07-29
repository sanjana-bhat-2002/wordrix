import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import SessionAccesser from "@/components/widgets/SessionAccessor";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wordle Clone",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionAccesser>
      {children}
      <Toaster />
      </SessionAccesser>
      </body>
    </html>
  );
}
