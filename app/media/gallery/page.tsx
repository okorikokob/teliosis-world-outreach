"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ImageIcon, ArrowLeft, ZoomIn } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";

// --- PLACEHOLDER GALLERY DATA ---
const galleryImages = [
  { id: 1, src: "/assets/servicepage-hero.jpg", alt: "Sunday Service Worship", span: "md:col-span-2 md:row-span-2" },
  { id: 2, src: "/assets/about-hero-image.jpg", alt: "Church Community", span: "col-span-1" },
  { id: 3, src: "/assets/event.png", alt: "Special Event", span: "col-span-1" },
  { id: 4, src: "/assets/impact.png", alt: "Community Outreach", span: "col-span-1" },
  { id: 5, src: "/assets/joshua.jpg", alt: "Youth Ministry", span: "col-span-1" },
  { id: 6, src: "/assets/faith.png", alt: "Worship Team", span: "md:col-span-2" },
];

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-gray-50 pb-24">
      {/* 1. COMPACT HERO HEADER */}
      <section className="bg-zinc-900 py-20 text-center text-white">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-10 flex justify-center">
            <Link
              href="/media"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
            >
              <ArrowLeft size={16} />
              Back to Media Hub
            </Link>
          </div>

          <div className="mb-6 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/20 text-blue-500">
              <ImageIcon size={32} />
            </div>
          </div>

          <h1 className="mb-6 text-4xl font-black tracking-tight md:text-5xl">Photo Gallery</h1>

          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-400">
            Explore moments from our Sunday services, community outreaches, and special events. See what God is doing in
            the Teliosis family.
          </p>
        </div>
      </section>

      {/* 2. INTERACTIVE MASONRY GRID (Powered by shadcn Dialog) */}
      <section className="relative z-10 -mt-8 px-6">
        <div className="mx-auto max-w-7xl rounded-3xl bg-white p-6 shadow-xl md:p-10">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:gap-6">
            {galleryImages.map((image) => (
              <Dialog key={image.id}>
                {/* The Trigger (The Image Card in the Grid) */}
                <DialogTrigger asChild>
                  <button
                    className={`group relative overflow-hidden rounded-2xl bg-gray-100 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${image.span} min-h-[250px] w-full cursor-zoom-in text-left`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:opacity-90"
                    />

                    {/* Hover Overlay with Zoom Icon */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
                      <div className="flex translate-y-4 transform flex-col items-center gap-2 transition-transform duration-300 group-hover:translate-y-0">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg">
                          <ZoomIn size={24} />
                        </div>
                        <span className="font-bold tracking-wide text-white">{image.alt}</span>
                      </div>
                    </div>
                  </button>
                </DialogTrigger>

                {/* The Lightbox (The Full Screen Image View) */}
                <DialogContent className="max-w-5xl border-none bg-transparent p-0 shadow-none">
                  {/* Hidden title for screen reader compliance */}
                  <DialogTitle className="sr-only">{image.alt}</DialogTitle>

                  <div className="relative flex h-[80vh] w-full flex-col items-center justify-center overflow-hidden rounded-md">
                    <Image src={image.src} alt={image.alt} fill className="object-contain" priority />
                  </div>
                  {/* Caption underneath the expanded image */}
                  <p className="mt-2 text-center text-lg font-medium text-white/80">{image.alt}</p>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
