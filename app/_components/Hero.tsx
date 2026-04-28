"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger"; // 1. Added ScrollTrigger

gsap.registerPlugin(ScrollTrigger); // 2. Registered the plugin

const Hero = () => {
  const container = useRef(null);

  useGSAP(
    () => {
      gsap.set([".hero-badge", ".hero-p", ".hero-btn", ".hero-scroll"], { opacity: 0 });

      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.from(".hero-blur", { opacity: 0, scale: 0.85, duration: 2.5, stagger: 0.2 })
        .to(".hero-badge", { y: 0, opacity: 1, duration: 1 }, "-=1.5")
        // Reduced y from 130 to 60 for mobile safety
        .from(".hero-title-line", { y: 60, opacity: 0, duration: 1.2, stagger: 0.15 }, "-=1")
        .to(".hero-p", { y: 0, opacity: 1, duration: 1 }, "-=0.8")
        .to(".hero-btn", { y: 0, opacity: 1, duration: 1, stagger: 0.1 }, "-=0.7")
        .to(".hero-scroll", { opacity: 1, y: 0, duration: 1 }, "-=0.5");

      // --- 2. THE SCROLL SCRUB (Optimized) ---
      const scrubTl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "+=100%", // End earlier so content doesn't vanish too fast
          scrub: 0.5, // Reduced from 1 for snappier mobile response
          pin: false,
        },
      });

      scrubTl
        .to(".hero-bg", { y: 80, scale: 1.05, ease: "none" }, 0)
        .to(".hero-content", { y: -50, opacity: 0, ease: "none" }, 0);
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="relative sticky top-0 z-0 flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden bg-black px-6"
    >
      <Image
        src="/assets/hero-background.png"
        alt="Hero background"
        fill
        priority
        className="hero-bg object-cover object-center"
        sizes="100vw"
      />

      <div className="overlay-dark absolute inset-0 bg-black/50" />

      {/* Background Blurs - Made smaller for mobile performance */}
      <div className="hero-blur blur-red absolute top-0 left-0 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 opacity-50 md:h-[600px] md:w-[600px]" />
      <div className="hero-blur blur-purple absolute top-0 right-0 h-[300px] w-[300px] translate-x-1/3 -translate-y-1/4 opacity-40 md:h-[500px] md:w-[500px]" />

      {/* FIXED: Removed h-full to prevent content overflow issues */}
      <div className="hero-content relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-center pt-10 pb-20 text-center md:pt-24">
        <div className="hero-badge flex-center mb-6 gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 backdrop-blur-md">
          <Image src="/assets/welcome-icon.png" alt="Welcome" width={16} height={16} />
          <span className="text-light-100 text-[10px] font-bold tracking-widest uppercase">Welcome Home</span>
        </div>

        <h1 className="text-light-100 mb-6 flex flex-col items-center text-[2.5rem] leading-[1.1] font-bold sm:text-6xl md:text-8xl">
          <div className="overflow-hidden">
            <span className="hero-title-line block">A Place Where</span>
          </div>
          <div className="overflow-hidden">
            <span className="hero-title-line text-danger-500 block">Faith Comes Alive</span>
          </div>
        </h1>

        <p className="hero-p text-light-70 text-body-lg mb-10 max-w-lg leading-relaxed md:text-lg">
          Join a vibrant community of believers growing together in faith, love, and purpose.
        </p>

        <div className="flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row sm:gap-6">
          <Button asChild variant="brand" size="xl" className="hero-btn w-full sm:w-auto">
            <Link href="/contact">Join Us This Sunday</Link>
          </Button>

          <Button asChild variant="glass" size="xl" className="hero-btn w-full sm:w-auto">
            <Link href="/media/sermons" className="flex items-center gap-2">
              <Play className="h-4 w-4 fill-current" />
              Audio Messages
            </Link>
          </Button>
        </div>
      </div>

      {/* Discover More - Placed outside hero-content for fixed bottom positioning */}
      <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2">
        <button
          onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
          className="hero-scroll flex flex-col items-center gap-2"
        >
          <span className="text-light-70 text-[10px] font-medium tracking-widest uppercase">Discover</span>
          <div className="flex h-8 w-8 animate-bounce items-center justify-center rounded-full border border-white/20">
            <ChevronDown className="text-light-100 h-4 w-4" />
          </div>
        </button>
      </div>
    </section>
  );
};

export default Hero;
