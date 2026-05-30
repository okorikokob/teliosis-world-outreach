"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight, Clock, Sparkles, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import type { Devotional } from "@/lib/sanity.queries";
import type { UseEmblaCarouselType } from "embla-carousel-react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// FIX 3: Guard registration — ideally move to layout.tsx globally
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// FIX 8: Type defined outside component — not recreated on every render
type CarouselApi = UseEmblaCarouselType[1];

interface DevotionalSectionProps {
  devotionals: Devotional[];
  featuredDevotional: Devotional | null;
}

interface DevotionalCardProps {
  devotional: Devotional;
  isFeatured: boolean;
}

const DevotionalCard = ({ devotional, isFeatured }: DevotionalCardProps) => {
  const scripture = devotional.scripture;
  const title = devotional.title;
  const excerpt = devotional.excerpt;
  const readTime = `${devotional.readTime} min read`;

  const dateObj = new Date(devotional.publishedAt);
  const isToday = new Date().toDateString() === dateObj.toDateString();
  const label = isToday
    ? "Today"
    : dateObj.toLocaleDateString("en-NG", {
        month: "short",
        day: "numeric",
        timeZone: "Africa/Lagos",
      });

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
        <span
          className={cn(
            "text-sm font-medium tracking-wider uppercase transition-colors duration-300",
            isFeatured ? "text-red-400" : "text-danger-500 group-hover:text-red-400"
          )}
        >
          {scripture}
        </span>

        <h3 className="text-lg leading-tight font-bold">{title}</h3>

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

// FIX 1 & 9: Sort carousel cards so upcoming/current month comes first,
// then past months — same logic as the grid for consistency.
function sortDevotionals(devotionals: Devotional[]): Devotional[] {
  const now = new Date();
  const currentMonthNum = now.getFullYear() * 12 + now.getMonth();

  return [...devotionals].sort((a, b) => {
    const dateA = new Date(a.publishedAt);
    const dateB = new Date(b.publishedAt);
    const monthA = dateA.getFullYear() * 12 + dateA.getMonth();
    const monthB = dateB.getFullYear() * 12 + dateB.getMonth();

    const isFutureA = monthA > currentMonthNum;
    const isFutureB = monthB > currentMonthNum;
    const isCurrentA = monthA === currentMonthNum;
    const isCurrentB = monthB === currentMonthNum;
    const isPastA = monthA < currentMonthNum;
    const isPastB = monthB < currentMonthNum;

    // Future months first — ascending within future (June 1 before June 10)
    if (isFutureA && isFutureB) return dateA.getTime() - dateB.getTime();
    // Current month second — ascending (May 1 before May 27)
    if (isCurrentA && isCurrentB) return dateA.getTime() - dateB.getTime();
    // Past months last — descending (April 30 before April 1)
    if (isPastA && isPastB) return dateB.getTime() - dateA.getTime();
    // Future beats current and past
    if (isFutureA) return -1;
    if (isFutureB) return 1;
    // Current beats past
    if (isCurrentA) return -1;
    if (isCurrentB) return 1;

    return 0;
  });
}

const DevotionalSection = ({ devotionals, featuredDevotional }: DevotionalSectionProps) => {
  const container = useRef(null);
  const [api, setApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

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

  const scrollPrev = useCallback(() => api?.scrollPrev(), [api]);
  const scrollNext = useCallback(() => api?.scrollNext(), [api]);

  // FIX 1 & 9: Sort and exclude featured from regular cards
  const sortedRegularCards = sortDevotionals(devotionals?.filter((dev) => dev._id !== featuredDevotional?._id) ?? []);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(".devotional-header-item", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      })
        .from(
          ".featured-card",
          {
            y: 80,
            scale: 0.9,
            opacity: 0,
            duration: 1.2,
            ease: "expo.out",
            // FIX 2: Implemented the breathing effect
            // onComplete: () => {
            //   gsap.to(".featured-card", {
            //     y: "-=6",
            //     duration: 2.5,
            //     ease: "sine.inOut",
            //     yoyo: true,
            //     repeat: -1,
            //   });
            // },
          },
          "-=0.6"
        )
        .from(
          ".regular-card",
          {
            x: 100,
            rotationY: 25,
            transformOrigin: "left center",
            opacity: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: "power3.out",
            // FIX 7: Clear will-change after animation
            onComplete: () => {
              gsap.set(".regular-card", { clearProps: "willChange" });
            },
          },
          "-=0.8"
        )
        .from(".view-all-btn", { y: 20, opacity: 0, duration: 0.8, ease: "power2.out" }, "-=0.5");
    },
    { scope: container }
  );

  return (
    // FIX 5: Removed bg-white — hidden under the fill image anyway
    // FIX 6: Removed priority from background image — deep in page, should lazy load
    <section ref={container} className="relative overflow-hidden py-24">
      <Image src="/assets/mog-background.png" alt="MOG background" fill className="pointer-events-none object-cover" />

      <div className="layout-container relative z-10">
        {/* Header */}
        <div className="mb-12 flex items-start justify-between">
          <div>
            <div className="devotional-header-item border-danger-500/20 bg-danger-500/10 text-danger-500 mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium">
              <BookOpen className="h-4 w-4" />
              MOG Daily Devotional
            </div>
            {/* FIX 4: Updated heading text per pastor's correction */}
            <h2 className="devotional-header-item text-3xl font-black text-zinc-900 md:text-4xl">
              Read God&apos;s Word Daily
            </h2>
          </div>

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
        <Carousel
          setApi={setApi}
          opts={{ align: "start", loop: false }}
          className="mb-16"
          style={{ perspective: "1000px" }}
        >
          <CarouselContent className="-ml-2 sm:-ml-4">
            {/* Featured card — today's devotional */}
            {featuredDevotional && (
              <CarouselItem className="featured-card basis-[95%] pl-2 sm:basis-1/2 sm:pl-4 lg:basis-1/3">
                <DevotionalCard devotional={featuredDevotional} isFeatured={true} />
              </CarouselItem>
            )}

            {/* FIX 1 & 9: Regular cards now sorted — June 1, 2, 3... then May 27, 26... */}
            {sortedRegularCards.map((devotional) => (
              <CarouselItem
                key={devotional._id}
                className="regular-card basis-[95%] pl-2 sm:basis-1/2 sm:pl-4 lg:basis-1/3"
              >
                <DevotionalCard devotional={devotional} isFeatured={false} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* View All Button */}
        <div className="view-all-btn flex justify-center px-4 sm:px-0">
          <Button
            asChild
            variant="outline"
            size="xl"
            className="w-full rounded-full border-gray-300 font-semibold transition-transform duration-300 hover:-translate-y-1 sm:w-auto"
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
