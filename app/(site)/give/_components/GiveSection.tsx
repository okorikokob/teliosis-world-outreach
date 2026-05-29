"use client";

import React, { useState } from "react";
import { Copy, CheckCircle2, Heart, Landmark, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// ─────────────────────────────────────────────
// Data — defined outside component
// ─────────────────────────────────────────────
const GENERAL_ACCOUNT = {
  bank: "UBA BANK",
  accountName: "TELIOSIS WORLD OUTREACH",
  accountNumber: "1022971000",
};

const CAMPUS_ACCOUNTS = [
  {
    id: "tudunwada",
    campus: "Tudunwada Campus",
    bank: "UBA BANK",
    accountName: "TELIOSIS ETERNAL LIFE GLOBAL ASSEMBLY",
    accountNumber: "1029796000",
  },
  {
    id: "zhidu",
    campus: "Zhidu Campus",
    bank: "UBA BANK",
    accountName: "TELIOSIS ETERNAL LIFE GLOBAL ASSEMBLY",
    accountNumber: "10297960001",
  },
  // City Campus — add account details here when ready
  // {
  //   id: "city",
  //   campus: "City Campus",
  //   bank: "UBA BANK",
  //   accountName: "...",
  //   accountNumber: "...",
  // },
];

// ─────────────────────────────────────────────
// Reusable copy logic
// ─────────────────────────────────────────────
const fallbackCopy = (text: string) => {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.opacity = "0";
  document.body.appendChild(textArea);
  textArea.select();
  const successful = document.execCommand("copy");
  document.body.removeChild(textArea);
  if (!successful) throw new Error("Fallback copy failed");
};

const useCopy = () => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) {
      toast.error("Account number is empty and cannot be copied.");
      return;
    }

    try {
      if (navigator.clipboard?.writeText) {
        try {
          await navigator.clipboard.writeText(trimmed);
        } catch {
          fallbackCopy(trimmed);
        }
      } else {
        fallbackCopy(trimmed);
      }

      toast.success("Copied to clipboard", {
        description: `${trimmed} is ready to paste.`,
        duration: 3000,
      });
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error("Copy failed", error);
      toast.error("Failed to copy. Please copy manually.");
      setIsCopied(false);
    }
  };

  return { isCopied, handleCopy };
};

