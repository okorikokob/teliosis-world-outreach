"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Quote } from "lucide-react";

// Register ScrollTrigger safely in Next.js
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const testimonies = [
  {
    id: 1,
    quote:
      "I walked through those doors broken and exhausted. The community didn't just welcome me; they walked with me. Today, my life is entirely transformed.",
    name: "Sarah Jenkins",
    role: "Member since 2021",
  },
  {
    id: 2,
    quote:
      "Hearing the Word taught here completely shifted my paradigm. It's not about religion anymore; it's a living, breathing relationship that changes everything.",
    name: "David Chen",
    role: "Teliosis Graduate",
  },
  {
    id: 3,
    quote:
      "Finding a place where my kids run into the building instead of being dragged has changed everything for our family. The presence of God here is palpable.",
    name: "The Marcus Family",
    role: "Planted in 2019",
  },
];

export default function TestimoniesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Clear cardsRef when testimonies array changes
  useEffect(() => {
    cardsRef.current = [];
  }, []); // Empty dependency array since testimonies is static

  // The 3D Pinned Scrub Engine
  useGSAP(
    () => {
      // 1. Create the ScrollTrigger timeline
      // This pins the entire screen and links the animation directly to the user's scrollbar
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top", // Lock when the section hits the very top of the screen
          end: `+=${testimonies.length * 100}%`, // Scroll distance = 100vh per card
          scrub: 1, // Smooth, buttery scrubbing (1 second catch-up lag)
          pin: true, // Lock the screen!
        },
      });

      // 2. Initial Setup: Stack the cards in faux-3D space
      // We use scale and Y-offset instead of true translateZ to prevent mobile rendering bugs
      cardsRef.current.forEach((card, index) => {
        if (index === 0) {
          gsap.set(card, { zIndex: testimonies.length }); // Front card
          return;
        }

        gsap.set(card, {
          scale: 1 - index * 0.05, // Each card behind gets 5% smaller
          y: index * 40, // Each card drops down 40px to create depth
          opacity: Math.max(0, Math.min(1, 1 - index * 0.3)), // Each card fades into the shadows, clamped to [0,1]
          zIndex: testimonies.length - index,
        });
      });

      // 3. The Scroll Animation Sequence
      testimonies.forEach((_, index) => {
        if (index === testimonies.length - 1) return; // The very last card stays on screen

        // A. The Front Card gets "peeled" off toward the camera
        tl.to(
          cardsRef.current[index],
          {
            y: "-120%", // Flies off the top of the screen
            opacity: 0,
            scale: 1.1, // Zooms in slightly as it passes the viewer
            duration: 1,
            ease: "power2.inOut",
          },
          index
        ); // The 'index' acts as the timeline marker

        // B. All the cards behind it shift forward to take its place
        cardsRef.current.forEach((card, j) => {
          if (j > index) {
            const step = j - index - 1; // Calculate the new position in the stack
            tl.to(
              card,
              {
                scale: 1 - step * 0.05,
                y: step * 40,
                opacity: Math.max(0, Math.min(1, 1 - step * 0.3)), // Clamped to [0,1] to prevent negative opacity
                duration: 1,
                ease: "power2.inOut",
              },
              index
            ); // Animates at the exact same time the front card flies off
          }
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    // Note: h-screen is required so the section locks perfectly into the viewport
    <section
      ref={sectionRef}
      className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-zinc-950"
    >
      {/* Background Ambience */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/10 blur-[120px]" />

      {/* Section Header */}
      <div className="absolute top-12 left-0 z-50 w-full text-center lg:top-24">
        <h2 className="text-heading-sm flex items-center justify-center gap-3 font-bold tracking-widest text-white uppercase">
          <span className="h-px w-8 bg-zinc-700" />
          Lives Changed
          <span className="h-px w-8 bg-zinc-700" />
        </h2>
        <p className="mt-4 animate-pulse text-sm tracking-widest text-zinc-500 uppercase">Keep Scrolling</p>
      </div>

      {/* The 3D Deck Container */}
      <div className="relative mt-12 aspect-[4/5] w-[90%] max-w-4xl sm:aspect-video lg:aspect-[2/1]">
        {testimonies.map((test, i) => (
          <div
            key={test.id}
            ref={(el) => {
              if (el) {
                cardsRef.current[i] = el;
              } else {
                cardsRef.current[i] = null;
              }
            }}
            className="absolute inset-0 flex h-full w-full flex-col items-center justify-center rounded-[2rem] border border-white/10 bg-zinc-900/80 p-8 text-center shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] backdrop-blur-md will-change-transform sm:p-12 lg:rounded-[3rem] lg:p-16"
          >
            <Quote className="text-danger-500 mb-6 h-12 w-12 flex-shrink-0 rotate-180 sm:mb-8 lg:h-16 lg:w-16" />

            <h3 className="mb-8 font-serif text-2xl leading-snug tracking-tight text-balance text-white sm:mb-12 sm:text-3xl sm:leading-[1.3] md:text-4xl lg:text-[2.75rem]">
              "{test.quote}"
            </h3>

            <div className="mt-auto flex flex-col items-center gap-2">
              <p className="text-sm font-bold tracking-widest text-white uppercase sm:text-base">{test.name}</p>
              <p className="text-danger-500 text-xs tracking-wider uppercase sm:text-sm">{test.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
