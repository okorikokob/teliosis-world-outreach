import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const inter = localFont({
  src: "./fonts/Inter/InterVF.ttf",
  variable: "--font-inter",
  weight: "100 200 300 400 500 600 700 800 900",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
      (process.env.NODE_ENV === "production" ? "https://www.teliosis.org" : "http://localhost:3000")
  ),
  title: {
    template: "%s | Teliosis World Outreach",
    default: "Teliosis World Outreach",
  },
  description:
    "A vibrant community making disciples who love God, love people, and transform the world through the Gospel. Experience life-changing worship and discover your God-given purpose.",

  openGraph: {
    type: "website",
    siteName: "Teliosis World Outreach",
    url: "/",
    title: "Teliosis World Outreach",
    description:
      "A vibrant community making disciples who love God, love people, and transform the world through the Gospel.",
    images: [
      {
        url: "/assets/logo.png",
        width: 1200,
        height: 630,
        alt: "Teliosis World Outreach",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Teliosis World Outreach",
    description:
      "A vibrant community making disciples who love God, love people, and transform the world through the Gospel.",
    images: ["/assets/logo.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
