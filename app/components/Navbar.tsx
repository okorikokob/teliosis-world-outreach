"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/devotionals", label: "Devotionals" },
    { href: "/about", label: "About" },
    { href: "/ministries", label: "Ministries" },
    { href: "/media", label: "Media" },
    { href: "/contact", label: "Contact" },
    { href: "/give", label: "Give" },
  ];

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="layout-container">
        <div className="flex-between h-20">
          {/* Logo */}
          <Link href="/" className="flex-center gap-2">
            <Image src="/assets/logo.png" alt="Teliosis World Outreach" width={48} height={48} className="h-12 w-12" />
          </Link>

          {/* Desktop Navigation */}
          <div className="md:flex-center hidden gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-body-lg transition-colors duration-200 ${
                  isScrolled ? "text-gray-900 hover:text-blue-600" : "text-light-70 hover:text-white/80"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Partner Button - Desktop */}
          <Button asChild variant="gradient" size="lg" className="hidden md:inline-flex">
            <Link href="/partner">
              <Heart className="h-5 w-5" />
              Partner
            </Link>
          </Button>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden ${isScrolled ? "text-gray-900" : "text-white hover:bg-white/10"}`}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-gray-200 bg-white md:hidden">
          <div className="space-y-3 px-4 pt-2 pb-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-label block py-2 font-medium text-gray-900 transition-colors duration-200 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button asChild variant="gradient" size="lg" className="mt-4 w-full">
              <Link href="/partner" onClick={() => setIsMenuOpen(false)}>
                <Heart className="h-5 w-5" />
                Partner
              </Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
