import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const inter = localFont({
  src: "./fonts/Inter/InterVF.ttf", // use your actual casing/path
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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
