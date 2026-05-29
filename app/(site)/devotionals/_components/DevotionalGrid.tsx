"use client";

import React, { useState, useRef, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import { Clock as ClockIcon, ArrowRight as ArrowIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DevotionalFilters from "./DevotionalFilter";
import type { Devotional } from "@/lib/sanity.queries";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface DevotionalGridProps {
  devotionals: Devotional[];
  featuredId?: string;
}

const DevotionalGrid = ({ devotionals, featuredId }: DevotionalGridProps) => {
  const container = useRef(null);
  const [activeTopic, setActiveTopic] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [displayLimit, setDisplayLimit] = useState(9);

  // FIX 2: Track client mount separately from filter changes.
  // This prevents GSAP from ever touching cards on initial hydration.
  const hasMounted = useRef(false);
  const isFilterChange = useRef(false);

  const topicOptions = useMemo(() => {
    const allTopics =
      devotionals?.flatMap((item) => (Array.isArray(item.topics) ? item.topics.filter(Boolean) : [])) ?? [];
    const uniqueTopics = Array.from(new Set(allTopics));
    return ["All", ...uniqueTopics];
  }, [devotionals]);

  // FIX 3: Back to descending — newest devotional first (today → going back).
  // This is the correct pattern: today's devotional at the top of the archive.
  const { allMatching, visibleDevotionals } = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const filtered =
      devotionals?.filter((item) => {
        if (featuredId && item._id === featuredId) return false;
        const title = (item.title ?? "").toString().toLowerCase();
        const scripture = (item.scripture ?? "").toString().toLowerCase();
        const excerpt = (item.excerpt ?? "").toString().toLowerCase();
        const topics = Array.isArray(item.topics) ? item.topics : [];

        const matchesTopic =
          activeTopic === "All" || topics.some((topic: string) => topic.toLowerCase() === activeTopic.toLowerCase());

        const matchesSearch = !query || title.includes(query) || scripture.includes(query) || excerpt.includes(query);

        return matchesTopic && matchesSearch;
      }) ?? [];

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth(); // May = 4
    const currentMonthNum = currentYear * 12 + currentMonth;

    const sorted = [...filtered].sort((a, b) => {
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

      // Future months first — ascending within future months (June 1 before June 10)
      if (isFutureA && isFutureB) return dateA.getTime() - dateB.getTime();

      // Current month second — ascending (May 1 before May 27)
      if (isCurrentA && isCurrentB) return dateA.getTime() - dateB.getTime();

      // Past months last — descending (April 30 before April 1)
      if (isPastA && isPastB) return dateB.getTime() - dateA.getTime();

      // Future always beats current and past
      if (isFutureA) return -1;
      if (isFutureB) return 1;

      // Current always beats past
      if (isCurrentA) return -1;
      if (isCurrentB) return 1;

      return 0;
    });

    return {
      allMatching: sorted,
      visibleDevotionals: sorted.slice(0, displayLimit),
    };
  }, [devotionals, activeTopic, searchQuery, displayLimit]);

  // FIX 2: Mark mounted after first client render
  useEffect(() => {
    hasMounted.current = true;
  }, []);

  // FIX 1 & 2: Filter-change re-animation ONLY.
  // Never runs on initial load — hasMounted + isFilterChange guards prevent it.
  // Cards are never set to opacity:0 on mount so they can't get stuck invisible.
  useGSAP(
    () => {
      if (!hasMounted.current || !isFilterChange.current) return;
      isFilterChange.current = false;
      if (visibleDevotionals.length === 0) return;

      gsap.killTweensOf(".devotional-card");
      gsap.fromTo(
        ".devotional-card",
        { opacity: 0, y: 24, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.45,
          stagger: 0.05,
          ease: "power3.out",
          clearProps: "all",
        }
      );
    },
    { dependencies: [visibleDevotionals], scope: container }
  );

  // FIX 2: Scroll-triggered entrance using once:true so it never double-fires.
  // clearProps ensures cards return to their natural CSS state after animating.
  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: ".grid-start",
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.fromTo(
            ".devotional-card",
            { opacity: 0, y: 48 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.07,
              ease: "power3.out",
              clearProps: "opacity,transform",
            }
          );
        },
      });
    },
    { scope: container }
  );

  const hasMore = allMatching.length > displayLimit;

  const handleLoadMore = () => {
    setDisplayLimit((prev) => prev + 9);
  };

  const handleFilterChange = (topic: string) => {
    isFilterChange.current = true;
    setActiveTopic(topic);
    setDisplayLimit(9);
  };

  const handleSearchChange = (query: string) => {
    isFilterChange.current = true;
    setSearchQuery(query);
    setDisplayLimit(9);
  };

  const handleClearFilters = () => {
    isFilterChange.current = true;
    setActiveTopic("All");
    setSearchQuery("");
    setDisplayLimit(9);
  };

  return (
    <div ref={container}>
      <DevotionalFilters
        topics={topicOptions}
        activeTopic={activeTopic}
        setActiveTopic={handleFilterChange}
        searchQuery={searchQuery}
        setSearchQuery={handleSearchChange}
      />

      <section className="grid-start relative bg-white py-20 md:py-16">
        <Image
          src="/assets/mog-background.png"
          alt="MOG background"
          fill
          className="pointer-events-none object-cover opacity-30"
        />

        <div className="layout-container">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {visibleDevotionals.map((item, idx) => (
              <Link
                key={item._id || idx}
                href={`/devotionals/${item.slug?.current || item._id}`}
                // Cards start fully visible — GSAP animates FROM opacity:0
                // so they never get stuck invisible on hydration mismatch.
                className="devotional-card group hover:border-danger-100 flex cursor-pointer flex-col rounded-[2.5rem] border border-gray-100 bg-white p-10 shadow-sm transition-colors transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="mb-8 flex items-center justify-between">
                  <span className="text-sm font-bold text-gray-400">
                    {new Date(item.publishedAt).toLocaleDateString("en-NG", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      timeZone: "Africa/Lagos",
                    })}
                  </span>
                  <div className="flex items-center gap-1.5 rounded-full bg-gray-50 px-3 py-1 text-[10px] font-bold text-gray-400">
                    <ClockIcon size={12} />
                    {item.readTime} min read
                  </div>
                </div>

                <div className="flex-1">
                  <span className="text-danger-500 mb-3 block text-xs font-bold tracking-wider uppercase">
                    {item.scripture}
                  </span>

                  <h3 className="text-dark group-hover:text-danger-500 mb-4 text-2xl leading-tight font-bold transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-muted mb-8 line-clamp-3 text-sm leading-relaxed">{item.excerpt}</p>
                </div>

                <div className="mt-auto border-t border-gray-50 pt-6">
                  <div className="text-danger-500 group/link flex items-center gap-2 text-sm font-bold">
                    Read Devotional
                    <ArrowIcon size={16} className="transition-transform group-hover/link:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Empty state */}
          {visibleDevotionals.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-muted text-lg">No devotionals found matching your criteria.</p>
              <Button variant="ghost" onClick={handleClearFilters} className="text-danger-500 mt-4 font-bold">
                Clear all filters
              </Button>
            </div>
          )}

          {/* Load More */}
          {hasMore && (
            <div className="mt-20 flex justify-center">
              <Button
                onClick={handleLoadMore}
                variant="ghost"
                size="xl"
                className="group text-dark flex items-center gap-4 rounded-full px-10 py-8 text-lg font-black transition-all hover:bg-gray-50"
              >
                Load More Devotionals
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1A1818] text-white transition-transform group-hover:scale-110">
                  <ArrowIcon size={20} className="rotate-90 transition-transform group-hover:translate-y-1" />
                </div>
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default DevotionalGrid;
