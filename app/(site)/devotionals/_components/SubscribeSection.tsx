"use client";

import React, { useState } from "react";
import { Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SubscribeSection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setIsSubmitted(true);
  };

  return (
    <section className="bg-danger-500 relative overflow-hidden py-24 md:py-16">
      {/* Decorative Background Glows (Lightened for the red background) */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-white/10 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-white/5 blur-[100px]" />

      <div className="layout-container relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          {/* Icon Badge */}
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-[1.5rem] border border-white/20 bg-white/10 text-white shadow-sm backdrop-blur-sm">
            <Mail size={32} strokeWidth={1.5} />
          </div>

          {/* Typography */}
          <h2 className="mb-6 text-4xl font-black tracking-tight text-white md:text-5xl lg:text-6xl">
            Daily Bread, <span className="text-danger-100">Delivered.</span>
          </h2>

          <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed font-medium text-white/80">
            Join thousands of believers who start their morning with our spirit-filled devotionals. Delivered straight
            to your inbox every day at 5:00 AM.
          </p>

          {/* Interactive Form */}
          {!isSubmitted ? (
            <form
              onSubmit={handleSubmit}
              className="mx-auto flex w-full max-w-lg flex-col gap-4 sm:flex-row sm:items-center sm:rounded-full sm:border sm:border-white/20 sm:bg-white/10 sm:p-2 sm:backdrop-blur-md"
            >
              <Input
                type="email"
                placeholder="Enter your email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-14 w-full rounded-full border-white/20 bg-white/10 px-6 text-base text-white placeholder:text-white/60 sm:h-12 sm:border-none sm:bg-transparent sm:focus-visible:ring-0 sm:focus-visible:ring-offset-0"
              />
              <Button
                type="submit"
                size="xl"
                className="text-danger-500 h-14 w-full flex-shrink-0 rounded-full bg-white px-8 font-black transition-all hover:bg-gray-50 sm:h-12 sm:w-auto"
              >
                Subscribe
                <Send className="ml-2 size-4" />
              </Button>
            </form>
          ) : (
            /* Success State */
            <div className="animate-in fade-in zoom-in mx-auto max-w-md rounded-2xl border border-white/20 bg-white/10 p-6 text-white backdrop-blur-sm duration-300">
              <h3 className="mb-1 text-xl font-bold">You’re on the list!</h3>
              <p className="text-sm font-medium opacity-80">Check your inbox tomorrow morning.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SubscribeSection;
