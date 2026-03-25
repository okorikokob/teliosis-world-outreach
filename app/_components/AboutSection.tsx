"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const AboutSection = () => {
  const container = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // 1. IMAGE CURTAIN
      tl.fromTo(
        ".about-image-wrapper",
        { clipPath: "inset(100% 0% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "power4.inOut" },
        0
      )
        .fromTo(".about-image-inner", { scale: 1.4 }, { scale: 1, duration: 1.5, ease: "power4.inOut" }, 0)

        // 2. MASKED TEXT
        .from(".about-heading-line", { y: 100, duration: 1, ease: "expo.out" }, 0.1)
        .from(".about-p", { opacity: 0, y: 20, duration: 1, stagger: 0.15, ease: "power3.out" }, 0.3)

        // 3. THE BUTTON (Animated specifically so both mobile and desktop versions pop in beautifully)
        .from(".about-btn", { opacity: 0, y: 20, duration: 1, ease: "power3.out" }, 0.6)

        // 4. STATS CARD
        .from(
          ".about-stats",
          {
            y: 40,
            opacity: 0,
            duration: 1,
            ease: "back.out(1.5)",
            onComplete: () => {
              gsap.to(".about-stats", {
                y: "-=8", // Slightly smaller hover for mobile compatibility
                duration: 2,
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1,
              });
            },
          },
          0.8
        );
    },
    { scope: container }
  );

  return (
    <section
      id="about"
      ref={container}
      className="bg-light-100 relative z-10 overflow-hidden py-20 shadow-[0_-20px_50px_rgba(0,0,0,0.3)] lg:py-24"
    >
      <div className="layout-container">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Left Column - Text Content */}
          <div className="order-1">
            <div className="mb-4 overflow-hidden pb-2 sm:mb-6">
              <h2 className="text-3xl font-black text-zinc-900 md:text-4xl">
                About <span className="text-danger-500">Us</span>
              </h2>
            </div>

            <p className="about-p text-muted text-body-lg mb-6 max-w-xl">
              Teliosis World Outreach is a vibrant community of believers committed to spreading the Gospel and making
              disciples of all nations. Our mission is rooted in love, faith, and the transformative power of God&apos;s
              Word.
            </p>

            <p className="about-p text-muted text-body-lg mb-8 max-w-xl">
              We believe in creating an atmosphere where everyone can experience God&apos;s presence, grow in their
              faith, and discover their God-given purpose.
            </p>

            {/* UPGRADE: Desktop Button - Hidden on mobile, visible on large screens */}
            <div className="about-btn hidden lg:inline-block">
              <Button
                asChild
                variant="brand"
                size="xl"
                className="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <Link href="/about">
                  Learn More About Us
                  <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Column - Image with Floating Card */}
          {/* UPGRADE: Added pb-16 to give the card room to breathe on mobile without overlapping the new button */}
          <div className="relative order-2 pb-12 lg:pb-0">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="about-image-wrapper">
                <div className="about-image-inner overflow-hidden rounded-2xl">
                  <Image
                    src="/assets/aboutImage.png"
                    alt="About Teliosis World Outreach"
                    width={600}
                    height={500}
                    className="h-auto w-full object-cover"
                  />
                </div>
              </div>

              {/* UPGRADE: Compact Mobile Stats Card */}
              {/* Force flex-row, smaller text, and tighter padding on small screens */}
              <div className="about-stats absolute right-4 -bottom-8 left-4 rounded-xl border border-gray-100 bg-white p-3 shadow-xl sm:right-8 sm:-bottom-10 sm:left-8 lg:right-auto lg:-bottom-10 lg:left-[-40px] lg:p-6">
                <div className="flex flex-row items-center justify-between gap-2 sm:gap-4">
                  <div className="text-center sm:text-left">
                    <p className="text-dark-500 sm:text-heading-sm text-base font-bold">15+</p>
                    {/* Mobile-only short text */}
                    <p className="text-muted text-[10px] sm:hidden">Years</p>
                    {/* Desktop/Tablet full text */}
                    <p className="text-muted sm:text-body-sm hidden text-xs sm:block">Of Faithful Ministry</p>
                  </div>
                  <div className="h-6 w-px bg-gray-200 sm:h-12" />
                  <div className="text-center sm:text-left">
                    <p className="text-dark-500 sm:text-heading-sm text-base font-bold">5k+</p>
                    <p className="text-muted text-[10px] sm:hidden">Members</p>
                    <p className="text-muted sm:text-body-sm hidden text-xs sm:block">Community Members</p>
                  </div>
                  <div className="h-6 w-px bg-gray-200 sm:h-12" />
                  <div className="text-center sm:text-left">
                    <p className="text-dark-500 sm:text-heading-sm text-base font-bold">100+</p>
                    <p className="text-muted text-[10px] sm:hidden">Outreaches</p>
                    <p className="text-muted sm:text-body-sm hidden text-xs sm:block">Global Outreaches</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="about-btn mt-8 flex justify-center px-4 lg:hidden">
          <Button
            asChild
            variant="brand"
            size="lg"
            className="group h-auto rounded-full px-8 py-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:py-3"
          >
            <Link href="/about">
              Learn More About Us
              <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
