"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Heart, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const infoCards = [
  {
    id: "mog",
    icon: BookOpen,
    title: "Meditation of the God Kind.",
    description: "6:30 AM Monday to Saturday — join us every morning for the Word.",
    iconBg: "bg-gradient-to-br from-pink-500 to-fuchsia-600",
  },
  {
    id: "expect",
    icon: Heart,
    title: "What to Expect",
    description: "Warm welcomes, uplifting worship, and relevant teaching. Come as you are.",
    iconBg: "bg-gradient-to-br from-purple-500 to-violet-600",
  },
  {
    id: "campus",
    icon: MapPin,
    title: "Find a Campus Near You",
    description: "Service times vary by campus. Find your nearest location and join us for worship.",
    iconBg: "bg-gradient-to-br from-orange-500 to-orange-600",
    cta: {
      label: "View All Campuses",
      href: "/contact",
    },
  },
];

interface InfoCardProps {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  iconBg: string;
  cta?: { label: string; href: string };
}

const InfoCard = ({ icon: Icon, title, description, iconBg, cta }: InfoCardProps) => {
  return (
    <div className="info-card flex gap-4 rounded-xl bg-white/5 p-4 backdrop-blur-sm">
      <div className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-xl", iconBg)}>
        <Icon className="h-5 w-5 text-white" />
      </div>
      <div>
        <h3 className="mb-1 font-semibold text-white">{title}</h3>
        <p className="text-sm leading-relaxed text-gray-400">{description}</p>
        {cta && (
          <Link
            href={cta.href}
            className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-orange-400 transition-colors hover:text-orange-300"
          >
            {cta.label}
            <ArrowRight className="h-3 w-3" />
          </Link>
        )}
      </div>
    </div>
  );
};

const NewHereSection = () => {
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

      tl.from(
        ".new-here-text",
        {
          y: 30,
          opacity: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          clearProps: "transform,opacity",
        },
        0
      )
        .from(
          ".info-card",
          {
            y: 24,
            opacity: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: "power3.out",
            clearProps: "transform,opacity",
          },
          "-=0.5"
        )
        .from(
          ".new-here-btn",
          {
            y: 16,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
            clearProps: "transform,opacity",
          },
          "-=0.3"
        )
        .fromTo(
          ".new-here-image-wrapper",
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "power4.inOut" },
          0
        )
        .fromTo(
          ".new-here-image-inner",
          { scale: 1.4 },
          { scale: 1, duration: 1.5, ease: "power4.inOut", clearProps: "transform" },
          0
        )
        .from(
          ".new-here-heart",
          {
            y: -40,
            rotation: -20,
            opacity: 0,
            duration: 1,
            ease: "back.out(1.5)",
            clearProps: "transform,opacity",
          },
          "-=0.8"
        )
        .from(
          ".new-here-btn-mobile",
          {
            y: 16,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
            clearProps: "transform,opacity",
          },
          "-=0.4"
        );
    },
    { scope: container }
  );

  return (
    <section ref={container} className="relative z-10 bg-[#0a0a0a] py-24">
      <div className="layout-container">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* ── Left Column ── */}
          <div>
            <div className="new-here-text mb-6 inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-sm font-medium text-orange-400">
              <Sparkles className="h-4 w-4" />
              New Here?
            </div>

            <h2 className="new-here-text mb-6 text-3xl font-black text-white md:text-4xl">
              We Can&apos;t Wait to Meet You
            </h2>

            <p className="new-here-text mb-10 max-w-md text-base leading-relaxed text-gray-400 md:text-lg">
              Visiting a new church can feel overwhelming, but we&apos;ve got you covered. Here&apos;s everything you
              need to know for a great first visit.
            </p>

            <div className="mb-10 flex flex-col gap-4">
              {infoCards.map((card) => (
                <InfoCard key={card.id} {...card} />
              ))}
            </div>

            {/* FIX 1: variant="brand" — "ministry" doesn't exist */}
            <div className="new-here-btn hidden lg:inline-block">
              <Button asChild variant="ministry" size="xl">
                <Link href="/contact" className="flex items-center gap-2">
                  Plan Your Visit
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* ── Right Column ── */}
          <div className="flex flex-col gap-6">
            <div className="new-here-image-wrapper relative rounded-2xl">
              {/* <div className="new-here-heart absolute -top-6 right-2 z-20 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-pink-500 to-purple-600 shadow-[0_20px_50px_rgba(236,72,153,0.4)] sm:-top-7 sm:-right-5 sm:h-24 sm:w-24">
                <Heart className="h-8 w-8 text-white sm:h-10 sm:w-10" fill="white" fillOpacity={0.3} />
              </div> */}

              <div className="new-here-image-inner relative overflow-hidden rounded-2xl">
                <Image
                  src="/assets/new-here.png"
                  alt="Welcome to our church community"
                  width={600}
                  height={700}
                  className="h-[320px] w-full object-cover sm:h-[450px] lg:h-[600px]"
                />
              </div>
            </div>

            {/* FIX 1: variant="brand" — "ministry" doesn't exist
                FIX 3: removed mt-16 — gap-6 on parent handles spacing */}
            <div className="new-here-btn-mobile flex justify-center lg:hidden">
              <Button
                asChild
                variant="ministry"
                size="lg"
                className="group h-auto w-full rounded-full px-8 py-4 transition-transform duration-300 hover:-translate-y-1 sm:w-auto"
              >
                <Link href="/contact" className="flex items-center gap-2">
                  Plan Your Visit
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewHereSection;
