"use client";

import { useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { Popover } from "radix-ui";
import { Share2, Facebook, Link as LinkIcon, Check } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

function WhatsAppIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 1.67c2.24 0 4.35.87 5.93 2.46a8.23 8.23 0 0 1 2.42 5.85c0 4.56-3.71 8.27-8.28 8.27a8.3 8.3 0 0 1-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.32a8.18 8.18 0 0 1-1.26-4.38c0-4.57 3.71-8.33 8.28-8.33Zm-4.15 4.7c-.15 0-.4.06-.61.29-.21.24-.8.78-.8 1.9s.82 2.2.93 2.36c.12.15 1.6 2.5 3.93 3.5.55.24 1 .38 1.34.49.56.18 1.07.15 1.47.09.45-.07 1.38-.57 1.58-1.11.2-.55.2-1.02.14-1.12-.06-.1-.21-.16-.44-.28-.23-.12-1.38-.68-1.6-.76-.21-.08-.37-.12-.53.12-.15.24-.61.76-.75.92-.14.15-.28.17-.51.06-.24-.12-1-.37-1.9-1.18-.7-.62-1.18-1.39-1.31-1.63-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.43.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.43-.06-.12-.53-1.32-.74-1.8-.19-.46-.39-.4-.53-.4Z" />
    </svg>
  );
}

function TelegramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M21.94 3.44a1.4 1.4 0 0 0-1.46-.2L2.9 10.36a1.34 1.34 0 0 0 .1 2.51l4.62 1.48 1.78 5.6c.16.5.6.83 1.12.83.34 0 .65-.14.87-.4l2.5-2.87 4.6 3.42c.24.18.53.27.82.27.2 0 .4-.04.58-.14.42-.21.71-.6.79-1.06l3.28-15.5c.1-.5-.08-1.02-.45-1.36ZM9.3 14.02l-.02 3.2-1.16-3.66 9.53-6.3-8.35 6.76Z" />
    </svg>
  );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function GmailIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.909v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h.328L12 10.184l10.036-6.363h.328c.904 0 1.636.732 1.636 1.636z" />
    </svg>
  );
}

// window.location.origin never changes during a page's lifetime, so there's
// nothing to subscribe to — this just lets useSyncExternalStore read a
// browser-only global safely, returning "" for the server snapshot instead
// of throwing during SSR.
function subscribeNoop() {
  return () => {};
}
function getOriginSnapshot() {
  return window.location.origin;
}
function getServerOriginSnapshot() {
  return "";
}

interface ShareMenuProps {
  title: string;
  /** Path to share, e.g. "/devotionals/my-slug" — the origin is resolved on the client. */
  path: string;
  /** Cover image shown as a preview card in the popover, mirroring the link's OG image. */
  image?: string;
  /** Short excerpt shown under the title in the preview card. */
  description?: string;
  className?: string;
  buttonClassName?: string;
  label?: string;
}

const ShareMenu = ({ title, path, image, description, className, buttonClassName, label }: ShareMenuProps) => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const origin = useSyncExternalStore(subscribeNoop, getOriginSnapshot, getServerOriginSnapshot);

  const url = `${origin}${path}`;

  const targets = [
    {
      name: "WhatsApp",
      href: `https://wa.me/?text=${encodeURIComponent(`${title} — ${url}`)}`,
      Icon: WhatsAppIcon,
      iconClass: "text-[#25D366]",
    },
    {
      name: "X",
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      Icon: XIcon,
      iconClass: "text-black",
    },
    {
      name: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      Icon: Facebook,
      iconClass: "text-[#1877F2]",
    },
    {
      name: "Telegram",
      href: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      Icon: TelegramIcon,
      iconClass: "text-[#26A5E4]",
    },
    {
      name: "Gmail",
      // Gmail's own compose screen in the browser — a plain mailto: link
      // depends on a desktop mail client being registered, which most
      // Chrome installs don't have, so it just opens a blank tab.
      href: `https://mail.google.com/mail/?view=cm&fs=1&su=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`,
      Icon: GmailIcon,
      iconClass: "text-[#EA4335]",
    },
  ];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Couldn't copy the link. Please copy it manually.");
    }
  };

  const handleTriggerClick = async (event: React.MouseEvent) => {
    // Radix's Popover.Trigger toggles the popover itself right after this
    // handler runs, unless we call preventDefault() — so without this,
    // the native share sheet below and our custom card would both open.
    event.preventDefault();

    // On devices with native share support (mostly mobile), skip our
    // custom menu and hand off straight to the OS share sheet — it can
    // reach every installed app and contact, not just the handful we list below.
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        // user cancelled the share sheet — no error needed
      }
      return;
    }
    setOpen((prev) => !prev);
  };

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button type="button" aria-label="Share devotional" onClick={handleTriggerClick} className={buttonClassName}>
          <Share2 size={18} />
          {label}
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          sideOffset={12}
          align="end"
          className={cn(
            "z-50 w-[320px] rounded-3xl border border-gray-100 bg-white p-5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25)]",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-top-1",
            className
          )}
        >
          {image ? (
            <div className="mb-4 flex items-center gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-2.5">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl">
                <Image src={image} alt="" fill sizes="56px" className="object-cover" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-gray-900">{title}</p>
                {description && <p className="line-clamp-2 text-xs leading-snug text-gray-500">{description}</p>}
              </div>
            </div>
          ) : (
            <div className="mb-4">
              <p className="text-sm font-bold text-gray-900">Share this devotional</p>
              <p className="mt-0.5 truncate text-xs font-medium text-gray-400">{title}</p>
            </div>
          )}

          <div className="grid grid-cols-5 gap-1.5">
            {targets.map(({ name, href, Icon, iconClass }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="group flex flex-col items-center gap-1.5"
                title={name}
              >
                <span
                  className={cn(
                    "flex h-11 w-11 items-center justify-center rounded-full bg-gray-50 transition-all duration-150",
                    "group-hover:scale-105 group-hover:shadow-md",
                    iconClass
                  )}
                >
                  <Icon size={19} />
                </span>
                <span className={cn("text-[10.5px] font-bold tracking-tight", iconClass)}>{name}</span>
              </a>
            ))}
          </div>

          <div className="my-4 h-px bg-gray-100" />

          <button
            type="button"
            onClick={handleCopy}
            className="group flex w-full items-center justify-between gap-3 rounded-xl border border-gray-200 bg-gray-50 py-2 pr-1.5 pl-3 text-left transition-colors hover:border-gray-300"
          >
            <span className="truncate text-xs font-medium text-gray-500">{url || "Copy link"}</span>
            <span
              className={cn(
                "flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-colors",
                copied ? "bg-green-50 text-green-600" : "bg-gray-900 text-white group-hover:bg-gray-800"
              )}
            >
              {copied ? <Check size={13} /> : <LinkIcon size={13} />}
              {copied ? "Copied" : "Copy"}
            </span>
          </button>

          <Popover.Arrow className="fill-white" width={16} height={8} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default ShareMenu;
