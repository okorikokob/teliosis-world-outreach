"use client";

import React from "react";
import { Clock, Share2, PlayCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-[10px] font-black tracking-widest uppercase backdrop-blur-md">
                <span className="bg-danger-500 h-2 w-2 animate-pulse rounded-full" />
                Today's Reading
              </div>

              <div className="flex items-center gap-2 text-xs font-medium text-white/50">
                <Clock size={14} />5 min read
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20">
                <Share2 size={18} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <span className="mb-3 block text-sm font-bold tracking-[0.2em] text-white/40 uppercase">
                {featuredDevotional.scripture}
              </span>

              {/* Title */}
              <h2 className="mb-6 text-4xl leading-[1.1] font-bold tracking-tight md:text-6xl">
                {featuredDevotional.title}
              </h2>

              <p className="mb-10 text-lg leading-relaxed font-medium text-white/70">{featuredDevotional.excerpt}</p>

              <Button
                asChild
                size="xl"
                className="group text-dark rounded-full bg-white px-10 font-black hover:bg-gray-100"
              >
                <Link href={`/devotionals/${featuredDevotional.slug.current}`}>
                  Read Full Devotional
                  <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>

            <div className="relative hidden items-center justify-center lg:col-span-5 lg:flex">
              <div className="from-danger-500/30 absolute inset-0 rounded-full bg-gradient-to-br to-transparent opacity-40 blur-3xl" />

              <div className="relative flex min-h-[320px] w-full flex-col items-center justify-center overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-10 backdrop-blur-md">
                <div className="absolute top-6 left-8 font-serif text-6xl text-white/10 select-none">“</div>

                <p className="relative z-10 text-center text-xl leading-relaxed font-medium text-white/90 italic">
                  {featuredDevotional.verseText?.substring(0, 120)}...
                </p>

                <div className="bg-danger-500 mt-8 h-1 w-12" />
                <p className="mt-4 text-[10px] font-black tracking-[0.3em] text-white/40 uppercase">
                  The Anchor Scripture
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TodaySpotlight;
