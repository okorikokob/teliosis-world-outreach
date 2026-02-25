"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, MapPin, Heart, MessageSquare, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const infoCards = [
  {
    icon: Clock,
    title: "Service Times",
    description: "Sundays at 8:00 AM & 10:30 AM. Wednesday Bible Study at 6:30 PM.",
    iconBg: "bg-gradient-to-br from-orange-500 to-orange-600",
  },
  {
    icon: MapPin,
    title: "Location & Parking",
    description: "We're at 123 Faith Avenue. Free parking available. Greeters will help you.",
    iconBg: "bg-gradient-to-br from-pink-500 to-rose-600",
  },
  {
    icon: Heart,
    title: "What to Expect",
    description: "Warm welcomes, uplifting worship, relevant teaching. Come as you are.",
    iconBg: "bg-gradient-to-br from-purple-500 to-violet-600",
  },
  {
    icon: MessageSquare,
    title: "Kids & Families",
    description: "Safe, fun programs for all ages. Easy and secure check-in.",
    iconBg: "bg-gradient-to-br from-pink-500 to-fuchsia-600",
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
  return (
    <div className="flex gap-4 rounded-xl bg-white/5 p-4 backdrop-blur-sm">
      <div className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-xl", iconBg)}>
        <Icon className="h-5 w-5 text-white" />
      </div>
      <div>
        <h3 className="mb-1 font-semibold text-white">{title}</h3>
        <p className="text-sm leading-relaxed text-gray-400">{description}</p>
      </div>
    </div>
  );
};

const NewHereSection = () => {
  return (
    <section className="bg-[#0a0a0a] py-24">
      <div className="layout-container">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column - Text & Cards */}
          <div>
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-sm font-medium text-orange-400">
              <Sparkles className="h-4 w-4" />
              New Here?
            </div>

            {/* Heading */}
            <h2 className="text-heading-lg mb-6 text-white">
              We Can&apos;t Wait to
              <br />
              Meet You
            </h2>

            {/* Subtext */}
            <p className="mb-10 max-w-md text-lg leading-relaxed text-gray-400">
              Visiting a new church can feel overwhelming, but we&apos;ve got you covered. Here&apos;s everything you
              need to know for a great first visit.
            </p>

            {/* Info Cards */}
            <div className="mb-10 flex flex-col gap-4">
              {infoCards.map((card) => (
                <InfoCard key={card.title} {...card} />
              ))}
            </div>

            {/* CTA Button */}
            <Button asChild variant="gradient" size="xl">
              <Link href="/visit">
                Plan Your Visit
                <ArrowRight />
              </Link>
            </Button>
          </div>

          {/* Right Column - Image with Overlays */}
          <div className="relative">
            <div className="absolute -top-7 -right-5 z-20 flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-pink-500 to-purple-600 shadow-[0_20px_50px_rgba(236,72,153,0.4)]">
              <Heart className="h-10 w-10 text-white" fill="white" fillOpacity={0.3} />
            </div>
            {/* Main Image */}
            <div className="relative overflow-hidden rounded-2xl">
              <Image
                src="/assets/new-here.png"
                alt="Welcome to our church community"
                width={600}
                height={700}
                className="h-auto w-full object-cover"
              />

              {/* Heart Icon - Top Right */}
            </div>

            {/* Common Questions Overlay - Bottom Left */}
            <div className="absolute -bottom-8 -left-6 z-20 w-[calc(100%-1rem)] rounded-xl border border-white/10 bg-zinc-900 p-5 shadow-2xl sm:w-80 md:-left-12">
              <div className="mb-4 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-gray-400" />
                <h4 className="font-semibold text-white">Common Questions</h4>
              </div>
              <ul className="mb-4 space-y-2.5">
                {commonQuestions.map((question) => (
                  <li key={question} className="flex items-center gap-2 text-sm text-gray-300">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-orange-500" />
                    {question}
                  </li>
                ))}
              </ul>
              <Link
                href="/faq"
                className="inline-flex items-center gap-1 text-sm font-semibold text-orange-400 hover:text-orange-300"
              >
                View All FAQs
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewHereSection;
