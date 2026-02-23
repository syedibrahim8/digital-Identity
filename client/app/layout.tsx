import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ibrahim — Fullstack Engineer & Systems Builder",
  description:
    "Portfolio of Ibrahim — product-minded fullstack engineer specialising in MERN, TypeScript, real-world workflows, payment systems, and premium UX.",
  openGraph: {
    title: "Ibrahim — Fullstack Engineer & Systems Builder",
    description: "Building systems, not just websites.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-[var(--font-inter)]">{children}</body>
    </html>
  );
}