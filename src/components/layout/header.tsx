"use client";
import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const nav = [
  { href: '/', label: 'Home' },
  { href: '/sermons', label: 'Sermons' },
  { href: '/events', label: 'Events' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' }
];

export function Header() {
  const pathname = usePathname();
  return (
    <header className="border-b border-color-border bg-color-background-80 ">
      {/* Top utility bar */}
      <div className="bg-color-primary ">
        <div className="layout-container--wide h-topbar flex items-center justify-between text-sm text-color-primary-foreground h-14">
          {/* Left: Contact info with icons */}
          <div className="flex items-center gap-6">
            <a href="mailto:info@teliosis.org" className="link-inverse flex items-center gap-2">
              <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="5" width="18" height="14" rx="2" ry="2"/>
                <path d="M3 7l9 6 9-6"/>
              </svg>
              <span>info@teliosis.org</span>
            </a>
            {/* <a href="tel:+2347010638658" className="link-inverse flex items-center gap-2">
              <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="7" y="2" width="10" height="20" rx="2"/>
                <circle cx="12" cy="18" r="1"/>
              </svg>
              <span>+234 701 063 8658</span>
            </a> */}
            <span className="hidden sm:inline-flex items-center gap-2 text-primary-foreground-80">
              <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 22s-7-5-7-12a7 7 0 1 1 14 0c0 7-7 12-7 12z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <span>Teliosis Campus Tudunwada, Sauka Road FHA Lugbe, Abuja</span>
            </span>
          </div>

          {/* Right: Social icons */}
          <div className="flex items-center gap-4">
            <a href="https://www.facebook.com/teliosisworldoutreach" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="link-inverse" title="Facebook">
              <span className="icon-circle">
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </span>
              <span className="sr-only">Facebook</span>
            </a>
            <a href="https://www.instagram.com/teliosisworldoutreach/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="link-inverse" title="Instagram">
              <span className="icon-circle">
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.5" y2="6.5"/>
                </svg>
              </span>
              <span className="sr-only">Instagram</span>
            </a>
            <a href="https://www.youtube.com/@teliosisworldoutreach" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="link-inverse" title="YouTube">
              <span className="icon-circle">
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="5" width="20" height="14" rx="4" ry="4"/>
                  <path d="M10 9l5 3-5 3V9z"/>
                </svg>
              </span>
              <span className="sr-only">YouTube</span>
            </a>
          </div>
        </div>
      </div>

  <div className="layout-container--wide grid grid-cols-3 items-center h-24">
        {/* Left: Brand */}
        <Link href="/" className="font-bold h2 text-color-primary">Teliosis</Link>

        {/* Center: Main nav */}
        <nav className="justify-self-center">
          <ul className="flex items-center gap-8 h5 font-bold">
            {nav.map(item => {
              const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    className={
                      active
                        ? 'text-color-primary  underline underline-offset-4'
                        : 'hover:text-color-primary transition'
                    }
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right: Donate CTA */}
        <div className="justify-self-end">
          <Link href="/give" className="btn-base btn-primary btn-lg">Give Now</Link>
        </div>
  </div>
    </header>
  );
}
