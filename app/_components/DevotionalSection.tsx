"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight, Clock, Sparkles, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
// FIX: Removed 'type CarouselApi' from this import line to fix TS error
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

// 1. Import GSAP
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface DevotionalSectionProps {
  devotionals: any[];
  featuredDevotional: any;
}

interface DevotionalCardProps {
  devotional: any;
  isFeatured: boolean;
}

const DevotionalCard = ({ devotional, isFeatured }: DevotionalCardProps) => {
  const scripture = devotional.scripture;
  const title = devotional.title;
  const excerpt = devotional.excerpt;
  const readTime = `${devotional.readTime} min read`;

  const dateObj = new Date(devotional.publishedAt);
  const isToday = new Date().toDateString() === dateObj.toDateString();
  const label = isToday ? "Today" : dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric" });

  return (
    <Card
      className={cn(
        "group h-full border transition-all duration-300",
        isFeatured
          ? "border-zinc-700 bg-zinc-800 text-white"
          : "border-gray-100 bg-white hover:border-zinc-700 hover:bg-zinc-800 hover:text-white"
      )}
    >
      <CardHeader className="gap-0">
        <div className="flex items-center justify-between">
          {/* Date Label */}
          {isFeatured ? (
            <div className="flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1.5 text-xs font-medium text-white">
              <Sparkles className="h-3 w-3" />
              {label}
            </div>
          ) : (
            <span
              suppressHydrationWarning
              className={cn(
                "text-sm font-medium transition-colors duration-300",
                "text-gray-600 group-hover:text-gray-300"
              )}
            >
              {label}
            </span>
          )}

          {/* Read Time */}
          <div
            className={cn(
              "flex items-center gap-1 rounded-full px-2.5 py-1 text-xs transition-colors duration-300",
              isFeatured
                ? "bg-white/10 text-gray-300"
                : "bg-gray-100 text-gray-500 group-hover:bg-white/10 group-hover:text-gray-300"
            )}
          >
            <Clock className="h-3 w-3" />
            {readTime}
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-3">
        {/* Scripture Reference */}
        <span
          className={cn(
            "text-sm font-medium tracking-wider uppercase transition-colors duration-300",
            isFeatured ? "text-red-400" : "text-danger-500 group-hover:text-red-400"
          )}
        >
          {scripture}
        </span>

        {/* Title */}
        <h3 className="text-lg leading-tight font-bold">{title}</h3>

        {/* Excerpt */}
        <p
          className={cn(
            "line-clamp-3 text-sm leading-relaxed transition-colors duration-300",
            isFeatured ? "text-gray-300" : "text-gray-500 group-hover:text-gray-300"
          )}
        >
          {excerpt}
        </p>
      </CardContent>

      <CardFooter className="mt-auto border-t border-current/10 pt-4">
        {/* Link to the dynamic reading page! */}
        <Link
          href={`/devotionals/${devotional.slug.current}`}
          className={cn(
            "inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-300",
            isFeatured ? "text-white hover:text-gray-200" : "text-danger-500 group-hover:text-white"
          )}
        >
          {isFeatured ? "Read Today's Devotional" : "Read Devotional"}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </CardFooter>
    </Card>
  );
};

const DevotionalSection = ({ devotionals, featuredDevotional }: DevotionalSectionProps) => {
  const container = useRef(null); // Added container ref for GSAP

  // FIX: Changed <CarouselApi> to <any> to bypass the TypeScript error
  const [api, setApi] = useState<any>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => api?.scrollPrev(), [api]);
  const scrollNext = useCallback(() => api?.scrollNext(), [api]);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  // 2. THE GSAP ANIMATION HOOK
  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%", // Triggers right as the carousel enters the view
          toggleActions: "play none none reverse",
        },
      });

      // A. The Header floats up smoothly
      tl.from(".devotional-header-item", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      })

        // B. THE SPOTLIGHT ENTRANCE: Featured card shoots up
        .from(
          ".featured-card",
          {
            y: 80,
            scale: 0.9,
            opacity: 0,
            duration: 1.2,
            ease: "expo.out",
            onComplete: () => {
              // THE LIVING SPOTLIGHT: Microscopic infinite breathing effect
              gsap.to(".featured-card", {
                scale: 1.015,
                y: "-=4",
                duration: 3,
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1,
              });
            },
          },
          "-=0.6"
        )

        // C. THE 3D CARD DEAL: Regular cards swing in with 3D rotation
        .from(
          ".regular-card",
          {
            x: 100,
            rotationY: 25, // The 3D flip effect!
            transformOrigin: "left center",
            opacity: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: "power3.out",
          },
          "-=0.8"
        )

        // D. View All Button fades in at the bottom
        .from(
          ".view-all-btn",
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.5"
        );
    },
    { scope: container }
  );

  return (
    // Added ref={container} to the main section
    <section ref={container} className="relative overflow-hidden bg-white py-24">
      <Image
        src="/assets/mog-background.png"
        alt="MOG background"
        fill
        className="pointer-events-none object-cover"
        priority
      />

      <div className="layout-container relative z-10">
        {/* Header */}
        <div className="mb-12 flex items-start justify-between">
          <div>
            {/* Added 'devotional-header-item' class */}
            <div className="devotional-header-item border-danger-500/20 bg-danger-500/10 text-danger-500 mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium">
              <BookOpen className="h-4 w-4" />
              MOG Daily Devotional
            </div>
            {/* Added 'devotional-header-item' class */}
            <h2 className="text-3xl font-black text-zinc-900 md:text-4xl">Feed Your Soul Daily</h2>
          </div>

          {/* Navigation Arrows - Added 'devotional-header-item' class */}
          <div className="devotional-header-item hidden items-center gap-2 sm:flex">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full transition-transform hover:cursor-pointer active:scale-95"
              aria-label="Previous devotionals"
              onClick={scrollPrev}
              disabled={!canScrollPrev}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="default"
              size="icon"
              className="rounded-full bg-zinc-800 transition-transform hover:cursor-pointer hover:bg-zinc-700 active:scale-95"
              aria-label="Next devotionals"
              onClick={scrollNext}
              disabled={!canScrollNext}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Carousel */}
        <Carousel setApi={setApi} opts={{ align: "start", loop: false }} className="mb-12">
          <CarouselContent className="-ml-2 sm:-ml-4">
            {/* FIRST CARD: Featured - Added 'featured-card' class */}
            {featuredDevotional && (
              <CarouselItem className="featured-card basis-[95%] pl-2 sm:basis-1/2 sm:pl-4 lg:basis-1/3">
                <DevotionalCard devotional={featuredDevotional} isFeatured={true} />
              </CarouselItem>
            )}

            {/* THE REST OF THE CARDS - Added 'regular-card' class */}
            {devotionals
              ?.filter((dev) => dev._id !== featuredDevotional?._id)
              .map((devotional) => (
                <CarouselItem
                  key={devotional._id}
                  className="regular-card basis-[95%] pl-2 sm:basis-1/2 sm:pl-4 lg:basis-1/3"
                >
                  <DevotionalCard devotional={devotional} isFeatured={false} />
                </CarouselItem>
              ))}
          </CarouselContent>
        </Carousel>

        {/* View All Button - Added 'view-all-btn' class */}
        <div className="view-all-btn flex justify-center">
          <Button
            asChild
            variant="outline"
            size="xl"
            className="rounded-full border-gray-300 font-semibold transition-transform duration-300 hover:-translate-y-1"
          >
            <Link href="/devotionals">
              View All Devotionals
              <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DevotionalSection;
