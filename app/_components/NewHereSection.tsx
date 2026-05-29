"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Heart, Sparkles, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Removed all service-time specific cards — times vary by campus.
// Kept MOG (consistent across all campuses) and What to Expect.
// Added a new Find a Campus CTA card.
const infoCards = [
  {
    id: "mog",
    icon: BookOpen,
    title: "Meditation of the God Kind.",
    description: "6:30 AM Monday to Saturday — join us every morning for the Word.",
    iconBg: "bg-gradient-to-br from-pink-500 to-fuchsia-600",
  },
  {
    id: "expect",
    icon: Heart,
    title: "What to Expect",
    description: "Warm welcomes, uplifting worship, and relevant teaching.",
    iconBg: "bg-gradient-to-br from-purple-500 to-violet-600",
  },
  {
    id: "campus",
    icon: MapPin,
    title: "Find a Campus Near You",
    description: "Service times vary by campus. Find your nearest location and join us for worship.",
    iconBg: "bg-gradient-to-br from-orange-500 to-orange-600",
    cta: {
      label: "View All Campuses",
      href: "/contact",
    },
  },
];

interface InfoCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  iconBg: string;
  cta?: { label: string; href: string };
}

const InfoCard = ({ icon: Icon, title, description, iconBg, cta }: InfoCardProps) => {
  return (
    <div className="info-card group flex cursor-default gap-4 rounded-xl bg-white/5 p-4 backdrop-blur-sm transition-colors transition-transform duration-300 hover:-translate-y-1 hover:bg-white/10 hover:shadow-lg hover:shadow-white/5 sm:p-4">
      <div
        className={cn(
          "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]",
          iconBg
        )}
      >
        <Icon className="h-5 w-5 text-white" />
      </div>
      <div className="flex min-w-0 flex-col gap-1">
        <h3 className="font-semibold text-white transition-colors duration-300 group-hover:text-orange-100">{title}</h3>
        <p className="text-sm leading-relaxed text-gray-400 transition-colors duration-300 group-hover:text-gray-300">
          {description}
        </p>
        {cta && (
          <Link
            href={cta.href}
            className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-orange-400 transition-colors hover:text-orange-300"
          >
            {cta.label}
            <ArrowRight className="h-3 w-3" />
          </Link>
        )}
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

      tl.from(".new-here-text", { y: 30, opacity: 0, duration: 1, stagger: 0.15, ease: "power3.out" }, 0)
        .from(".info-card", { x: -40, opacity: 0, duration: 0.8, stagger: 0.05, ease: "power3.out" }, "-=0.5")
        .from(".new-here-btn, .new-here-btn-mobile", { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.4")
        .fromTo(
          ".new-here-image-wrapper",
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "power4.inOut" },
          0
        )
        .fromTo(
          ".new-here-image-inner",
          { scale: 1.4 },
          {
            scale: 1,
            duration: 1.5,
            ease: "power4.inOut",
            onComplete: () => {
              gsap.set(".new-here-image-inner", { clearProps: "willChange" });
            },
          },
          0
        )
        .from(".new-here-heart", { y: -50, rotation: -25, opacity: 0, duration: 1.2, ease: "back.out(1.5)" }, "-=0.8")
        .from(".new-here-host", { y: 50, opacity: 0, duration: 1.2, ease: "back.out(1.2)" }, "-=1");
    },
    { scope: container }
  );

  return (
    <section ref={container} className="relative z-10 overflow-hidden bg-[#0a0a0a] py-24">
      <div className="layout-container">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* ── Left Column ── */}
          <div className="order-1 lg:order-1">
            <div className="new-here-text mb-6 inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-sm font-medium text-orange-400">
              <Sparkles className="h-4 w-4" />
              New Here?
            </div>

            <h2 className="new-here-text mb-6 text-3xl font-black text-white md:text-4xl">
              We Can&apos;t Wait to Meet You
            </h2>

            <p className="new-here-text mb-10 max-w-md text-base leading-relaxed text-gray-400 md:text-lg">
              Visiting a new church can feel overwhelming, but we&apos;ve got you covered. Here&apos;s everything you
              need to know for a great first visit.
            </p>

            <div className="mb-10 flex flex-col gap-4">
              {infoCards.map((card) => (
                <InfoCard key={card.id} {...card} />
              ))}
            </div>

            {/* Desktop Button */}
            <div className="new-here-btn hidden lg:inline-block">
              <Button
                asChild
                variant="ministry"
                size="xl"
                className="group transition-transform duration-300 hover:-translate-y-1"
              >
                <Link href="/contact">
                  Plan Your Visit
                  <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>

          {/* ── Right Column ── */}
          <div className="relative order-2 mb-32 lg:order-2 lg:mb-0">
            {/* Heart badge */}
            <div className="new-here-heart absolute -top-6 right-2 z-20 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-pink-500 to-purple-600 shadow-[0_20px_50px_rgba(236,72,153,0.4)] sm:-top-7 sm:-right-5 sm:h-24 sm:w-24">
              <Heart className="h-8 w-8 text-white sm:h-10 sm:w-10" fill="white" fillOpacity={0.3} />
            </div>

            {/* Main Image */}
            <div className="new-here-image-wrapper relative h-[320px] w-full overflow-hidden rounded-2xl sm:h-[450px] lg:h-[650px]">
              <div className="new-here-image-inner absolute inset-0">
                <Image src="/assets/new-here.png" alt="Welcome to our church community" fill className="object-cover" />
              </div>
            </div>

            {/* Host Profile */}
            {/* <div className="mb-5 flex items-center gap-4">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl border-2 border-white/10">
                  <Image src="/assets/pastor-adeboye.png" alt="Apostle Abraham Gospel" fill className="object-cover" />
                </div>
                <div>
                  <p className="font-bold text-white">Apostle Abraham Gospel</p>
                  <p className="text-xs text-orange-400">Follow-up Leader</p>
                  <div className="mt-1 flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="h-1.5 w-1.5 rounded-full bg-orange-500/60" />
                    ))}
                  </div>
                </div>
              </div> */}

            {/* Message */}
            {/* <p className="mb-5 text-sm leading-relaxed text-gray-400">
                Have questions before your first visit? I&apos;m here to help — reach out anytime.
              </p> */}

            {/* WhatsApp CTA */}
            {/* <a
                href="https://wa.me/2348119724117?text=Hello%2C%20I%27d%20like%20to%20know%20more%20about%20Teliosis%20World%20Outreach"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-green-500 px-4 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-400 hover:shadow-lg hover:shadow-green-500/30"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat on WhatsApp
              </a> */}

            {/* Call link */}
            {/* <a
                href="tel:+2348119724117"
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm font-medium text-gray-400 transition-all duration-300 hover:border-white/20 hover:text-white"
              >
                <Phone className="h-4 w-4" />
                +234 811 972 4117
              </a> */}
          </div>
        </div>

        {/* Mobile Button */}
        <div className="new-here-btn-mobile mt-16 flex justify-center px-4 lg:hidden">
          <Button
            asChild
            variant="ministry"
            size="lg"
            className="group h-auto rounded-full px-8 py-4 transition-transform duration-300 hover:-translate-y-1"
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
