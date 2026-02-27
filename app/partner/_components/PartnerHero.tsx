"use client";

import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

const PartnerHero = () => {
  // Function to handle the smooth scroll
  const scrollToImpact = () => {
    document.getElementById("impact")?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <section className="relative flex min-h-[500px] w-full flex-col items-center justify-center overflow-hidden py-24 md:min-h-[600px]">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/partner-hero-bg.jpg')",
        }}
      >
        {/* Dark overlay to ensure text readability */}
        <div className="overlay-dark absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
      </div>

      <div className="layout-container relative z-10 flex flex-col items-center text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-md">
          <Globe className="text-danger-500 size-4" />
          <span className="text-light-90">Global Impact</span>
        </div>

        <h1 className="text-heading-lg md:text-heading-xl mb-6 max-w-4xl text-white">
          Become a{" "}
          <span className="text-danger-500">
            Ministry
            <br className="hidden md:block" /> Partner
          </span>
        </h1>

        <p className="text-body-lg text-light-100 mx-auto mb-10 max-w-2xl">
          Join us in expanding God's kingdom globally. Your partnership helps plant churches, train leaders, and
          transform communities.
        </p>

        {/* Action Buttons */}
        <div className="flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row">
          <Button
            size="xl"
            onClick={scrollToImpact}
            className="bg-danger-500 shadow-danger-500/20 hover:bg-danger-600 w-full rounded-full font-bold text-white shadow-lg sm:w-auto"
          >
            Become a Partner
          </Button>

          <Button
            size="xl"
            variant="outline"
            className="w-full rounded-full border-2 border-white/30 bg-black/40 font-bold text-white backdrop-blur-sm sm:w-auto"
          >
            Download Partnership Guide
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PartnerHero;
