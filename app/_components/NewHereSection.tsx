"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, MapPin, Heart, MessageSquare, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const infoCards = [
  {
    icon: Clock,
    title: "Meditation of the God Kind.",
    description: "6:30 AM Monday to Saturday.",
    iconBg: "bg-gradient-to-br from-pink-500 to-fuchsia-600",
  },
  {
    icon: Clock,
    title: "Sunday Service",
    description: "8:00 AM & 10:00 AM.",
    iconBg: "bg-gradient-to-br from-orange-500 to-orange-600",
  },
  {
    icon: Clock,
    title: "School of the Spirit",
    description: "Wednesday 6:00 PM.",
    iconBg: "bg-gradient-to-br from-pink-500 to-rose-600",
  },
  {
    icon: Clock,
    title: "School of Prayer, Prophecy and Miracles",
    description: "Thursday 6:00 PM.",
    iconBg: "bg-gradient-to-br from-pink-500 to-fuchsia-600",
  },
  {
    icon: MessageSquare,
    title: "Children Bible Club",
    description: "Saturday 4:00 PM.",
    iconBg: "bg-gradient-to-br from-pink-500 to-fuchsia-600",
  },
  {
    icon: Heart,
    title: "What to Expect",
    description: "Warm welcomes, uplifting worship, relevant teaching. Come as you are.",
    iconBg: "bg-gradient-to-br from-purple-500 to-violet-600",
  },
];

const commonQuestions = ["What should I wear?", "Where do I park?", "What about my kids?", "How long is the service?"];

interface InfoCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  iconBg: string;
}

const InfoCard = ({ icon: Icon, title, description, iconBg }: InfoCardProps) => {
  // BUG FIX 1: Removed 'transition-all' so Tailwind stops fighting GSAP. Added specific 'transition-colors' instead.
  return (
    <div className="info-card group flex cursor-default gap-4 rounded-xl bg-white/5 p-4 backdrop-blur-sm transition-colors duration-300 hover:-translate-y-1 hover:bg-white/10 hover:shadow-lg hover:shadow-white/5">
      <div
        className={cn(
          "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]",
          iconBg
        )}
      >
        <Icon className="h-5 w-5 text-white" />
      </div>
      <div>
        <h3 className="mb-1 font-semibold text-white transition-colors duration-300 group-hover:text-orange-100">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-gray-400 transition-colors duration-300 group-hover:text-gray-300">
          {description}
        </p>
      </div>
    </div>
  );
};
const NewHereSection = () => {
  const container = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(
        ".new-here-text",
        {
          y: 30,
          opacity: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
        },
        0
      )

        // BUG FIX 1b: Sped up the stagger from 0.1 to 0.05 so the cards drop in much faster and don't keep the user waiting
        .from(
          ".info-card",
          {
            x: -40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.05,
            ease: "power3.out",
          },
          "-=0.5"
        )

        .from(
          ".new-here-btn, .new-here-btn-mobile",
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.4"
        )

        .fromTo(
          ".new-here-image-wrapper",
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "power4.inOut" },
          0
        )
        .fromTo(".new-here-image-inner", { scale: 1.4 }, { scale: 1, duration: 1.5, ease: "power4.inOut" }, 0)

        .from(
          ".new-here-heart",
          {
            y: -50,
            rotation: -25,
            opacity: 0,
            duration: 1.2,
            ease: "back.out(1.5)",
          },
          "-=0.8"
        )

        .from(
          ".new-here-questions",
          {
            y: 50,
            opacity: 0,
            duration: 1.2,
            ease: "back.out(1.2)",
          },
          "-=1"
        );
    },
    { scope: container }
  );

  return (
    <section ref={container} className="relative z-10 overflow-hidden bg-[#0a0a0a] py-24">
      <div className="layout-container">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column - Text & Cards */}
          <div className="order-1 lg:order-1">
            <div className="new-here-text mb-6 inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-sm font-medium text-orange-400">
              <Sparkles className="h-4 w-4" />
              New Here?
            </div>

            <h2 className="new-here-text text-heading-lg mb-6 text-white">
              We Can&apos;t Wait to
              <br />
              Meet You
            </h2>

            <p className="new-here-text mb-10 max-w-md text-lg leading-relaxed text-gray-400">
              Visiting a new church can feel overwhelming, but we&apos;ve got you covered. Here&apos;s everything you
              need to know for a great first visit.
            </p>

            <div className="mb-10 flex flex-col gap-4 sm:grid sm:grid-cols-2 lg:flex lg:flex-col">
              {infoCards.map((card) => (
                <InfoCard key={card.title} {...card} />
              ))}
            </div>

            {/* Desktop Button */}
            <div className="new-here-btn hidden lg:inline-block">
              <Button
                asChild
                variant="gradient"
                size="xl"
                className="group transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(249,115,22,0.6)]"
              >
                <Link href="/contact">
                  Plan Your Visit
                  <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Column - Image with Overlays */}
          <div className="relative order-2 mb-24 lg:order-2 lg:mb-0">
            <div className="new-here-heart absolute -top-6 right-2 z-20 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-pink-500 to-purple-600 shadow-[0_20px_50px_rgba(236,72,153,0.4)] sm:-top-7 sm:-right-5 sm:h-24 sm:w-24">
              <Heart className="h-8 w-8 text-white sm:h-10 sm:w-10" fill="white" fillOpacity={0.3} />
            </div>

            <div className="new-here-image-wrapper relative h-[320px] w-full overflow-hidden rounded-2xl sm:h-[450px] lg:h-[650px]">
              <div className="new-here-image-inner absolute inset-0">
                <Image
                  src="/assets/new-here.png"
                  alt="Welcome to our church community"
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </div>

            <div className="new-here-questions absolute right-4 -bottom-28 left-4 z-20 rounded-xl border border-white/10 bg-zinc-900/95 p-5 shadow-2xl backdrop-blur-md sm:right-12 sm:-bottom-20 sm:left-12 lg:right-auto lg:-bottom-8 lg:-left-12 lg:w-80">
              <div className="mb-4 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-orange-400" />
                <h4 className="font-semibold text-white">Common Questions</h4>
              </div>
              <ul className="mb-5 space-y-3">
                {commonQuestions.map((question) => (
                  <li
                    key={question}
                    className="flex items-center gap-3 text-sm text-gray-300 transition-colors hover:text-white"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-orange-500" />
                    {question}
                  </li>
                ))}
              </ul>
              <Link
                href="/faq"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-orange-400 transition-colors hover:text-orange-300"
              >
                View All FAQs
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* BUG FIX 2: MOBILE BUTTON - Added mt-12, removed w-full, added px-8 so it hugs the text elegantly */}
        <div className="new-here-btn-mobile mt-16 flex justify-center px-4 lg:hidden">
          <Button
            asChild
            variant="gradient"
            size="lg"
            className="group h-auto rounded-full px-8 py-4 transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(249,115,22,0.6)]"
          >
            <Link href="/contact">
              Plan Your Visit
              <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewHereSection;
