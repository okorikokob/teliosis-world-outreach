"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Puzzle, Heart } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <nav className="bg-light-100 shadow-light-200 fixed top-0 right-0 left-0 z-50">
      <div className="layout-container">
        <div className="flex-between h-20">
          {/* Logo */}
          <Link href="/" className="flex-center gap-2">
            <img src="/assets/logo.png" alt="Teliosis World Outreach" className="h-12 w-12" />
          </Link>

          {/* Desktop Navigation */}
          <div className="md:flex-center hidden gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-dark hover:text-primary text-label font-medium transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Partner Button - Desktop */}
          <div className="hidden md:block">
            <Link
              href="/partner"
              className="text-light-100 text-label inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-3 font-semibold transition-opacity duration-200 hover:opacity-90"
            >
              <Heart className="h-5 w-5" />
              Partner
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-dark p-2 md:hidden"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="bg-light-100 border-dark/10 border-t md:hidden">
          <div className="space-y-3 px-4 pt-2 pb-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-dark hover:text-primary text-label block py-2 font-medium transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/partner"
              className="text-light-100 text-label mt-4 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-3 font-semibold"
              onClick={() => setIsMenuOpen(false)}
            >
              <Heart className="h-5 w-5" />
              Partner
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
