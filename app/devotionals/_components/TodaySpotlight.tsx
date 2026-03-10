"use client";

import React from "react";
import { Clock, Share2, PlayCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TodaySpotlightProps {
  featuredDevotional: any;
}

const TodaySpotlight = ({ featuredDevotional }: TodaySpotlightProps) => {
  if (!featuredDevotional) return null;
  return (
    <section className="bg-white py-12 md:py-20">
      <div className="layout-container">
        <div className="group hover:shadow-danger-500/10 relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-[#5C5C5C] p-8 text-white shadow-2xl transition-all md:p-16">
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* Today Badge */}
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-[10px] font-black tracking-widest uppercase backdrop-blur-md">
                <span className="bg-danger-500 h-2 w-2 animate-pulse rounded-full" />
                Today's Reading
              </div>
              {/* Read Time */}
              <div className="flex items-center gap-2 text-xs font-medium text-white/50">
                <Clock size={14} />5 min read
              </div>
            </div>

            {/* Utility Actions */}
            <div className="flex items-center gap-3">
              <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20">
                <Share2 size={18} />
              </button>
              <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20">
                <PlayCircle size={18} />
              </button>
            </div>
          </div>

          {/* Content Layout */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              {/* Scripture Reference */}
              <span className="mb-3 block text-sm font-bold tracking-[0.2em] text-white/40 uppercase">
                {featuredDevotional.scripture}
              </span>

              {/* Title */}
              <h2 className="mb-6 text-4xl leading-[1.1] font-bold tracking-tight md:text-6xl">
                {featuredDevotional.title}
              </h2>

              {/* Excerpt */}
              <p className="mb-10 text-lg leading-relaxed font-medium text-white/70">{featuredDevotional.excerpt}</p>

              {/* Call to Actions */}
              <div className="flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row">
                <Button size="xl" className="group text-dark rounded-full bg-white px-10 font-black hover:bg-gray-100">
                  Read Full Devotional
                  <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
                </Button>

                <Button
                  variant="outline"
                  size="xl"
                  className="rounded-full border-white/20 bg-transparent px-8 font-bold text-white hover:bg-white/10"
                >
                  Listen to Audio
                </Button>
              </div>
            </div>

            {/* Visual/Decorative Element Side */}
            <div className="relative hidden items-center justify-center lg:col-span-5 lg:flex">
              <div className="from-danger-500/20 absolute inset-0 rounded-full bg-gradient-to-br to-transparent opacity-30 blur-3xl" />
              <div className="relative flex h-72 w-full items-center justify-center overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-sm">
                {/* This would eventually be the cover image for the devotional */}
                <div className="p-8 text-center">
                  <div className="bg-danger-500 mx-auto mb-6 h-1 w-16" />
                  <p className="text-xs font-black tracking-widest text-white/20 uppercase">Daily Inspiration</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TodaySpotlight;
