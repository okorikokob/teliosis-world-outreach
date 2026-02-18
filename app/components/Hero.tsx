"use client";

import Link from "next/link";
import { Play, ChevronDown, ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/assets/hero-background.png')" }}
      />
      {/* Dark Overlay */}
      <div className="overlay-dark absolute inset-0" />
      Decorative Blur Elements
      <div className="blur-red absolute top-0 left-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2" />
      <div className="blur-orange absolute top-20 left-20 h-[400px] w-[400px]" />
      <div className="blur-purple absolute top-0 right-0 h-[500px] w-[500px] translate-x-1/3 -translate-y-1/4" />
      {/* Content Container */}
      <div className="layout-container relative z-10 flex flex-col items-center pt-20 pb-5 text-center">
        {/* Welcome Badge */}
        <div className="flex-center mb-8 gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 backdrop-blur-md">
          <img src="/assets/welcome-icon.png" alt="Welcome" className="h-5 w-5" />
          <span className="text-light-100 text-body-sm">Welcome Home</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-heading-xl text-light-100 mb-6">
          <span>A Place Where</span>
          <br />
          <span className="text-danger-500">Faith Comes Alive</span>
        </h1>

        {/* Subtext */}
        <p className="text-light-70 text-body-lg mb-12 max-w-2xl">
          Join a vibrant community of believers growing together in faith, love, and purpose. Experience worship that
          moves you and teaching that transforms.
        </p>

        {/* CTA Buttons */}
        <div className="flex-column mb-16 gap-4 sm:flex-row">
          {/* Join Us Button - Solid Red */}
          <Link
            href="/visit"
            className="flex-center bg-danger-500 hover:bg-danger-500/90 text-light-100 gap-2 rounded-full px-8 py-4 text-base font-semibold transition-all duration-200"
          >
            Join Us This Sunday
            <ArrowRight className="h-5 w-5" />
          </Link>

          {/* Watch Latest Service Button - Glassmorphism */}
          <Link
            href="/media"
            className="flex-center text-light-100 gap-3 rounded-full border border-white/20 bg-white/10 px-6 py-4 text-base font-medium backdrop-blur-md transition-all duration-200 hover:bg-white/20"
          >
            <div className="flex-center bg-danger-500 h-8 w-8 rounded-full">
              <Play className="h-4 w-4 text-white" />
            </div>
            Watch Latest Service
          </Link>
        </div>

        {/* Service Times Card - Glassmorphism */}
        <div className="flex-column gap-6 rounded-2xl border border-white/20 bg-white/10 px-8 py-5 backdrop-blur-md sm:flex-row sm:gap-12">
          <div className="text-center sm:text-left">
            <p className="text-light-70 text-body-sm mb-1">Sunday Services</p>
            <p className="text-light-100 text-lg font-bold">8:00 AM & 10:00 AM</p>
          </div>
          <div className="hidden h-12 w-px bg-white/20 sm:block" />
          <div className="text-center sm:text-left">
            <p className="text-light-70 text-body-sm mb-1">Wednesday School of the Spirit</p>
            <p className="text-light-100 text-lg font-bold">6:00 PM</p>
          </div>
        </div>

        {/* Discover More Indicator */}
        <div className="mt-12 flex animate-bounce flex-col items-center gap-2">
          <span className="text-light-70 text-body-sm">Discover More</span>
          <div className="flex-center h-8 w-8 rounded-full border border-white/30">
            <ChevronDown className="text-light-100 h-4 w-4" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
