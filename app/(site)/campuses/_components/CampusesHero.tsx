"use client";

import { useRef } from "react";
import { Building2 } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const CampusesHero = () => {
  const container = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".campuses-hero-reveal",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: "power2.out" }
      );
    },
    { scope: container }
  );

  return (
    <section className="relative flex min-h-[450px] w-full flex-col items-center justify-center overflow-hidden py-24">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/assets/location-hero-bg.png')" }}
      >
        <div className="overlay-dark absolute inset-0 backdrop-blur-[2px]" />
      </div>

      <div ref={container} className="layout-container relative z-10 text-center">
        <div className="campuses-hero-reveal mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-md">
          <Building2 className="text-danger-500 size-4" />
          <span className="text-light-90">Our Campuses</span>
        </div>

        <h1 className="campuses-hero-reveal text-heading-lg md:text-heading-xl mb-6 text-white">
          One Church, <span className="text-danger-500">Three Campuses</span>
        </h1>

        <p className="campuses-hero-reveal text-body-lg text-light-70 mx-auto max-w-2xl">
          Wherever you are in Abuja, there&apos;s a Teliosis campus near you. Find your service times, directions,
          and everything you need to plan your visit.
        </p>
      </div>
    </section>
  );
};

export default CampusesHero;
