import * as React from 'react';


export function Footer() {
  return (
    <footer className="mt-12 border-t border-[--color-border] py-10 text-sm text-[--color-foreground] bg-[--color-background]">
      <div className=" layout-container flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="opacity-75">© {new Date().getFullYear()} Teliosis World Outreach. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-primary">Privacy</a>
          <a href="#" className="hover:text-[--color-primary]">Contact</a>
        </div>
      </div>
    </footer>
  );
}
