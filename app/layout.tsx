import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar, Footer } from "./components";

const inter = localFont({
  src: "./fonts/inter/interVF.ttf",
  variable: "--font-inter",
  weight: "100 200 300 400 500 600 700 800 900",
});

export const metadata: Metadata = {
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
        url: "/assets/logo.png",
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
        <Navbar />
        <main className="">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
