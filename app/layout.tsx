import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar, Footer } from "./components";
import ScrollResetter from "./_components/ScrollResetter";

const inter = localFont({
  src: "./fonts/inter/interVF.ttf",
  variable: "--font-inter",
  weight: "100 200 300 400 500 600 700 800 900",
});

export const metadata: Metadata = {
  // Add this line to resolve social images correctly
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
  icons: {
    icon: "/assets/logo.png",
  },
  keywords: ["Church", "Teliosis World Outreach", "Christian", "Sermons", "Devotionals", "Faith", "Worship"],
  openGraph: {
    title: "Teliosis World Outreach",
    description:
      "A vibrant community making disciples who love God, love people, and transform the world through the Gospel.",
    url: "https://www.teliosis.org",
    siteName: "Teliosis World Outreach",
    images: [
      {
        url: "/assets/logo.png", // Now resolves to https://www.teliosis.org/assets/logo.png
        width: 1200,
        height: 630,
        alt: "Teliosis World Outreach Logo",
      },
    ],
    locale: "en_NG",
    type: "website",
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
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <ScrollResetter />
        <Navbar />
        <main className="">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
