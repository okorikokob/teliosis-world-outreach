"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight, Clock, Sparkles, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

const devotionals = [
  {
    id: 1,
    label: "Today",
    date: "Feb 18",
    readTime: "5 min read",
    scripture: "Isaiah 41:10",
    title: "Walking in Faith, Not Fear",
    excerpt:
      "Fear can paralyze us, but faith propels us forward. Today, let's explore how to trust in uncertain times...",
    isFeatured: true,
  },
  {
    id: 2,
    label: "Yesterday",
    date: "Feb 17",
    readTime: "4 min read",
    scripture: "Psalm 100:4",
    title: "The Power of Gratitude",
    excerpt:
      "A thankful heart transforms our perspective. Discover how cultivating gratitude can change your daily life...",
    isFeatured: false,
  },
  {
    id: 3,
    label: "Jan 21",
    date: "Jan 21",
    readTime: "6 min read",
    scripture: "Matthew 11:28",
    title: "Finding Rest in His Presence",
    excerpt: "In a world that never stops, God invites us to rest. Learn how to find peace in the midst of chaos...",
    isFeatured: false,
  },
  {
    id: 4,
    label: "Jan 20",
    date: "Jan 20",
    readTime: "5 min read",
    scripture: "Ecclesiastes 3:1",
    title: "Purpose in Every Season",
    excerpt:
      "Every season of life carries meaning, whether joy or struggle. Discover God's purpose in your current season...",
    isFeatured: false,
  },
  {
    id: 5,
    label: "Jan 19",
    date: "Jan 19",
    readTime: "4 min read",
    scripture: "Proverbs 3:5-6",
    title: "Trust in the Lord with All Your Heart",

    excerpt:
      "Every season of life carries meaning, whether joy or struggle. Discover God's purpose in your current season...",
    isFeatured: false,
  },
  {
    id: 6,
    label: "Jan 20",
    date: "Jan 20",
    readTime: "5 min read",
    scripture: "Ecclesiastes 3:1",
    title: "Purpose in Every Season",
    excerpt:
      "Every season of life carries meaning, whether joy or struggle. Discover God's purpose in your current season...",
    isFeatured: false,
  },
];

interface DevotionalCardProps {
  devotional: (typeof devotionals)[0];
}

const DevotionalCard = ({ devotional }: DevotionalCardProps) => {
  const { label, readTime, scripture, title, excerpt, isFeatured } = devotional;

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
            "text-sm font-medium transition-colors duration-300",
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
            "text-sm leading-relaxed transition-colors duration-300",
            isFeatured ? "text-gray-300" : "text-gray-500 group-hover:text-gray-300"
          )}
        >
          {excerpt}
        </p>
      </CardContent>

      <CardFooter className="mt-auto border-t border-current/10 pt-4">
        <Link
          href={`/devotionals/${devotional.id}`}
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

const DevotionalSection = () => {
  const [api, setApi] = useState<CarouselApi>();
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

  return (
    <section className="relative overflow-hidden bg-white py-24">
      {/* Background image */}
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
            {/* Badge */}
            <div className="border-danger-500/20 bg-danger-500/10 text-danger-500 mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium">
              <BookOpen className="h-4 w-4" />
              MOG Daily Devotional
            </div>

            {/* Title */}
            <h2 className="text-heading-lg text-dark-500">Feed Your Soul Daily</h2>
          </div>

          {/* Navigation Arrows */}
          <div className="hidden items-center gap-2 sm:flex">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full hover:cursor-pointer"
              aria-label="Previous devotionals"
              onClick={scrollPrev}
              disabled={!canScrollPrev}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="default"
              size="icon"
              className="rounded-full bg-zinc-800 hover:cursor-pointer hover:bg-zinc-700"
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
          opts={{
            align: "start",
            loop: false,
          }}
          className="mb-12"
        >
          <CarouselContent className="-ml-4">
            {devotionals.map((devotional) => (
              <CarouselItem key={devotional.id} className="basis-[85%] pl-4 sm:basis-1/2 lg:basis-1/4">
                <DevotionalCard devotional={devotional} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* View All Button */}
        <div className="flex justify-center">
          <Button asChild variant="outline" size="xl" className="rounded-full border-gray-300 font-semibold">
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
