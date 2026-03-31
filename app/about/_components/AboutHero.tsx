"use client";

import Image from "next/image";
import { Flower2 } from "lucide-react";

const AboutHero = () => {
  return (
    <section className="relative min-h-[450px] w-full overflow-hidden md:h-[600px]">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/assets/aboutpage-hero.jpg"
          alt="About page hero"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="layout-container relative mt-16 flex h-full items-center justify-center px-4 sm:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-sm sm:mb-6 sm:px-6 sm:py-2">
            <Flower2 className="text-danger-500 h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-body-sm sm:text-body-md font-medium text-white">Our Story</span>
          </div>

          {/* Heading */}
          <h1 className="text-heading-lg sm:text-heading-xl text-light-100 mb-4 max-w-xl sm:mb-6 sm:max-w-4xl">
            Transforming Lives Through Faith
          </h1>

          {/* Description */}
          <p className="text-body-sm sm:text-body-lg max-w-md text-white/90 sm:max-w-3xl">
            For over 25 years, we've been a beacon of hope and love in our community, dedicated to helping people
            discover their purpose.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
