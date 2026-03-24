import React from "react";
import DevotionalHero from "./_components/DevotionalHero";
import TodaySpotlight from "./_components/TodaySpotlight";
import DevotionalGrid from "./_components/DevotionalGrid";
import SubscribeSection from "./_components/SubscribeSection";

import { getAllDevotionals, getFeaturedDevotional } from "@/lib/sanity.queries";

export const revalidate = 0;

const page = async () => {
  const [devotionals, featuredDevotional] = await Promise.all([getAllDevotionals(), getFeaturedDevotional()]);

  return (
    <main>
      <DevotionalHero />
      <TodaySpotlight featuredDevotional={featuredDevotional} />

      <DevotionalGrid devotionals={devotionals} />
      <SubscribeSection />
    </main>
  );
};

export default page;
