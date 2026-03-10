"use client";

import React from "react";
import Image from "next/image";
import { Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DevotionalGridProps {
  devotionals: any[];
}

const DevotionalGrid = ({ devotionals }: DevotionalGridProps) => {
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
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {devotionals?.map((item, idx) => (
            <div
              key={idx}
              className="group hover:border-danger-100 flex cursor-pointer flex-col rounded-[2.5rem] border border-gray-100 bg-white p-10 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="text-sm font-bold text-gray-400">
                  {new Date(item.publishedAt).toLocaleDateString()}
                </span>
                <div className="flex items-center gap-1.5 rounded-full bg-gray-50 px-3 py-1 text-[10px] font-bold text-gray-400">
                  <Clock size={12} />
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
                  <ArrowRight size={16} className="transition-transform group-hover/link:translate-x-1" />
                </div>
              </div>
            </div>
          ))}
        </div>

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
