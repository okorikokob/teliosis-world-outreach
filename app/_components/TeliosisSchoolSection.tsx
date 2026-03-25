"use client";

import { useRef } from "react";
import Image from "next/image";
import { GraduationCap, BookOpen, Users, Award, Users2, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TeliosisSection() {
  const container = useRef(null);

  const features = [
    {
      icon: <BookOpen size={20} />,
      text: "In-depth Biblical Studies",
      iconColor: "text-white",
      bgColor: "bg-gradient-to-br from-orange-500 to-orange-600",
    },
    {
      icon: <Users size={20} />,
      text: "Expert Instructors",
      iconColor: "text-white",
      bgColor: "bg-gradient-to-br from-pink-500 to-rose-600",
    },
    {
      icon: <Award size={20} />,
      text: "Certificate Programs",
      iconColor: "text-white",
      bgColor: "bg-gradient-to-br from-purple-500 to-violet-600",
    },
    {
      icon: <Users2 size={20} />,
      text: "Mentorship",
      iconColor: "text-white",
      bgColor: "bg-gradient-to-br from-pink-500 to-fuchsia-600",
    },
  ];

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(".tel-text", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      })
        .from(
          ".tel-img",
          {
            scale: 0.95,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.6"
        )
        .from(
          ".tel-card",
          {
            y: 20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.8"
        )
        .from(".tel-btn, .tel-btn-mobile", { y: 20, opacity: 0, duration: 0.5 }, "-=0.4")
        .from(".tel-stats", { y: 40, opacity: 0, duration: 0.8, ease: "back.out(1.2)" }, "-=0.6")
        .from(".tel-sparkle", { scale: 0, rotation: 180, opacity: 0, duration: 0.8, ease: "back.out(1.5)" }, "-=0.4");
    },
    { scope: container }
  );

  return (
    <section ref={container} className="bg-light-100 relative z-10 overflow-hidden py-12 lg:py-24">
      <div className="layout-container">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* Left Column Text */}
          <div className="space-y-8">
            <div className="tel-text flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white shadow-md">
                <GraduationCap size={24} />
              </div>
              <span className="font-bold text-gray-900">Teliosis School</span>
            </div>

            <h2 className="text-dark-500 mb-6 text-3xl font-black text-zinc-900 md:text-4xl">
              The Teliosis School of the <br /> Teaching Ministry
            </h2>

            <p className="tel-text text-body-lg text-muted max-w-xl">
              Deepen your understanding of Scripture and develop your teaching gifts through our comprehensive ministry
              training program. Whether you&apos;re called to teach, lead, or serve, Teliosis School equips you for
              effective ministry.
            </p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {features.map((item, idx) => (
                <div
                  key={idx}
                  className="tel-card border-light-300 flex cursor-default items-center gap-3 rounded-2xl border bg-white px-4 py-3 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${item.bgColor} ${item.iconColor}`}
                  >
                    {item.icon}
                  </div>
                  <span className="text-body-sm text-dark-500 font-semibold">{item.text}</span>
                </div>
              ))}
            </div>

            <div className="tel-btn hidden lg:block">
              <Button
                variant="gradient"
                size="xl"
                className="group mt-8 rounded-full transition-transform hover:-translate-y-1"
              >
                Enroll Now
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>

          {/* Right Column Image & Stats */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none lg:pb-0">
            <div className="tel-sparkle absolute -top-4 -right-4 z-20 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-rose-600 text-white shadow-lg">
              <Sparkles size={32} />
            </div>

            <div className="tel-img relative overflow-hidden rounded-[2rem]">
              <Image
                src="/assets/teliosis-school.png"
                alt="Students in a classroom"
                width={800}
                height={600}
                className="h-[350px] w-full object-cover sm:h-[450px] lg:h-[500px]"
              />
            </div>

            {/* UPGRADE: Used left-4 right-4 for perfect mobile fit, preventing horizontal squishing/scattering */}
            <div className="tel-stats absolute right-4 -bottom-8 left-4 z-20 rounded-2xl border border-white/40 bg-white/95 p-4 shadow-xl backdrop-blur-md sm:right-8 sm:-bottom-10 sm:left-8 sm:p-6 lg:right-auto lg:-bottom-10 lg:left-1/2 lg:w-[450px] lg:-translate-x-1/2 lg:rounded-3xl lg:p-8">
              <div className="flex flex-row items-center justify-between gap-2 sm:gap-4">
                <div className="flex-1 text-center">
                  <div className="text-lg font-bold text-gray-900 sm:text-xl lg:text-3xl">500+</div>
                  <div className="mt-1 text-[9px] font-medium tracking-widest text-gray-500 uppercase sm:text-[10px] lg:text-xs">
                    Graduates
                  </div>
                </div>
                <div className="h-8 w-px bg-gray-200 sm:h-12 lg:h-14" />
                <div className="flex-1 text-center">
                  <div className="text-lg font-bold text-gray-900 sm:text-xl lg:text-3xl">12+</div>
                  <div className="mt-1 text-[9px] font-medium tracking-widest text-gray-500 uppercase sm:text-[10px] lg:text-xs">
                    Courses
                  </div>
                </div>
                <div className="h-8 w-px bg-gray-200 sm:h-12 lg:h-14" />
                <div className="flex-1 text-center">
                  <div className="text-lg font-bold text-gray-900 sm:text-xl lg:text-3xl">8+</div>
                  <div className="mt-1 text-[9px] font-medium tracking-widest text-gray-500 uppercase sm:text-[10px] lg:text-xs">
                    Instructors
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* UPGRADE: Plenty of top margin so it doesn't collide with the fixed stats card */}
        <div className="tel-btn-mobile mt-16 flex justify-center px-4 sm:mt-24 lg:hidden">
          <Button
            variant="gradient"
            size="lg"
            className="group h-auto rounded-full px-10 py-4 transition-transform hover:-translate-y-1 sm:w-auto sm:px-12"
          >
            Enroll Now
            <ArrowRight className="transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
}
