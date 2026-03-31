"use client";

import React, { useState } from "react";
import { Copy, CheckCircle2, Heart, Landmark } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner"; // 1. Import toast

export default function GiveSection() {
  const [isCopied, setIsCopied] = useState(false);

  const accountDetails = {
    bank: "UBA BANK",
    accountName: "TELIOSIS WORLD OUTREACH",
    accountNumber: "1022971000",
  };

  const handleCopy = () => {
    // 2. The actual copy logic
    navigator.clipboard.writeText(accountDetails.accountNumber);

    // 3. Trigger the Toast
    toast.success("Copied to clipboard", {
      description: `${accountDetails.accountNumber} is ready to paste.`,
      duration: 3000,
    });

    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <section className="relative z-20 -mt-20 px-6 pb-16">
      <div className="layout-container max-w-2xl">
        <div className="group hover:shadow-danger-500/10 relative overflow-hidden rounded-[2.5rem] border border-gray-100 bg-white p-8 shadow-2xl transition-all md:p-12">
          <Heart className="absolute -top-10 -right-10 h-64 w-64 text-gray-50 opacity-50 transition-transform group-hover:scale-110" />

          <div className="relative z-10">
            <div className="mb-8 flex items-center gap-5">
              <div className="bg-danger-50 text-danger-500 flex h-16 w-16 items-center justify-center rounded-2xl shadow-inner">
                <Landmark size={32} />
              </div>
              <div>
                <h3 className="text-3xl font-black tracking-tight text-zinc-900">Giving</h3>
                <p className="text-sm font-bold tracking-widest text-gray-400 uppercase">Tithes & Offerings</p>
              </div>
            </div>

            <div className="border-danger-500 mb-10 space-y-2 border-l-4 pl-6">
              <p className="text-danger-600 text-xl font-black tracking-tight">{accountDetails.bank}</p>
              <p className="text-lg leading-tight font-bold text-zinc-800">{accountDetails.accountName}</p>
            </div>

            {/* Interactive Copy Area */}
            <div
              onClick={handleCopy} // Makes the whole area clickable for ease of use
              className="hover:border-danger-200 relative flex cursor-pointer items-center justify-between rounded-3xl border-2 border-dashed border-gray-200 bg-gray-50/50 p-6 transition-colors"
            >
              <div className="flex flex-col">
                <span className="mb-1 text-[10px] font-black tracking-[0.2em] text-gray-400 uppercase">
                  Account Number (Tap to copy)
                </span>
                <span className="font-mono text-3xl font-black tracking-[0.15em] text-zinc-900 md:text-4xl">
                  {accountDetails.accountNumber}
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

            <p className="mt-6 text-center text-xs font-medium text-gray-400 italic">
              "Honour the LORD with thy substance, and with the firstfruits of all thine increase." — Proverbs 3:9
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
