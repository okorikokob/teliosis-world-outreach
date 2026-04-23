"use client";

import { MapPin } from "lucide-react";

const LocationHero = () => {
  return (
    <section className="relative flex min-h-[450px] w-full flex-col items-center justify-center overflow-hidden py-24">
      {/* Background Image - The worship/stage background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          // Update this to match your actual background image path
          backgroundImage: "url('/assets/location-hero-bg.png')",
        }}
      >
        {/* Using your custom overlay utility to darken the image */}
        <div className="overlay-dark absolute inset-0 backdrop-blur-[2px]" />
      </div>

      <div className="layout-container relative z-10 text-center">
        {/* Top Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-md">
          <MapPin className="text-danger-500 size-4" fill="currentColor" />
          <span className="text-light-90">Find Us</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-heading-lg md:text-heading-xl mb-6 text-white">
          We're Easy to <span className="text-danger-500">Find</span>
        </h1>

        {/* Subtext */}
        <p className="text-body-lg text-light-70 mx-auto max-w-2xl">
          Located in the heart of Springfield, we're accessible by car, bus, or bike. Plenty of free parking available.
        </p>
      </div>
    </section>
  );
};

export default LocationHero;
