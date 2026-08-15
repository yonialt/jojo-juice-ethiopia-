import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JoJo Juice | Nothing but what nature grew",
  description:
    "Organic cold-pressed liquid nutrition, re-engineered for a world that never stops moving.",
};

export const viewport: Viewport = {
  themeColor: "#f7f5f0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-primary-bg text-primary-text">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
