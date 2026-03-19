"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, ChevronDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Hero = () => {
  const container = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.from(".hero-blur", { opacity: 0, scale: 0.85, duration: 3, stagger: 0.3 }, 0)
        .from(".hero-badge", { y: 20, opacity: 0, duration: 1.5 }, 0.2)
        .from(".hero-title-line", { y: 130, duration: 1.6, stagger: 0.2 }, 0.3)
        .from(".hero-p", { y: 30, opacity: 0, duration: 1.5 }, 0.6)
        .from(".hero-btn", { y: 20, scale: 0.95, opacity: 0, duration: 1.2, stagger: 0.15 }, 0.8)
        .from(".hero-scroll", { opacity: 0, duration: 1.5 }, 1.2);
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="sticky top-0 z-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden"
    >
      <Image
        src="/assets/hero-background.png"
        alt="Hero background"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      <div className="overlay-dark absolute inset-0" />

      {/* Background Blurs */}
      <div className="hero-blur blur-red absolute top-0 left-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2" />
      <div className="hero-blur blur-orange absolute top-20 left-20 h-[400px] w-[400px]" />
      <div className="hero-blur blur-purple absolute top-0 right-0 h-[500px] w-[500px] translate-x-1/3 -translate-y-1/4" />

      {/* UPGRADE: Added 'h-full justify-center pt-24' so it centers perfectly on mobile */}
      <div className="layout-container relative z-10 flex h-full flex-col items-center justify-center pt-24 pb-10 text-center md:pt-20">
        <div className="hero-badge flex-center my-6 gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 backdrop-blur-md sm:my-8">
          <Image src="/assets/welcome-icon.png" alt="Welcome" width={20} height={20} className="h-5 w-5" />
          <span className="text-light-100 sm:text-body-sm text-xs">Welcome Home</span>
        </div>

        {/* UPGRADE: Shrunk mobile text size using text-5xl, scaling up to text-heading-xl on md */}
        <h1 className="md:text-heading-xl text-light-100 mb-6 flex flex-col items-center text-5xl leading-[1.1] sm:text-6xl">
          <div className="overflow-hidden pb-1 sm:pb-2">
            <span className="hero-title-line block">A Place Where</span>
          </div>
          <div className="overflow-hidden pt-1 pb-2 sm:pt-2 sm:pb-4">
            <span className="hero-title-line text-danger-500 block">Faith Comes Alive</span>
          </div>
        </h1>

        {/* UPGRADE: Adjusted text size and max-width for mobile reading */}
        <p className="hero-p sm:text-body-lg text-light-70 mb-10 max-w-xl px-4 text-sm sm:mb-12 sm:px-0">
          Join a vibrant community of believers growing together in faith, love, and purpose. Experience worship that
          moves you and teaching that transforms.
        </p>

        {/* Buttons Wrapper */}
        <div className="mb-12 flex w-full flex-col items-center gap-4 px-4 sm:mb-16 sm:w-auto sm:flex-row sm:gap-6 sm:px-0">
          <div className="hero-btn w-full sm:w-auto">
            <Button
              asChild
              variant="brand"
              size="xl"
              className="group w-full transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-105 hover:shadow-[0_10px_40px_-10px_rgba(239,68,68,0.8)] sm:w-auto"
            >
              <Link href="/contact">
                Join Us This Sunday
                <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          <div className="hero-btn w-full sm:w-auto">
            <Button
              asChild
              variant="glass"
              size="xl"
              className="w-full gap-3 transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-105 hover:border-white/50 hover:bg-white/20 sm:w-auto"
            >
              <Link href="/media">
                <div className="bg-danger-500 flex h-8 w-8 items-center justify-center rounded-full shadow-[0_0_15px_rgba(239,68,68,0.5)]">
                  <Play className="h-4 w-4 pl-0.5 text-white" />
                </div>
                Watch Latest Service
              </Link>
            </Button>
          </div>
        </div>

        {/* Discover More - Pushed to bottom using mt-auto on mobile if needed, or just let it sit */}
        <div className="hero-scroll mt-auto flex animate-bounce flex-col items-center gap-2 pb-8 sm:mt-0 sm:pb-0">
          <span className="text-light-70 sm:text-body-sm text-xs">Discover More</span>
          <div className="flex-center h-8 w-8 rounded-full border border-white/30">
            <ChevronDown className="text-light-100 h-4 w-4" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
