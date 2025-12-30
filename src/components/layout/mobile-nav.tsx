"use client";
import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/src/lib/utils';

interface MobileNavProps {
  items: { href: string; label: string }[];
}

export function MobileNav({ items }: MobileNavProps) {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="btn-base btn-ghost h-9 px-3"
      >
        {open ? '✕' : '☰'}
      </button>
      {open && (
        <div
          id="mobile-menu"
          className="absolute left-0 right-0 top-16 z-40 border-b border-[--color-border] bg-[--color-background] shadow-md"
        >
          <nav className="px-4 py-4">
            <ul className="flex flex-col gap-2">
              {items.map(item => {
                const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        'block rounded-md px-3 py-2 text-sm font-medium transition',
                        active ? 'bg-[--color-bg-muted] text-[--color-primary]' : 'hover:bg-[--color-bg-muted]'
                      )}
                      aria-current={active ? 'page' : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}
