"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Youtube, Twitter, MapPin, Phone, Mail, LucideIcon } from "lucide-react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Footer = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(".footer-col", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      }).from(
        ".footer-bottom",
        {
          opacity: 0,
          duration: 1,
          ease: "power2.out",
        },
        "-=0.4"
      );
    },
    { scope: containerRef }
  );

  const iconMap: Record<string, LucideIcon> = {
    facebook: Facebook,
    instagram: Instagram,
    youtube: Youtube,
    twitter: Twitter,
  };

  const quickLinks = [
    { href: "/about", label: "About Us" },
    { href: "/devotionals", label: "Devotionals" },
    { href: "/partner", label: "Partner With Us" },
    { href: "/media", label: "Media & Sermons" },
    { href: "/contact", label: "Contact" },
    { href: "/give", label: "Give" },
  ];

  const socialLinks = [
    { href: "https://facebook.com", label: "Facebook", icon: "facebook" },
    { href: "https://instagram.com", label: "Instagram", icon: "instagram" },
    { href: "https://youtube.com", label: "YouTube", icon: "youtube" },
    { href: "https://twitter.com", label: "Twitter", icon: "twitter" },
  ];

  return (
    <footer ref={containerRef} className="bg-dark text-light-100 relative overflow-hidden">
      <div className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="layout-container py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* Follow Section */}
          <div className="footer-col space-y-6">
            {/* UPGRADE: Added Church Name beside Logo */}
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src="/assets/logo.png"
                alt="Teliosis World Outreach Logo"
                width={60}
                height={60}
                className="h-auto w-12 sm:w-14"
              />
              <span className="text-lg font-bold tracking-wide text-white">
                Teliosis World
                <br className="hidden lg:block xl:hidden" /> Outreach
              </span>
            </Link>
            <p className="text-body-sm text-muted leading-relaxed">
              A place where faith comes alive. Join our community and experience the transformative power of God&apos;s
              love.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((link) => {
                const IconComponent = iconMap[link.icon];
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="text-light-100 hover:bg-danger-500 hover:border-danger-500 hover:shadow-danger-500/20 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <IconComponent className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col space-y-6">
            <h3 className="text-body-md font-bold tracking-wide text-white">Quick Links</h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group text-muted text-label relative flex w-fit items-center transition-colors duration-300 hover:text-white"
                  >
                    {link.label}
                    <span className="bg-danger-500 absolute -bottom-1 left-0 h-px w-0 transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Times */}
          <div className="footer-col space-y-6">
            <h3 className="text-body-md font-bold tracking-wide text-white">Service Times</h3>
            <ul className="text-muted text-body-sm space-y-4">
              <li className="flex flex-col gap-1">
                <span className="font-semibold text-white/90">Sunday Service</span>
                <span>8:00 AM & 10:00 AM</span>
              </li>
              <li className="flex flex-col gap-1">
                <span className="font-semibold text-white/90">School of the Spirit</span>
                <span>Wednesday • 6:00 PM</span>
              </li>
              <li className="flex flex-col gap-1">
                <span className="font-semibold text-white/90">Prayer & Miracles</span>
                <span>Thursday • 6:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Connect Section */}
          <div className="footer-col space-y-6">
            <h3 className="text-body-md font-bold tracking-wide text-white">Connect</h3>
            <div className="text-muted text-body-sm space-y-4">
              <div className="group flex items-start gap-3 transition-colors hover:text-white">
                <div className="bg-danger-500/10 text-danger-500 group-hover:bg-danger-500/20 mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors">
                  <MapPin className="h-4 w-4" />
                </div>
                <span className="leading-relaxed">
                  123 Church Street,
                  <br />
                  City, State 12345
                </span>
              </div>
              <div className="group flex items-center gap-3 transition-colors hover:text-white">
                <div className="bg-danger-500/10 text-danger-500 group-hover:bg-danger-500/20 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors">
                  <Phone className="h-4 w-4" />
                </div>
                <a href="tel:+1234567890" className="transition-colors">
                  (123) 456-7890
                </a>
              </div>
              <div className="group flex items-center gap-3 transition-colors hover:text-white">
                <div className="bg-danger-500/10 text-danger-500 group-hover:bg-danger-500/20 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors">
                  <Mail className="h-4 w-4" />
                </div>
                <a href="mailto:info@teliosisworldoutreach.org" className="truncate transition-colors">
                  info@teliosisworldoutreach.org
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom mt-16 border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-muted text-body-sm text-center md:text-left">
              © {new Date().getFullYear()} Teliosis World Outreach. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="/privacy"
                className="group text-muted relative w-fit text-sm transition-colors duration-200 hover:text-white"
              >
                Privacy Policy
                <span className="bg-danger-500 absolute -bottom-1 left-0 h-px w-0 transition-all duration-300 group-hover:w-full" />
              </Link>
              <Link
                href="/terms"
                className="group text-muted relative w-fit text-sm transition-colors duration-200 hover:text-white"
              >
                Terms of Service
                <span className="bg-danger-500 absolute -bottom-1 left-0 h-px w-0 transition-all duration-300 group-hover:w-full" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
