"use client";
import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/src/components/ui/button';
import { gsap } from 'gsap';

export default function HeroSection() {
  const slides = React.useMemo(
    () => [
      {
        image: "/images/home/hero-bg.jpg",
        heading: "Welcome to Teliosis World Outreach",
        tagline: "...perfecting the saints",
        blurb: "Growing in Christ, reaching the world. Explore sermons, events, and ways to partner in the mission." ,
      },
      {
        image: "/images/home/banner-img-03.jpg",
        heading: "Raising Disciples – Impacting Nations",
        tagline: "...perfecting the saints",
        blurb: "Teaching, equipping and sending believers to shine the light of Christ everywhere." ,
      },
    ],
    []
  );

  const [index, setIndex] = React.useState(0);
  const length = slides.length;
  const hasMultiple = length > 1;
  const trackRef = React.useRef<HTMLDivElement | null>(null);
  const contentRefs = React.useRef<HTMLDivElement[]>([]);
  const autoPlayRef = React.useRef<number | null>(null);

  // Autoplay (clears on unmount)
  React.useEffect(() => {
    if (!hasMultiple) return;
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    autoPlayRef.current = window.setInterval(() => {
      setIndex(i => (i + 1) % length);
    }, 7000); // slightly slower cycle
    return () => { if (autoPlayRef.current) clearInterval(autoPlayRef.current); };
  }, [hasMultiple, length]);

  // Initial setup
  React.useEffect(() => {
    if (!trackRef.current) return;
    gsap.set(trackRef.current, { xPercent: -(index * 100) });
    contentRefs.current.forEach((c, i) => {
      if (!c) return;
      if (i === index) gsap.set(c, { autoAlpha: 1, y: 0 }); else gsap.set(c, { autoAlpha: 0, y: 24 });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Animate slide change
  React.useEffect(() => {
    if (!trackRef.current) return;
    gsap.to(trackRef.current, {
      xPercent: -(index * 100),
      duration: 1.6,
      ease: 'power3.inOut'
    });
    const el = contentRefs.current[index];
    if (el) {
      gsap.fromTo(el, { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: 0.9, ease: 'power2.out', overwrite: true, delay: 0.15 });
    }
  }, [index]);

  const goPrev = React.useCallback(() => setIndex((i) => (i - 1 + length) % length), [length]);
  const goNext = React.useCallback(() => setIndex((i) => (i + 1) % length), [length]);

  return (
    <section className="relative overflow-hidden border-b border-color-border">
      <div className="relative">
        <div ref={trackRef} className="flex will-change-transform">
          {slides.map((s, i) => (
            <div key={i} className="w-full shrink-0">
              <div className="relative">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url('${s.image}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                  aria-hidden="true"
                />
                <div className="absolute inset-0 bg-black/45" aria-hidden="true" />
                <div className="relative">
                  <div
                    ref={el => { if (el) contentRefs.current[i] = el; }}
                    className="layout-container--wide py-28 sm:py-36 lg:py-44"
                  >
                    <div className="max-w-3xl mx-auto text-center">
                      <h1 className="hero-title text-white mb-4 text-balance">{s.heading}</h1>
                      <div className="hero-subtitle font-satisfy text-color-accent mb-6">{s.tagline}</div>
                      <p className="mx-auto mb-10 max-w-prose text-white/85 text-sm sm:text-base leading-relaxed">{s.blurb}</p>
                      <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/sermons"><Button size="lg">Browse Sermons</Button></Link>
                        <Link href="/events"><Button variant="ghost" size="lg">Upcoming Events</Button></Link>
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Arrows */}
      {hasMultiple && (
        <>
          <button
            aria-label="Previous slide"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/40 text-white/90 hover:text-white hover:border-white transition-colors"
            onClick={goPrev}
          >
            <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="15 6 9 12 15 18"></polyline>
            </svg>
          </button>
          <button
            aria-label="Next slide"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/40 text-white/90 hover:text-white hover:border-white transition-colors"
            onClick={goNext}
          >
            <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="9 6 15 12 9 18"></polyline>
            </svg>
          </button>
        </>
      )}

      {/* Dots */}
      {hasMultiple && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {slides.map((_, iDot) => (
            <button
              key={iDot}
              aria-label={`Go to slide ${iDot + 1}`}
              className={`w-2.5 h-2.5 rounded-full border transition-colors ${iDot === index ? 'bg-white border-white' : 'border-white/50 bg-white/30 hover:border-white/80'}`}
              onClick={() => setIndex(iDot)}
            />
          ))}
        </div>
      )}

      {/* Scroll-down control */}
      {/* <a href="#next" aria-label="Scroll to content" title="Scroll"
         className="absolute left-1/2 -translate-x-1/2 bottom-6 z-20 text-white/90 hover:text-white">
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/40 hover:border-white transition-colors">
          <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </span>
      </a> */}
    </section>
  );
}
 