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

        // 2. MASKED HEADING — now correctly targets .about-heading-line
        .from(".about-heading-line", { y: 100, duration: 1, ease: "expo.out" }, 0.1)
        .from(".about-p", { opacity: 0, y: 20, duration: 1, stagger: 0.15, ease: "power3.out" }, 0.3)

        // 3. BUTTON
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
                y: "-=8",
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
            {/* FIX 1 & 6: Added about-heading-line class to h2 so GSAP animation targets it correctly */}
            <div className="mb-4 overflow-hidden pb-2 sm:mb-6">
              <h2 className="about-heading-line text-3xl font-black text-zinc-900 md:text-4xl">
                About <span className="text-danger-500">Us</span>
              </h2>
            </div>

            {/* FIX 5: Replaced text-body-lg (20px) with text-base/md:text-lg for better column fit */}
            {/* CONTENT: Updated to match the About page text */}
            <p className="about-p text-muted mb-6 max-w-xl text-base leading-relaxed md:text-lg">
              Teliosis World Outreach is a fellowship of maturing saints and a school of discipleship, committed to
              raising people into intimate fellowship with Jesus Christ through the teaching of God&apos;s Word,
              effectual prayer, and practical discipleship.
            </p>

            <p className="about-p text-muted mb-8 max-w-xl text-base leading-relaxed md:text-lg">
              Through the ministry of Pastor Peter E. Nwoji and the labor of the Teliosis family, believers are built
              up, empowered, and equipped to dominate their world through the Word of God and prayer — impacting lives
              through campuses and fellowship centres across the world.
            </p>

            {/* Desktop Button */}
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

          {/* Right Column - Image with Floating Stats Card */}
          <div className="relative order-2 pb-16 lg:pb-0">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* FIX 3: overflow-hidden + rounded-2xl moved to wrapper so scale animation
                  doesn't bleed outside rounded corners during the 1.4 → 1 transition */}
              <div className="about-image-wrapper overflow-hidden rounded-2xl">
                <div className="about-image-inner">
                  {/* FIX 4: Fixed height so the image column doesn't collapse or
                      mismatch the text column height based on image aspect ratio */}
                  <Image
                    src="/assets/aboutImage.png"
                    alt="About Teliosis World Outreach"
                    width={600}
                    height={500}
                    className="h-[350px] w-full object-cover lg:h-[500px]"
                  />
                </div>
              </div>

              {/* Floating Stats Card */}
              <div className="about-stats absolute right-4 -bottom-8 left-4 rounded-xl border border-gray-100 bg-white p-3 shadow-xl sm:right-8 sm:-bottom-10 sm:left-8 lg:right-auto lg:-bottom-10 lg:left-[-40px] lg:p-6">
                <div className="flex flex-row items-center justify-between gap-2 sm:gap-4">
                  <div className="text-center sm:text-left">
                    <p className="text-dark-500 sm:text-heading-sm text-base font-bold">8+</p>
                    <p className="text-muted text-[10px] sm:hidden">Years</p>
                    <p className="text-muted sm:text-body-sm hidden text-xs sm:block">Years of Ministry</p>
                  </div>
                  <div className="h-6 w-px bg-gray-200 sm:h-12" />
                  <div className="text-center sm:text-left">
                    <p className="text-dark-500 sm:text-heading-sm text-base font-bold">200+</p>
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

        {/* Mobile Button */}
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