// ─────────────────────────────────────────────
// General Giving Card
// ─────────────────────────────────────────────
const GeneralGivingCard = () => {
  const { isCopied, handleCopy } = useCopy();

  return (
    <div className="group hover:shadow-danger-500/10 relative overflow-hidden rounded-[2.5rem] border border-gray-100 bg-white p-8 shadow-2xl transition-all md:p-12">
      <Heart className="absolute -top-10 -right-10 h-64 w-64 text-gray-50 opacity-50 transition-transform group-hover:scale-110" />

      <div className="relative z-10">
        <div className="mb-8 flex items-center gap-5">
          <div className="bg-danger-50 text-danger-500 flex h-16 w-16 items-center justify-center rounded-2xl shadow-inner">
            <Landmark size={32} />
          </div>
          <div>
            <h3 className="text-3xl font-black tracking-tight text-zinc-900"> General Giving</h3>
            <p className="text-sm font-bold tracking-widest text-gray-400 uppercase">Tithes & Offerings</p>
          </div>
        </div>

        <div className="border-danger-500 mb-10 space-y-2 border-l-4 pl-6">
          <p className="text-danger-600 text-xl font-black tracking-tight">{GENERAL_ACCOUNT.bank}</p>
          <p className="text-lg leading-tight font-bold text-zinc-800">{GENERAL_ACCOUNT.accountName}</p>
        </div>

        <div
          onClick={() => handleCopy(GENERAL_ACCOUNT.accountNumber)}
          className="hover:border-danger-200 relative flex cursor-pointer items-center justify-between rounded-3xl border-2 border-dashed border-gray-200 bg-gray-50/50 p-6 transition-colors"
        >
          <div className="flex flex-col">
            <span className="mb-1 text-[10px] font-black tracking-[0.2em] text-gray-400 uppercase">
              Account Number (Tap to copy)
            </span>
            <span className="font-mono text-3xl font-black tracking-[0.15em] text-zinc-900 md:text-4xl">
              {GENERAL_ACCOUNT.accountNumber}
            </span>
          </div>

          <div
            className={cn(
              "flex h-16 w-16 items-center justify-center rounded-2xl shadow-lg transition-all duration-300",
              isCopied
                ? "scale-110 bg-green-500 text-white shadow-green-500/30"
                : "bg-danger-500 shadow-danger-500/30 text-white"
            )}
          >
            {isCopied ? <CheckCircle2 size={28} /> : <Copy size={28} />}
          </div>
        </div>

        {/* <p className="mt-6 text-center text-xs font-medium text-gray-400 italic">
          &ldquo;Honour the LORD with thy substance, and with the firstfruits of all thine increase.&rdquo; — Proverbs
          3:9
        </p> */}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// Campus Account Card
// ─────────────────────────────────────────────
const CampusCard = ({ campus }: { campus: (typeof CAMPUS_ACCOUNTS)[0] }) => {
  const { isCopied, handleCopy } = useCopy();

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Campus label */}
      <div className="mb-5 flex items-center gap-2">
        <div className="bg-danger-50 text-danger-500 flex h-9 w-9 items-center justify-center rounded-xl">
          <MapPin size={18} />
        </div>
        <div>
          <p className="text-xs font-bold tracking-widest text-gray-400 uppercase">Campus Giving</p>
          <h4 className="text-base font-black text-zinc-900">{campus.campus}</h4>
        </div>
      </div>

      {/* Account details */}
      <div className="border-danger-500/40 mb-5 space-y-1 border-l-4 pl-4">
        <p className="text-danger-600 text-sm font-black tracking-tight">{campus.bank}</p>
        <p className="text-sm leading-tight font-bold text-zinc-700">{campus.accountName}</p>
      </div>

      {/* Copy area */}
      <div
        onClick={() => handleCopy(campus.accountNumber)}
        className="hover:border-danger-200 flex cursor-pointer items-center justify-between rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/50 px-5 py-4 transition-colors"
      >
        <div className="flex flex-col">
          <span className="mb-0.5 text-[9px] font-black tracking-[0.2em] text-gray-400 uppercase">Tap to copy</span>
          <span className="font-mono text-xl font-black tracking-widest text-zinc-900">{campus.accountNumber}</span>
        </div>

        <div
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-xl shadow-md transition-all duration-300",
            isCopied
              ? "scale-110 bg-green-500 text-white shadow-green-500/30"
              : "bg-danger-500 shadow-danger-500/30 text-white"
          )}
        >
          {isCopied ? <CheckCircle2 size={20} /> : <Copy size={20} />}
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// Main Section
// ─────────────────────────────────────────────
export default function GiveSection() {
  return (
    <div className="bg-gray-50">
      {/* ── General Giving — centered, full width max-w-2xl ── */}
      {/* FIX: Removed -mt-20 overlap — card now sits cleanly below the hero */}
      <section className="px-6 py-16 md:py-20">
        <div className="layout-container">
          <div className="mx-auto max-w-2xl">
            <GeneralGivingCard />
          </div>
        </div>
      </section>

      {/* ── Campus Giving — 3-col row ── */}
      <section className="border-t border-gray-100 pb-16 md:pb-20">
        <div className="layout-container">
          {/* Header */}
          <div className="mb-10 text-center">
            <div className="border-danger-500/20 bg-danger-500/10 text-danger-500 mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium">
              <MapPin className="h-4 w-4" />
              Give to a Campus
            </div>
            <h2 className="text-2xl font-black tracking-tight text-zinc-900 md:text-3xl">Support a Specific Campus</h2>
            <p className="text-muted mx-auto mt-3 max-w-xl text-sm leading-relaxed md:text-base">
              You can give directly to a campus near you. Every gift sows into the work of God in that community.
            </p>
          </div>

          {/* Campus Cards — 3-col ready, currently 2 cards */}
          <div className="lg:grid-cols- mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">
            {CAMPUS_ACCOUNTS.map((campus) => (
              <CampusCard key={campus.id} campus={campus} />
            ))}
          </div>

          {/* <p className="mt-10 text-center text-xs font-medium text-gray-400 italic">
            &ldquo;Give, and it shall be given unto you; good measure, pressed down, and shaken together, and running
            over.&rdquo; — Luke 6:38
          </p> */}
        </div>
      </section>
    </div>
  );
}
