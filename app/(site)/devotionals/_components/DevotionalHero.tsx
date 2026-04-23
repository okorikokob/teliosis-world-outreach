"use client";

import React from "react";
import { BookOpen } from "lucide-react";

const DevotionalHero = () => {
  return (
    <section className="relative flex min-h-[500px] w-full flex-col items-center justify-center overflow-hidden py-24 md:min-h-[600px]">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/media-hero.jpg')",
        }}
      >
        <div className="overlay-dark absolute inset-0 backdrop-blur-[2px]" />
      </div>

      <div className="layout-container relative z-10 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-md">
          <BookOpen className="text-danger-500 size-4" fill="currentColor" />
          <span className="text-light-90">MOG Daily Devotional</span>
        </div>

        <h1 className="text-heading-lg md:text-heading-xl mb-6 text-white">
          Feed Your <span className="text-danger-500">Soul</span> Daily
        </h1>

        <p className="text-body-lg text-light-70 mx-auto max-w-2xl">
          Scripture-led teachings from the Man of God to empower your walk and strengthen your faith every single
          morning.
        </p>
      </div>
    </section>
  );
};

export default DevotionalHero;
