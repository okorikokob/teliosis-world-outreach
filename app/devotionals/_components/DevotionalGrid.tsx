"use client";

import React from "react";
import Image from "next/image";
import { Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const DevotionalGrid = () => {
  // Mock data representing the flow of daily devotionals
  const archives = [
    {
      date: "Yesterday",
      readTime: "4 min read",
      scripture: "Psalm 100:4",
      title: "The Power of Gratitude",
      excerpt:
        "A thankful heart transforms our perspective. Discover how cultivating gratitude can change your daily life...",
    },
    {
      date: "Jan 21",
      readTime: "6 min read",
      scripture: "Matthew 11:28",
      title: "Finding Rest in His Presence",
      excerpt: "In a world that never stops, God invites us to rest. Learn how to find peace in the midst of chaos...",
    },
    {
      date: "Jan 20",
      readTime: "5 min read",
      scripture: "Ecclesiastes 3:1",
      title: "Purpose in Every Season",
      excerpt: "Every season has a purpose. Whether you are in a season of joy or struggle, God is working in you...",
    },
    {
      date: "Jan 19",
      readTime: "4 min read",
      scripture: "Philippians 4:13",
      title: "Strength Beyond Yourself",
      excerpt: "You don't have to carry the burden alone. True strength comes from relying on Him in every moment...",
    },
    {
      date: "Jan 18",
      readTime: "7 min read",
      scripture: "John 15:5",
      title: "Abiding in the Vine",
      excerpt: "Apart from Him, we can do nothing. Explore the depth of intimacy found in abiding in His love...",
    },
    {
      date: "Jan 17",
      readTime: "5 min read",
      scripture: "Romans 8:28",
      title: "All Things for Good",
      excerpt:
        "Even the hardest trials can be turned for good. Let's look at the sovereign hand of God in our trials...",
    },
  ];

  return (
    <section className="relative bg-white py-20 md:py-16">
      <Image
        src="/assets/mog-background.png"
        alt="MOG background"
        fill
        className="pointer-events-none object-cover"
        priority
      />

      <div className="layout-container">
        {/* GRID LAYOUT: 3 columns on desktop, 1 on mobile */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {archives.map((item, idx) => (
            <div
              key={idx}
              className="group hover:border-danger-100 flex cursor-pointer flex-col rounded-[2.5rem] border border-gray-100 bg-white p-10 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              {/* Card Header: Date & Read Time Pill */}
              <div className="mb-8 flex items-center justify-between">
                <span className="text-sm font-bold text-gray-400">{item.date}</span>
                <div className="flex items-center gap-1.5 rounded-full bg-gray-50 px-3 py-1 text-[10px] font-bold text-gray-400">
                  <Clock size={12} />
                  {item.readTime}
                </div>
              </div>

              {/* Card Body */}
              <div className="flex-1">
                <span className="text-danger-500 mb-3 block text-xs font-bold tracking-wider uppercase">
                  {item.scripture}
                </span>
                <h3 className="text-dark group-hover:text-danger-500 mb-4 text-2xl leading-tight font-bold transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted mb-8 line-clamp-3 text-sm leading-relaxed">{item.excerpt}</p>
              </div>

              {/* Card Footer: Action Link */}
              <div className="mt-auto border-t border-gray-50 pt-6">
                <div className="text-danger-500 group/link flex items-center gap-2 text-sm font-bold">
                  Read Devotional
                  <ArrowRight size={16} className="transition-transform group-hover/link:translate-x-1" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM ACTION: View All Button (Matching the center button in your design) */}
        <div className="mt-20 flex justify-center">
          <Button
            variant="ghost"
            size="xl"
            className="group text-dark flex items-center gap-4 rounded-full px-10 py-8 text-lg font-black transition-all hover:bg-gray-50"
          >
            View All Devotionals
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1A1818] text-white transition-transform group-hover:scale-110">
              <ArrowRight size={20} />
            </div>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DevotionalGrid;
