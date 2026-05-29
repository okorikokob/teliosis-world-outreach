import React from "react";
import DevotionalHero from "./_components/DevotionalHero";
import TodaySpotlight from "./_components/TodaySpotlight";
import DevotionalGrid from "./_components/DevotionalGrid";
import SubscribeSection from "./_components/SubscribeSection";
import type { Metadata } from "next";

import { getAllDevotionals, getFeaturedDevotional } from "@/lib/sanity.queries";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Devotionals",
  description:
    "Daily devotionals from Teliosis World Outreach to strengthen your faith with Scripture, prayer, and practical application.",
  openGraph: {
    title: "Devotionals – Teliosis World Outreach",
    description:
      "Daily devotionals from Teliosis World Outreach to strengthen your faith with Scripture, prayer, and practical application.",
    url: "/devotionals",
    images: [
      {
        url: "/assets/logo.png",
        width: 1200,
        height: 630,
        alt: "Teliosis World Outreach Devotionals",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Devotionals – Teliosis World Outreach",
    description:
      "Daily devotionals from Teliosis World Outreach to strengthen your faith with Scripture, prayer, and practical application.",
    images: ["/assets/logo.png"],
  },
};

const page = async () => {
  const [devotionals, featuredDevotional] = await Promise.all([getAllDevotionals(), getFeaturedDevotional()]);

  return (
    <main>
      <DevotionalHero />
      <TodaySpotlight featuredDevotional={featuredDevotional} />

      <DevotionalGrid devotionals={devotionals} featuredId={featuredDevotional?._id} />
      <SubscribeSection />
    </main>
  );
};

export default page;
