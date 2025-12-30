import * as React from 'react';
import { Header } from './header';
import { Footer } from './footer';

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-[--color-background] text-[--color-foreground]">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 z-50 bg-[--color-primary] text-[--color-primary-foreground] px-3 py-2 rounded-md">Skip to content</a>
      <Header />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
