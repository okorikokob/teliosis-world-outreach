import React from "react";
import DevotionalHero from "./_components/DevotionalHero";
import TodaySpotlight from "./_components/TodaySpotlight";
import DevotionalFilters from "./_components/DevotionalFilter";
import DevotionalGrid from "./_components/DevotionalGrid";
import SubscribeSection from "./_components/SubscribeSection";

const page = () => {
  return (
    <main>
      <DevotionalHero />
      <TodaySpotlight />
      <DevotionalFilters />
      <DevotionalGrid />
      <SubscribeSection />
    </main>
  );
};

export default page;
