"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock, ExternalLink, Heart } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CAMPUSES } from "@/lib/campuses";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CampusList = () => {
  const container = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".campus-card");
      cards.forEach((card) => {
        gsap.from(card, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} className="bg-white py-20 md:py-28">
      <div className="layout-container flex flex-col gap-16 md:gap-24">
        {CAMPUSES.map((campus, index) => {
          const isReversed = index % 2 === 1;

          return (
            <article
              key={campus.id}
              className={cn(
                "campus-card grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-14",
                isReversed && "lg:[&>div:first-child]:order-2"
              )}
            >
              {/* Image */}
              <div className="relative h-[280px] w-full overflow-hidden rounded-[2rem] shadow-xl sm:h-[360px] lg:h-[440px]">
                <Image
                  src={campus.image}
                  alt={campus.name}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold tracking-wide text-white backdrop-blur-md">
                  <MapPin className="text-danger-500 h-4 w-4" />
                  {campus.name}
                </div>
              </div>

              {/* Details */}
              <div>
                <h2 className="text-dark mb-6 text-2xl font-black tracking-tight sm:text-3xl md:text-4xl">
                  {campus.name}
                </h2>

                <div className="mb-8 flex flex-col gap-4">
                  <div className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-5">
                    <div className="bg-danger-100 text-danger-500 mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <h3 className="text-dark mb-1 text-sm font-bold">Address</h3>
                      <p className="text-body-sm text-muted whitespace-pre-line">{campus.address}</p>
                      <a
                        href={campus.mapLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-danger-500 hover:text-danger-500/80 mt-2 inline-flex items-center text-xs font-bold"
                      >
                        Get Directions
                        <ExternalLink className="ml-1 size-3" />
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-5">
                    <div className="bg-danger-100 text-danger-500 mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                      <Clock size={18} />
                    </div>
                    <div className="w-full">
                      <h3 className="text-dark mb-2 text-sm font-bold">Service Times</h3>
                      <ul className="flex flex-col gap-1.5">
                        {campus.serviceTimes.map((s) => (
                          <li key={s.day} className="flex items-center justify-between gap-4">
                            <span className="text-body-sm text-dark font-semibold">{s.day}</span>
                            <span className="text-body-sm text-muted">{s.time}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-5">
                    <div className="bg-danger-100 text-danger-500 mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                      <Phone size={18} />
                    </div>
                    <div>
                      <h3 className="text-dark mb-1 text-sm font-bold">Contact</h3>
                      <a
                        href={`tel:${campus.phone.split("/")[0].trim().replace(/\s/g, "")}`}
                        className="text-body-sm text-muted hover:text-danger-500 block transition-colors"
                      >
                        {campus.phone}
                      </a>
                      <a
                        href={`mailto:${campus.email}`}
                        className="text-body-sm text-muted hover:text-danger-500 mt-1 flex items-center gap-1 transition-colors"
                      >
                        <Mail size={12} />
                        {campus.email}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button asChild variant="brand" size="lg" className="w-full sm:w-auto">
                    <a href={campus.mapLink} target="_blank" rel="noopener noreferrer">
                      <MapPin className="h-4 w-4" />
                      Get Directions
                    </a>
                  </Button>
                  {campus.bank && (
                    <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                      <Link href="/give">
                        <Heart className="h-4 w-4" />
                        Give to This Campus
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default CampusList;
