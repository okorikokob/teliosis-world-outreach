"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const hamburgerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // NEW: Listen for window resizes
    const handleResize = () => {
      // 768px is the standard Tailwind 'md' breakpoint
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false); // Force the menu closed if we hit desktop size
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    // Initial check just in case
    handleResize();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useGSAP(
    () => {
      if (isMenuOpen) {
        gsap.to(".line-1", { y: 9, rotation: 45, duration: 0.3, ease: "power2.inOut" });
        gsap.to(".line-2", { opacity: 0, x: -10, duration: 0.2, ease: "power2.inOut" });
        gsap.to(".line-3", { y: -9, rotation: -45, duration: 0.3, ease: "power2.inOut" });
      } else {
        gsap.to(".line-1", { y: 0, rotation: 0, duration: 0.3, ease: "power2.inOut" });
        gsap.to(".line-2", { opacity: 1, x: 0, duration: 0.3, ease: "power2.inOut", delay: 0.1 });
        gsap.to(".line-3", { y: 0, rotation: 0, duration: 0.3, ease: "power2.inOut" });
      }
    },
    { dependencies: [isMenuOpen], scope: hamburgerRef }
  );

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/devotionals", label: "Devotionals" },
    { href: "/about", label: "About" },
    { href: "/partner", label: "Partner" },
    { href: "/media", label: "Media" },
    { href: "/contact", label: "Contact" },
    { href: "/give", label: "Give" },
  ];

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        isScrolled || isMenuOpen ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="layout-container">
        <div className="flex h-20 items-center justify-between sm:h-24">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/assets/logo.png"
              alt="Teliosis World Outreach Logo"
              width={60}
              height={60}
              className="h-12 w-12 sm:h-14 sm:w-14 lg:h-[60px] lg:w-[60px]"
            />
            <span
              className={`hidden text-sm font-bold tracking-wide transition-colors duration-300 sm:block md:text-base lg:text-lg ${
                isScrolled || isMenuOpen ? "text-gray-900" : "text-white"
              }`}
            >
              Teliosis World Outreach
            </span>
          </Link>

          <div className="hidden items-center gap-6 md:flex lg:gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group relative text-lg font-medium transition-colors duration-200 ${
                    isScrolled
                      ? isActive
                        ? "text-danger-500"
                        : "hover:text-danger-500 text-gray-900"
                      : isActive
                        ? "font-bold text-white"
                        : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.label}
                  <span
                    className={`bg-danger-500 absolute -bottom-1 left-0 h-0.5 transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
                  ></span>
                </Link>
              );
            })}
          </div>

          <Button asChild variant="gradient" size="lg" className="hidden gap-2 md:flex">
            <Link href="/partner">
              <Heart className="h-4 w-4" />
              Partner
            </Link>
          </Button>

          {/* Upgraded Mobile Button - Removed hover backgrounds */}
          {/* Mobile Menu Button - Powered by GSAP */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`relative cursor-pointer transition-colors md:hidden ${
              isScrolled || isMenuOpen
                ? "text-gray-900 hover:bg-gray-100 hover:text-gray-900"
                : "text-white hover:bg-white/10 hover:text-white"
            }`}
            aria-label="Toggle menu"
          >
            {/* Custom 3-Line Hamburger for GSAP Morphing */}
            <div ref={hamburgerRef} className="relative h-5 w-6">
              <span className="line-1 absolute top-0 left-0 block h-0.5 w-full rounded-full bg-current"></span>
              <span className="line-2 absolute top-1/2 left-0 block h-0.5 w-full -translate-y-1/2 rounded-full bg-current"></span>
              <span className="line-3 absolute bottom-0 left-0 block h-0.5 w-full rounded-full bg-current"></span>
            </div>
          </Button>
        </div>
      </div>

      {/* Upgraded Dropdown - Tighter max-height and slower duration for visible animation */}
      <div
        className={`overflow-hidden border-t border-gray-100 bg-white transition-all duration-500 ease-in-out md:hidden ${
          isMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-1 px-6 py-6 pb-12 shadow-xl">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`block py-3 text-base font-medium transition-colors duration-200 ${
                  isActive ? "text-danger-500" : "hover:text-danger-500 text-gray-900"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="pt-4">
            <Button asChild variant="gradient" size="lg" className="w-full gap-2">
              <Link href="/partner" onClick={() => setIsMenuOpen(false)}>
                <Heart className="h-4 w-4" />
                Partner
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
