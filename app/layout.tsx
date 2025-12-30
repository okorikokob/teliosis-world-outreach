import type { Metadata } from "next";
import { Geist, Geist_Mono, Satisfy, Fira_Sans_Condensed } from "next/font/google";
import "./globals.css";
import { SiteShell } from "@/src/components/layout/site-shell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const satisfy = Satisfy({
  variable: "--font-satisfy",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const firaCondensed = Fira_Sans_Condensed({
  variable: "--font-fira-condensed",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Teliosis World Outreach",
  description: "Growing in Christ, reaching the world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${satisfy.variable} ${firaCondensed.variable} antialiased smooth-scroll`}>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
