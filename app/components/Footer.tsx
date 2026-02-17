"use client";

import Link from "next/link";
import { Facebook, Instagram, Youtube, Twitter, MapPin, Phone, Mail, LucideIcon } from "lucide-react";

const Footer = () => {
  // Icon mapping for social links
  const iconMap: Record<string, LucideIcon> = {
    facebook: Facebook,
    instagram: Instagram,
    youtube: Youtube,
    twitter: Twitter,
  };

  const quickLinks = [
    { href: "/about", label: "About Us" },
    { href: "/sermons", label: "Sermons" },
    { href: "/ministries", label: "Ministries" },
    { href: "/events", label: "Events" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  const socialLinks = [
    { href: "https://facebook.com", label: "Facebook", icon: "facebook" },
    { href: "https://instagram.com", label: "Instagram", icon: "instagram" },
    { href: "https://youtube.com", label: "YouTube", icon: "youtube" },
    { href: "https://twitter.com", label: "Twitter", icon: "twitter" },
  ];

  return (
    <footer className="bg-dark text-light-100">
      <div className="layout-container py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* Follow Section */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <img src="/assets/logo.png" alt="Teliosis World Outreach" className="h-12 w-12" />
            </Link>
            <p className="text-body-sm text-muted">
              A place where faith comes alive. Join our community and experience the transformative power of God's love.
            </p>
            <div className="mt-4 flex gap-4">
              {socialLinks.map((link) => {
                const IconComponent = iconMap[link.icon];
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="text-light-100 hover:text-primary flex h-10 w-10 items-center justify-center rounded-[10px] border border-gray-600 bg-gray-700 transition-colors duration-200"
                  >
                    <IconComponent className="h-6 w-6" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-body-md font-bold">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted hover:text-primary text-label transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Latest Section */}
          <div className="space-y-4">
            <h3 className="text-body-md font-bold">Service Time </h3>
            <p className="text-muted text-body-sm">
              Sunday Service: 10:00 AM <br />
              Wednesday Bible Study: 7:00 PM <br />
              Thursday School of Prayer, Prophecy and Miracle 6:00 PM
            </p>
          </div>

          {/* Connect Section */}
          <div className="space-y-4">
            <h3 className="text-body-md font-bold">Connect</h3>
            <div className="text-muted text-body-sm space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0" />
                <span>123 Church Street, City, State 12345</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <a href="tel:+1234567890" className="hover:text-primary transition-colors duration-200">
                  (123) 456-7890
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <a
                  href="mailto:info@teliosisworldoutreach.org"
                  className="hover:text-primary transition-colors duration-200"
                >
                  info@teliosisworldoutreach.org
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-muted text-body-sm text-center md:text-left">
              © {new Date().getFullYear()} Teliosis World Outreach. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-muted hover:text-primary text-label transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-muted hover:text-primary text-label transition-colors duration-200">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
