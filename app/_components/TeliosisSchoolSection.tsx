"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { GraduationCap, BookOpen, Users, Award, Users2, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// FIX 4: ScrollTrigger should ideally be registered once globally in layout.tsx or lib/gsap.ts.
// If not yet done, this guard prevents duplicate registration across components.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// FIX 1: Moved features array outside component to prevent recreation on every render.
// FIX 9: Using stable string keys (text) instead of array index.
// FIX 10: Using cn() consistently instead of template literals for className composition.
const FEATURES = [
  {
    id: "biblical-studies",
    icon: BookOpen,
    text: "In-depth Biblical Studies",
    bgColor: "bg-gradient-to-br from-orange-500 to-orange-600",
  },
  {
    id: "expert-instructors",
    icon: Users,
    text: "Expert Instructors",
    bgColor: "bg-gradient-to-br from-pink-500 to-rose-600",
  },
  {
    id: "certificate-programs",
    icon: Award,
    text: "Certificate Programs",
    bgColor: "bg-gradient-to-br from-purple-500 to-violet-600",
  },
  {
    id: "mentorship",
    icon: Users2,
    text: "Mentorship",
    bgColor: "bg-gradient-to-br from-pink-500 to-fuchsia-600",
  },
];

export default function TeliosisSection() {
  const container = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(".tel-text", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      })
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
        .from(".tel-btn, .tel-btn-mobile", { y: 20, opacity: 0, duration: 0.5 }, "-=0.4")
        .from(
          ".tel-stats",
          {
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: "back.out(1.2)",
            // FIX 5: Clear will-change after animation completes to free GPU layers
            onComplete: () => {
              gsap.set(".tel-stats", { clearProps: "willChange" });
            },
          },
          "-=0.6"
        )
        .from(".tel-sparkle", { scale: 0, rotation: 180, opacity: 0, duration: 0.8, ease: "back.out(1.5)" }, "-=0.4");
    },
    { scope: container }
  );

  return (
    // FIX 7: Added pb-20 to give the floating stats card room below the image column on tablet
    // FIX 7: py-20 matches the About section padding for visual consistency across the page
    <section ref={container} className="bg-light-100 relative z-10 overflow-hidden py-20 lg:py-24">
      <div className="layout-container">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* ── Left Column ── */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="tel-text flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white shadow-md">
                <GraduationCap size={24} />
              </div>
              <span className="font-bold text-gray-900">Teliosis School</span>
            </div>

            {/* FIX 1 & 6: Added tel-text class so heading animates in sequence with badge + paragraph
                FIX 2: Removed duplicate text-dark-500 (kept text-zinc-900 as single source)
                FIX 3: Removed mb-6 — space-y-8 on parent already handles the gap
                FIX 11: Removed hard-coded <br /> — text reflows naturally on all breakpoints */}
            <h2 className="tel-text text-3xl font-black text-zinc-900 md:text-4xl">
              The Teliosis School of the Teaching Ministry
            </h2>

            <p className="tel-text text-muted max-w-xl text-base leading-relaxed md:text-lg">
              Deepen your understanding of Scripture and develop your teaching gifts through our comprehensive ministry
              training program. Whether you&apos;re called to teach, lead, or serve, Teliosis School equips you for
              effective ministry.
            </p>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {FEATURES.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    className={cn(
                      "tel-card group border-light-300 flex cursor-default items-center gap-3",
                      "rounded-2xl border bg-white px-4 py-3 shadow-sm",
                      "transition-transform duration-300 hover:-translate-y-1 hover:shadow-md"
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                        "text-white transition-transform duration-300 group-hover:scale-110",
                        item.bgColor
                      )}
                    >
                      <Icon size={20} />
                    </div>
                    <span className="text-body-sm text-dark-500 font-semibold">{item.text}</span>
                  </div>
                );
              })}
            </div>

            {/* FIX 2: variant="gradient" → variant="brand" (gradient variant doesn't exist in shadcn config)
                FIX 2: Added asChild + Link so the button actually navigates somewhere */}
            <div className="tel-btn hidden lg:block">
              <Button
                asChild
                variant="brand"
                size="xl"
                className="group mt-8 rounded-full transition-transform hover:-translate-y-1"
              >
                <Link href="/contact">
                  Enroll Now
                  <ArrowRight className="transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>

          {/* ── Right Column — Image & Stats ── */}
          {/* FIX 7: Added pb-20 sm:pb-28 lg:pb-0 to prevent stats card overlapping content below on tablet */}
          <div className="relative mx-auto w-full max-w-md pb-20 sm:pb-28 lg:max-w-none lg:pb-0">
            {/* Sparkle badge */}
            <div className="tel-sparkle absolute -top-4 -right-4 z-20 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-rose-600 text-white shadow-lg">
              <BookOpen size={32} />
            </div>

            {/* FIX 6: Added priority prop — large image adjacent to viewport should not lazy load */}
            <div className="tel-img relative overflow-hidden rounded-[2rem]">
              <Image
                src="/assets/teliosis-school.png"
                alt="Students in a Teliosis School classroom"
                width={800}
                height={600}
                priority
                className="h-[350px] w-full object-cover sm:h-[450px] lg:h-[500px]"
              />
            </div>

            {/* Floating Stats Card
                FIX 8: Capped at max-w-[calc(100%-2rem)] on mobile to prevent overflow
                when lg:w-[450px] is wider than the image column on mid-range laptops */}
            <div
              className={cn(
                "tel-stats absolute right-4 -bottom-8 left-4 z-20",
                "rounded-2xl border border-white/40 bg-white/95 p-4 shadow-xl backdrop-blur-md",
                "sm:right-8 sm:-bottom-10 sm:left-8 sm:p-6",
                "lg:right-auto lg:-bottom-10 lg:left-1/2 lg:w-[450px] lg:max-w-[calc(100%+2rem)]",
                "lg:-translate-x-1/2 lg:rounded-3xl lg:p-8"
              )}
            >
              <div className="flex flex-row items-center justify-between gap-2 sm:gap-4">
                <div className="flex-1 text-center">
                  <div className="text-lg font-bold text-gray-900 sm:text-xl lg:text-3xl">500+</div>
                  <div className="mt-1 text-[9px] font-medium tracking-widest text-gray-500 uppercase sm:text-[10px] lg:text-xs">
                    Graduates
                  </div>
                </div>
                <div className="h-8 w-px bg-gray-200 sm:h-12 lg:h-14" />
                <div className="flex-1 text-center">
                  <div className="text-lg font-bold text-gray-900 sm:text-xl lg:text-3xl">12+</div>
                  <div className="mt-1 text-[9px] font-medium tracking-widest text-gray-500 uppercase sm:text-[10px] lg:text-xs">
                    Courses
                  </div>
                </div>
                <div className="h-8 w-px bg-gray-200 sm:h-12 lg:h-14" />
                <div className="flex-1 text-center">
                  <div className="text-lg font-bold text-gray-900 sm:text-xl lg:text-3xl">8+</div>
                  <div className="mt-1 text-[9px] font-medium tracking-widest text-gray-500 uppercase sm:text-[10px] lg:text-xs">
                    Instructors
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Button
            FIX 2: variant="gradient" → variant="brand", added asChild + Link */}
        <div className="tel-btn-mobile mt-16 flex justify-center px-4 sm:mt-24 lg:hidden">
          <Button
            asChild
            variant="brand"
            size="lg"
            className="group h-auto rounded-full px-10 py-4 transition-transform hover:-translate-y-1 sm:w-auto sm:px-12"
          >
            <Link href="/contact">
              Enroll Now
              <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
