"use client";

import { useRef } from "react";
import { Heart, DollarSign, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const cards = [
  {
    id: "give",
    title: "Give",
    description: "Your generosity fuels our mission. Every gift helps us reach more people with hope and love.",
    icon: <DollarSign className="h-8 w-8 text-white" />,
    iconBg: "bg-zinc-900",
    btnText: "Give Now",
    accent: "text-zinc-900",
  },
  {
    id: "partner",
    title: "Partner",
    description: "Join our mission as a ministry partner. Together, we can accomplish more than alone.",
    icon: <Heart className="h-8 w-8 text-white" />,
    iconBg: "bg-danger-500",
    btnText: "Become a Partner",
    accent: "text-danger-500",
  },
];

export default function PartnerSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardGiveRef = useRef<HTMLDivElement>(null);
  const cardPartnerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=120%",
            scrub: 1,
            pin: true,
          },
        });

        tl.to(headerRef.current, { scale: 1.2, opacity: 0, y: -50, duration: 1, ease: "power1.inOut" }, 0);

        tl.fromTo(
          cardGiveRef.current,
          { y: "100vh", x: "-20vw", rotation: -15, opacity: 0 },
          { y: 0, x: 0, rotation: 0, opacity: 1, duration: 1, ease: "power2.out" },
          0.1
        );

        tl.fromTo(
          cardPartnerRef.current,
          { y: "100vh", x: "20vw", rotation: 15, opacity: 0 },
          { y: 0, x: 0, rotation: 0, opacity: 1, duration: 1, ease: "power2.out" },
          0.1
        );
      });

      mm.add("(max-width: 767px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });

        tl.from(headerRef.current, { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" })
          .from(cardGiveRef.current, { y: 30, opacity: 0, duration: 0.6, ease: "power3.out" }, "-=0.4")
          .from(cardPartnerRef.current, { y: 30, opacity: 0, duration: 0.6, ease: "power3.out" }, "-=0.4");
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative flex w-full flex-col items-center justify-center bg-gray-50 py-24 md:h-screen md:flex-row md:overflow-hidden md:py-0"
    >
      {/* Background Decor */}
      <div className="pointer-events-none absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-orange-500/5 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-zinc-900/5 blur-[80px]" />

      <div
        ref={headerRef}
        className="relative z-10 flex flex-col items-center justify-center px-6 text-center md:absolute md:inset-0"
      >
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-2">
          <Heart size={16} fill="currentColor" className="text-danger-500" />
          <span className="text-sm font-bold tracking-widest text-orange-600 uppercase">Make An Impact</span>
        </div>

        <h2 className="mx-auto max-w-5xl text-[3rem] leading-[0.9] font-black tracking-tighter text-balance text-zinc-950 uppercase sm:text-[4.5rem] lg:text-[6rem]">
          Be Part of <br /> <span className="text-danger-500">Something</span> Greater
        </h2>

        <p className="mx-auto mt-8 max-w-2xl animate-pulse font-mono text-lg tracking-widest text-zinc-500 uppercase">
          Scroll to explore &darr;
        </p>
      </div>

      <div className="layout-container relative z-20 mt-16 w-full md:mt-0">
        <div className="pointer-events-none mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:gap-10">
          {/* GIVE CARD */}
          <div
            ref={cardGiveRef}
            className="group pointer-events-auto flex flex-col items-center rounded-[2.5rem] border border-zinc-200/60 bg-white p-10 text-center shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-shadow duration-500 will-change-transform hover:shadow-2xl lg:p-14"
          >
            <div
              className={`mb-10 flex h-20 w-20 items-center justify-center rounded-3xl ${cards[0].iconBg} transform shadow-xl transition-transform duration-500 group-hover:-translate-y-2`}
            >
              {cards[0].icon}
            </div>
            <h3 className={`mb-4 text-3xl font-bold ${cards[0].accent}`}>{cards[0].title}</h3>
            <p className="mb-10 max-w-sm flex-grow text-lg leading-relaxed text-zinc-500">{cards[0].description}</p>
            <Button
              asChild
              variant="default"
              size="xl"
              className="group/btn w-full rounded-full bg-zinc-950 px-10 text-white hover:bg-zinc-800 sm:w-auto"
            >
              <Link href="/give" className="inline-flex items-center gap-2">
                {cards[0].btnText}
                <ArrowRight size={18} className="transition-transform group-hover/btn:translate-x-1" />
              </Link>
            </Button>
          </div>

          {/* PARTNER CARD */}
          <div
            ref={cardPartnerRef}
            className="group border-danger-500/10 pointer-events-auto flex flex-col items-center rounded-[2.5rem] border bg-orange-50/50 p-10 text-center shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-shadow duration-500 will-change-transform hover:shadow-2xl lg:p-14"
          >
            <div
              className={`mb-10 flex h-20 w-20 items-center justify-center rounded-3xl ${cards[1].iconBg} transform shadow-xl shadow-orange-500/20 transition-transform duration-500 group-hover:-translate-y-2`}
            >
              {cards[1].icon}
            </div>
            <h3 className={`mb-4 text-3xl font-bold ${cards[1].accent}`}>{cards[1].title}</h3>
            <p className="mb-10 max-w-sm flex-grow text-lg leading-relaxed text-zinc-600">{cards[1].description}</p>
            <Button
              asChild
              variant="default"
              size="xl"
              className="group/btn bg-danger-500 hover:bg-danger-600 w-full rounded-full px-10 text-white sm:w-auto"
            >
              <Link href="/partner" className="inline-flex items-center gap-2">
                {cards[1].btnText}
                <ArrowRight size={18} className="transition-transform group-hover/btn:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
