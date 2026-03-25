"use client";

import React, { useState, useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";

import { Clock as ClockIcon, ArrowRight as ArrowIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DevotionalFilters from "./DevotionalFilter";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface DevotionalGridProps {
  devotionals: any[];
}

const DevotionalGrid = ({ devotionals }: DevotionalGridProps) => {
  const container = useRef(null);
  const [activeTopic, setActiveTopic] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const isFirstRender = useRef(true);

  // 1. Pagination State: Start with 9 or 12 (divisible by 3 for the grid)
  const [displayLimit, setDisplayLimit] = useState(3);

  // 2. Filtering Logic + Slice for Pagination
  const { allMatching, visibleDevotionals } = useMemo(() => {
    const filtered =
      devotionals?.filter((item) => {
        const title = (item.title ?? "").toString().toLowerCase();
        const scripture = (item.scripture ?? "").toString().toLowerCase();
        const topics = item.topics ?? [];

        const matchesTopic =
          activeTopic === "All" || topics.some((topic: string) => topic.toLowerCase() === activeTopic.toLowerCase());
        const matchesSearch =
          title.includes(searchQuery.toLowerCase()) || scripture.includes(searchQuery.toLowerCase());

        return matchesTopic && matchesSearch;
      }) ?? [];

    return {
      allMatching: filtered,
      visibleDevotionals: filtered.slice(0, displayLimit),
    };
  }, [devotionals, activeTopic, searchQuery, displayLimit]);

  // 3. GSAP: Initial entrance
  useGSAP(
    () => {
      gsap.from(".devotional-card", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".grid-start",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: container }
  );

  // 4. GSAP: Filter & Load More Transition
  useGSAP(
    () => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }
      if (visibleDevotionals.length > 0) {
        gsap.killTweensOf(".devotional-card");
        document.querySelectorAll(".devotional-card").forEach((el) => el.classList.add("is-animating"));
        gsap.fromTo(
          ".devotional-card",
          { opacity: 0, y: 30, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.05,
            ease: "back.out(1.2)",
            clearProps: "all",
            onComplete: () => {
              document.querySelectorAll(".devotional-card").forEach((el) => el.classList.remove("is-animating"));
            },
          }
        );
      }
    },
    { dependencies: [visibleDevotionals], scope: container }
  );

  const hasMore = allMatching.length > displayLimit;

  const handleLoadMore = () => {
    setDisplayLimit((prev) => prev + 9);
  };

  return (
    <div ref={container}>
      <DevotionalFilters
        activeTopic={activeTopic}
        setActiveTopic={(topic) => {
          setActiveTopic(topic);
          setDisplayLimit(9); // Reset limit when filter changes
        }}
        searchQuery={searchQuery}
        setSearchQuery={(query) => {
          setSearchQuery(query);
          setDisplayLimit(9); // Reset limit when searching
        }}
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
                className="devotional-card group hover:border-danger-100 flex cursor-pointer flex-col rounded-[2.5rem] border border-gray-100 bg-white p-10 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="mb-8 flex items-center justify-between">
                  <span className="text-sm font-bold text-gray-400">
                    {new Date(item.publishedAt).toLocaleDateString()}
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

          {visibleDevotionals.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-muted text-lg">No devotionals found matching your criteria.</p>
              <Button
                variant="ghost"
                onClick={() => {
                  setActiveTopic("All");
                  setSearchQuery("");
                  setDisplayLimit(9);
                }}
                className="text-danger-500 mt-4 font-bold"
              >
                Clear all filters
              </Button>
            </div>
          )}

          {/* LOAD MORE BUTTON */}
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
