"use client";

import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const PartnerHero = () => {
  const container = useRef<HTMLDivElement | null>(null);

  const scrollToImpact = () => {
    document.getElementById("impact")?.scrollIntoView({ behavior: "smooth" });
  };

  useGSAP(
    () => {
      gsap.fromTo(
        ".partner-hero-reveal",
        {
          opacity: 0,
          y: 24,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power2.out",
        }
      );
    },
    { scope: container }
  );

  return (
    <section className="relative flex min-h-[70svh] w-full flex-col items-center justify-center overflow-hidden py-20 sm:py-24 md:min-h-[600px]">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/partner-hero-bg.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
      </div>

      <div ref={container} className="layout-container relative z-10 flex flex-col items-center text-center">
        <div className="partner-hero-reveal mt-6 mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
          <Globe className="text-danger-500 h-4 w-4" />
          <span className="text-light-90">Global Impact</span>
        </div>

        <h1 className="partner-hero-reveal text-heading-lg md:text-heading-xl mb-6 max-w-4xl text-white">
          Become a <span className="text-danger-500">Ministry Partner</span>
        </h1>

        <p className="partner-hero-reveal text-body-lg text-light-100 mx-auto mb-10 max-w-2xl">
          Join us in advancing God’s kingdom through prayer, giving, and global outreach. Your partnership helps raise
          disciples, strengthen ministry work, and transform lives.
        </p>

        <div className="partner-hero-reveal flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row">
          <Button
            size="xl"
            onClick={scrollToImpact}
            className="bg-danger-500 shadow-danger-500/20 hover:bg-danger-600 w-full rounded-full font-bold text-white shadow-lg sm:w-auto"
          >
            Become a Partner
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PartnerHero;
