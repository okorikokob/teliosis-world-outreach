"use client";

import { useRef } from "react";
import Image from "next/image";
import { GraduationCap, BookOpen, Users, Award, Users2, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// 1. Import GSAP
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TeliosisSection() {
  const container = useRef(null);

  const features = [
    {
      icon: <BookOpen size={20} />,
      text: "In-depth Biblical Studies",
      iconColor: "text-white",
      bgColor: "bg-gradient-to-br from-orange-500 to-orange-600",
    },
    {
      icon: <Users size={20} />,
      text: "Expert Instructors",
      iconColor: "text-white",
      bgColor: "bg-gradient-to-br from-pink-500 to-rose-600",
    },
    {
      icon: <Award size={20} />,
      text: "Certificate Programs",
      iconColor: "text-white",
      bgColor: "bg-gradient-to-br from-purple-500 to-violet-600",
    },
    {
      icon: <Users2 size={20} />,
      text: "Mentorship",
      iconColor: "text-white",
      bgColor: "bg-gradient-to-br from-pink-500 to-fuchsia-600",
    },
  ];

  // 2. The Bulletproof GSAP Hook
  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%", // Safe, reliable trigger point
          toggleActions: "play none none reverse",
        },
      });

      // Simple staggered fade up for the left text
      tl.from(".tel-text", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      })

        // Image softly fades and scales in
        .from(
          ".tel-img",
          {
            scale: 0.95,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.6"
        )

        // Feature cards pop in quickly
        .from(
          ".tel-card",
          {
            y: 20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.8"
        )

        // Button, Stats, and Sparkle finish it off
        .from(".tel-btn, .tel-btn-mobile", { y: 20, opacity: 0, duration: 0.5 }, "-=0.4")
        .from(".tel-stats", { y: 40, opacity: 0, duration: 0.8, ease: "back.out(1.2)" }, "-=0.6")
        .from(".tel-sparkle", { scale: 0, rotation: 180, opacity: 0, duration: 0.8, ease: "back.out(1.5)" }, "-=0.4");
    },
    { scope: container }
  );

  return (
    <section ref={container} className="bg-light-100 relative z-10 overflow-hidden py-20">
      <div className="layout-container">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="tel-text flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white shadow-md">
                <GraduationCap size={24} />
              </div>
              <span className="font-bold text-gray-900">Teliosis School</span>
            </div>

            <h2 className="tel-text text-heading-lg text-dark-500 mb-6">
              The Teliosis <br /> School of the <br /> Teaching Ministry
            </h2>

            <p className="tel-text text-body-lg text-muted max-w-xl">
              Deepen your understanding of Scripture and develop your teaching gifts through our comprehensive ministry
              training program. Whether you&apos;re called to teach, lead, or serve, Teliosis School equips you for
              effective ministry.
            </p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {features.map((item, idx) => (
                <div
                  key={idx}
                  className="tel-card border-light-300 flex cursor-default items-center gap-3 rounded-2xl border bg-white px-4 py-3 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${item.bgColor} ${item.iconColor}`}
                  >
                    {item.icon}
                  </div>
                  <span className="text-body-sm text-dark-500 font-semibold">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Desktop Button - Hidden on mobile */}
            <div className="tel-btn hidden lg:block">
              <Button
                variant="gradient"
                size="xl"
                className="group mt-8 rounded-full transition-transform hover:-translate-y-1"
              >
                Enroll Now
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>

          {/* Right Image with Overlays */}
          {/* Added pb-32 lg:pb-0 so the stats card doesn't bleed out on mobile */}
          <div className="relative pb-32 lg:pb-0">
            <div className="tel-sparkle absolute -top-4 -right-4 z-20 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-rose-600 text-white shadow-lg">
              <Sparkles size={32} />
            </div>

            <div className="tel-img relative overflow-hidden rounded-[2rem]">
              <Image
                src="/assets/teliosis-school.png"
                alt="Students in a classroom"
                width={800}
                height={600}
                /* Mobile responsive height */
                className="h-[350px] w-full object-cover sm:h-[450px] lg:h-[500px]"
              />
            </div>

            {/* Stats Overlay */}
            {/* Adjusted bottom position for mobile */}
            <div className="tel-stats border-light-300 absolute bottom-20 left-1/2 z-20 w-[90%] -translate-x-1/2 rounded-3xl border bg-white/95 p-6 shadow-xl backdrop-blur-sm sm:-bottom-16 lg:-bottom-10 lg:p-8">
              <div className="divide-light-300 grid grid-cols-3 divide-x">
                <div className="px-1 text-center">
                  <div className="sm:text-heading-md text-dark-500 text-xl font-bold">500+</div>
                  <div className="sm:text-body-sm text-muted mt-1 text-[10px] uppercase">Graduates</div>
                </div>
                <div className="px-1 text-center">
                  <div className="sm:text-heading-md text-dark-500 text-xl font-bold">12+</div>
                  <div className="sm:text-body-sm text-muted mt-1 text-[10px] uppercase">Courses</div>
                </div>
                <div className="px-1 text-center">
                  <div className="sm:text-heading-md text-dark-500 text-xl font-bold">8+</div>
                  <div className="sm:text-body-sm text-muted mt-1 text-[10px] uppercase">Instructors</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Button - Placed at the very bottom, styled identically to New Here */}
        <div className="tel-btn-mobile mt-8 flex justify-center px-8 lg:hidden">
          <Button
            variant="gradient"
            size="lg"
            className="group h-auto rounded-full px-10 py-4 transition-transform hover:-translate-y-1"
          >
            Enroll Now
            <ArrowRight className="transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
}
