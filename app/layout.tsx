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
  title: "Teliosis World Outreach",
  description:
    "A vibrant community making disciples who love God, love people, and transform the world through the Gospel. Experience life-changing worship and discover your God-given purpose.",
  icons: "/images/logo.png",
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
        <main className="pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
