"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail } from "lucide-react";

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

  const quickLinks = [
    { href: "/about", label: "About Us" },
    { href: "/devotionals", label: "Devotionals" },
    { href: "/partner", label: "Partner With Us" },
    { href: "/media", label: "Media & Sermons" },
    { href: "/contact", label: "Contact" },
    { href: "/give", label: "Give" },
  ];

  const socialLinks = [
    {
      href: "https://www.facebook.com/share/1B9VJCDzmJ/",
      label: "Facebook",
      icon: Facebook, // lucide — fine
    },
    {
      href: "https://www.instagram.com/reel/DWwQPG7iGFw/?igsh=czUxeWxlZjQ1M204",
      label: "Instagram",
      icon: Instagram, // lucide — fine
    },
    {
      href: "https://www.youtube.com/@teliosisworldoutreach",
      label: "YouTube",
      icon: Youtube, // lucide — fine
    },
    {
      href: "https://podcasters.spotify.com/pod/show/osikhenadavid1",
      label: "Spotify",
      icon: null, // custom SVG
      svg: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
        </svg>
      ),
    },
    {
      href: "https://t.me/teliosisworldoutreach",
      label: "Telegram",
      icon: null, // custom SVG
      svg: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
        </svg>
      ),
    },
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
                const IconComponent = link.icon;

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="text-light-100 hover:bg-danger-500 hover:border-danger-500 hover:shadow-danger-500/20 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    {IconComponent ? <IconComponent className="h-5 w-5" /> : link.svg}
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
                  Teliosis Tudunwada Campus,
                  <br />
                  After Catholic Church, Sauka Road,
                  <br />
                  Tudunwada FHA Lugbe, Abuja.
                </span>
              </div>
              <div className="group flex items-center gap-3 transition-colors hover:text-white">
                <div className="bg-danger-500/10 text-danger-500 group-hover:bg-danger-500/20 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors">
                  <Phone className="h-4 w-4" />
                </div>
                <a href="tel:+2347019145771" className="transition-colors">
                  +234 701 914 5771 / +234 814 629 0513
                </a>
              </div>
              <div className="group flex items-center gap-3 transition-colors hover:text-white">
                <div className="bg-danger-500/10 text-danger-500 group-hover:bg-danger-500/20 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors">
                  <Mail className="h-4 w-4" />
                </div>
                <a href="mailto:teliosisworldoutreach@gmail.com" className="truncate transition-colors">
                  teliosisworldoutreach@gmail.com
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
            {/* <div className="flex gap-6">
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
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
