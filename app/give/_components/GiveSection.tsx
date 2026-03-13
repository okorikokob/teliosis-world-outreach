"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Heart, Copy, CheckCircle2, Landmark, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

const givingAccounts = [
  {
    id: "tithes",
    title: "Tithes",
    icon: Landmark,
    bank: "UBA BANK",
    accountName: "TELIOSIS WORLD OUTREACH - TITHES",
    accountNumber: "0000000000",
  },
  {
    id: "offerings",
    title: "General Offerings",
    icon: Wallet,
    bank: "UBA BANK",
    accountName: "TELIOSIS WORLD OUTREACH - OFFERINGS",
    accountNumber: "0000000000",
  },
];

export default function GiveSection() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, accountNumber: string) => {
    navigator.clipboard.writeText(accountNumber);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section className="relative z-20 -mt-16 px-6 pb-16">
      <div className="layout-container max-w-4xl">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {givingAccounts.map((acc) => {
            const Icon = acc.icon;
            const isCopied = copiedId === acc.id;

            return (
              <div
                key={acc.id}
                className="group hover:border-danger-200 relative flex flex-col justify-between rounded-3xl border border-gray-100 bg-white p-8 shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl"
              >
                <div>
                  <div className="mb-6 flex items-center gap-4">
                    <div className="bg-danger-50 text-danger-500 flex h-12 w-12 items-center justify-center rounded-2xl transition-transform group-hover:scale-110">
                      <Icon size={24} />
                    </div>
                    <h3 className="text-2xl font-black text-zinc-900">{acc.title}</h3>
                  </div>

                  <div className="mb-8 space-y-1">
                    <p className="text-danger-500 text-sm font-bold tracking-widest uppercase">{acc.bank}</p>
                    <p className="text-sm leading-relaxed font-medium text-gray-500">{acc.accountName}</p>
                  </div>
                </div>

                {/* Account Number & Interactive Copy Button */}
                <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-gray-50 p-4">
                  <span className="font-mono text-2xl font-black tracking-widest text-zinc-800">
                    {acc.accountNumber}
                  </span>
                  <button
                    onClick={() => handleCopy(acc.id, acc.accountNumber)}
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300",
                      isCopied
                        ? "bg-green-500 text-white shadow-md shadow-green-500/20"
                        : "hover:bg-danger-500 hover:shadow-danger-500/20 bg-white text-gray-400 shadow-sm hover:text-white hover:shadow-md"
                    )}
                    title="Copy Account Number"
                  >
                    {isCopied ? <CheckCircle2 size={20} /> : <Copy size={20} />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
