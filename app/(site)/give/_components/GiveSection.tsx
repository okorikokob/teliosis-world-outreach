"use client";

import React, { useState } from "react";
import { Copy, CheckCircle2, Heart, Landmark, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// ─────────────────────────────────────────────
// Data
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
    accountName: "TELIOSIS ETERNAL LIFE GLOBAL ASSEMBLY CAMPUS 3",
    accountNumber: "1029794817",
  },
  // City Campus — uncomment and fill when ready
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
    <div className="group hover:shadow-danger-500/10 relative overflow-hidden rounded-[2.5rem] border border-gray-100 bg-white p-6 shadow-2xl transition-all sm:p-8 md:p-12">
      <Heart className="absolute -top-10 -right-10 h-64 w-64 text-gray-50 opacity-50 transition-transform group-hover:scale-110" />

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <div className="bg-danger-50 text-danger-500 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl shadow-inner sm:h-16 sm:w-16">
            <Landmark size={28} />
          </div>
          <div>
            <h3 className="text-2xl font-black tracking-tight text-zinc-900 sm:text-3xl">General Giving</h3>
            <p className="text-xs font-bold tracking-widest text-gray-400 uppercase sm:text-sm">Tithes & Offerings</p>
          </div>
        </div>

        {/* Bank & Account Name */}
        <div className="border-danger-500 mb-8 space-y-1 border-l-4 pl-5">
          <p className="text-danger-600 text-lg font-black tracking-tight sm:text-xl">{GENERAL_ACCOUNT.bank}</p>
          <p className="text-base leading-tight font-bold text-zinc-800 sm:text-lg">{GENERAL_ACCOUNT.accountName}</p>
        </div>

        {/* Copy Area — stacks on mobile, side by side on sm+ */}
        <div
          onClick={() => handleCopy(GENERAL_ACCOUNT.accountNumber)}
          className="hover:border-danger-200 flex cursor-pointer flex-col gap-4 rounded-3xl border-2 border-dashed border-gray-200 bg-gray-50/50 p-5 transition-colors sm:flex-row sm:items-center sm:justify-between sm:p-6"
        >
          {/* Account number */}
          <div className="flex flex-col">
            <span className="mb-1 text-[10px] font-black tracking-[0.2em] text-gray-400 uppercase">
              Account Number — Tap to copy
            </span>
            <span className="font-mono text-2xl font-black tracking-[0.12em] text-zinc-900 sm:text-3xl md:text-4xl">
              {GENERAL_ACCOUNT.accountNumber}
            </span>
          </div>

          {/* Copy button — full width on mobile, fixed size on sm+ */}
          <div
            className={cn(
              "flex h-14 w-full items-center justify-center gap-2 rounded-2xl shadow-lg transition-all duration-300 sm:h-16 sm:w-16 sm:shrink-0",
              isCopied
                ? "scale-105 bg-green-500 text-white shadow-green-500/30"
                : "bg-danger-500 shadow-danger-500/30 text-white"
            )}
          >
            {isCopied ? (
              <>
                <CheckCircle2 size={24} />
                <span className="text-sm font-bold sm:hidden">Copied!</span>
              </>
            ) : (
              <>
                <Copy size={24} />
                <span className="text-sm font-bold sm:hidden">Tap to Copy</span>
              </>
            )}
          </div>
        </div>
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
        <div className="bg-danger-50 text-danger-500 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl">
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

      {/* Copy area — stacked on mobile */}
      <div
        onClick={() => handleCopy(campus.accountNumber)}
        className="hover:border-danger-200 flex cursor-pointer flex-col gap-3 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/50 p-4 transition-colors sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex flex-col">
          <span className="mb-0.5 text-[9px] font-black tracking-[0.2em] text-gray-400 uppercase">Tap to copy</span>
          <span className="font-mono text-lg font-black tracking-widest text-zinc-900 sm:text-xl">
            {campus.accountNumber}
          </span>
        </div>

        <div
          className={cn(
            "flex h-12 w-full items-center justify-center gap-2 rounded-xl shadow-md transition-all duration-300 sm:h-11 sm:w-11 sm:shrink-0",
            isCopied
              ? "scale-105 bg-green-500 text-white shadow-green-500/30"
              : "bg-danger-500 shadow-danger-500/30 text-white"
          )}
        >
          {isCopied ? (
            <>
              <CheckCircle2 size={18} />
              <span className="text-xs font-bold sm:hidden">Copied!</span>
            </>
          ) : (
            <>
              <Copy size={18} />
              <span className="text-xs font-bold sm:hidden">Tap to Copy</span>
            </>
          )}
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
      {/* ── General Giving ── */}
      <section className="px-6 py-16 md:py-20">
        <div className="layout-container">
          <div className="mx-auto max-w-2xl">
            <GeneralGivingCard />
          </div>
        </div>
      </section>

      {/* ── Campus Giving ── */}
      <section className="border-t border-gray-100 pb-16 md:pb-20">
        <div className="layout-container">
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

          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CAMPUS_ACCOUNTS.map((campus) => (
              <CampusCard key={campus.id} campus={campus} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
