"use client";

import Image from "next/image";
import { Flower2 } from "lucide-react";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const AboutHero = () => {
  const container = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".about-hero-reveal",
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
    <section className="relative isolate flex min-h-[70svh] w-full items-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/assets/aboutpage-hero.jpg"
          alt="Worshippers at Teliosis World Outreach"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div ref={container} className="layout-container relative z-10 w-full px-4 py-24 sm:px-6 sm:py-28 md:py-32">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <div className="about-hero-reveal mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm sm:mb-6 sm:px-5">
            <Flower2 className="text-danger-500 h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-body-sm sm:text-body-md font-medium text-white">About Teliosis</span>
          </div>

          <h1 className="about-hero-reveal text-light-100 mb-4 max-w-4xl text-4xl leading-tight font-semibold sm:mb-6 sm:text-5xl md:text-6xl">
            Transforming lives through faith, truth, and community
          </h1>

          <p className="about-hero-reveal text-body-sm sm:text-body-lg max-w-2xl leading-7 text-white/90">
            Teliosis World Outreach is a Christ-centered community committed to raising disciples, building lives, and
            helping people discover their God-given purpose.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
