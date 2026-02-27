"use client";

import { useState } from "react";
import { HeartHandshake, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PartnerModalProps {
  children: React.ReactNode;
  defaultInterest?: string;
}

export default function PartnerModal({ children, defaultInterest = "general" }: PartnerModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFinancialSponsor, setIsFinancialSponsor] = useState(false);
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [tierError, setTierError] = useState(false);

  const givingTiers = ["₦500 - ₦5,000", "₦5,000 - ₦10,000", "₦10,000 - ₦50,000", "₦50,000+"];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      {/* THE FIX: Added sm:max-w-2xl and md:max-w-3xl to strictly override Shadcn's defaults */}
      <DialogContent className="w-[95vw] overflow-hidden rounded-[2rem] bg-white p-0 outline-none sm:max-w-2xl md:max-w-3xl">
        <div className="max-h-[90vh] overflow-y-auto p-6 md:p-10">
          <DialogHeader className="mb-8 text-left">
            <div className="bg-danger-100 text-danger-500 mb-4 flex h-14 w-14 items-center justify-center rounded-full">
              <HeartHandshake size={28} />
            </div>
            <DialogTitle className="text-dark text-3xl font-bold">Join the Movement</DialogTitle>
            <DialogDescription className="text-body-md text-muted">
              Tell us how you'd like to partner. Our team will connect with you shortly!
            </DialogDescription>
          </DialogHeader>

          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              // Validate: if financial sponsor, require a tier
              if (isFinancialSponsor && !selectedTier) {
                setTierError(true);
                return;
              }
              setTierError(false);
              setIsOpen(false);
            }}
          >
            {/* ROW 1: Name */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="firstName" className="text-dark text-xs font-bold">
                  First Name
                </label>
                <Input
                  id="firstName"
                  name="firstName"
                  required
                  placeholder="John"
                  className="focus-visible:ring-danger-500 rounded-xl border-gray-200 bg-gray-50 px-4 py-6"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="lastName" className="text-dark text-xs font-bold">
                  Last Name
                </label>
                <Input
                  id="lastName"
                  name="lastName"
                  required
                  placeholder="Doe"
                  className="focus-visible:ring-danger-500 rounded-xl border-gray-200 bg-gray-50 px-4 py-6"
                />
              </div>
            </div>

            {/* ROW 2: Contact Info (Email & Phone side-by-side) */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-dark text-xs font-bold">Email Address</label>
                <Input
                  type="email"
                  placeholder="john@example.com"
                  className="focus-visible:ring-danger-500 rounded-xl border-gray-200 bg-gray-50 px-4 py-6"
                />
              </div>
              <div className="space-y-2">
                <label className="text-dark text-xs font-bold">Phone Number</label>
                <Input
                  type="tel"
                  placeholder="+234 800 000 0000"
                  className="focus-visible:ring-danger-500 rounded-xl border-gray-200 bg-gray-50 px-4 py-6"
                />
              </div>
            </div>

            {/* ROW 3: Ministry Interest */}
            <div className="space-y-2">
              <label className="text-dark text-xs font-bold">Area of Interest</label>
              <Select defaultValue={defaultInterest}>
                <SelectTrigger className="focus-visible:ring-danger-500 w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-6">
                  <SelectValue placeholder="Select a ministry arm" />
                </SelectTrigger>
                <SelectContent className="rounded-xl bg-white">
                  <SelectItem value="general">General Ministry Support</SelectItem>
                  <SelectItem value="mission">Mission (Global Outreach)</SelectItem>
                  <SelectItem value="radio">Radio Broadcast</SelectItem>
                  <SelectItem value="storehouse">Storehouse (Community Provision)</SelectItem>
                  <SelectItem value="devotional">Daily Devotional</SelectItem>
                  <SelectItem value="children">Children's Ministry</SelectItem>
                  <SelectItem value="nachadava">Nachadava (Youth Empowerment)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* ROW 4: Partnership Type */}
            <div className="space-y-4 border-t border-gray-100 pt-6">
              <label className="text-dark text-sm font-bold">How would you like to partner?</label>

              <div className="flex flex-col gap-4">
                {/* Financial Sponsor Checkbox & Tiers */}
                <div className="rounded-2xl border border-gray-100 bg-gray-50/50 p-4 transition-colors hover:bg-gray-50">
                  <label className="flex cursor-pointer items-center gap-3">
                    <input
                      type="checkbox"
                      checked={isFinancialSponsor}
                      onChange={(e) => {
                        setIsFinancialSponsor(e.target.checked);
                        if (!e.target.checked) setSelectedTier(null);
                      }}
                      className="accent-danger-500 h-5 w-5 rounded border-gray-300"
                    />
                    <span className="text-dark font-bold">Financial Sponsor</span>
                  </label>

                  {isFinancialSponsor && (
                    <div className="animate-in slide-in-from-top-2 fade-in mt-4 ml-8">
                      <p className="text-muted mb-3 text-[10px] font-bold tracking-wider uppercase">
                        Select Monthly Commitment Range
                      </p>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {givingTiers.map((tier) => {
                          const isSelected = selectedTier === tier;
                          return (
                            <button
                              key={tier}
                              type="button"
                              onClick={() => {
                                setSelectedTier(tier);
                                setTierError(false);
                              }}
                              className={`flex items-center justify-between rounded-xl border p-4 text-sm font-bold transition-all ${
                                isSelected
                                  ? "border-danger-500 bg-danger-50 text-danger-500 shadow-sm"
                                  : "text-dark border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                              }`}
                            >
                              {tier}
                              {isSelected && <CheckCircle2 size={18} className="text-danger-500" />}
                            </button>
                          );
                        })}
                      </div>
                      {tierError && (
                        <p className="text-danger-500 mt-2 text-xs font-bold">Please select a tier to continue</p>
                      )}
                    </div>
                  )}
                </div>

                {/* Prayer Partner */}
                <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 transition-colors hover:bg-gray-50">
                  <input type="checkbox" className="accent-danger-500 h-5 w-5 rounded border-gray-300" />
                  <span className="text-dark font-bold">Prayer Partner</span>
                </label>

                {/* Active Volunteer */}
                <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 transition-colors hover:bg-gray-50">
                  <input type="checkbox" className="accent-danger-500 h-5 w-5 rounded border-gray-300" />
                  <span className="text-dark font-bold">Active Volunteer</span>
                </label>
              </div>
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                size="xl"
                className="bg-danger-500 shadow-danger-500/20 hover:bg-danger-600 w-full rounded-full py-6 text-lg font-bold text-white shadow-lg active:scale-95"
              >
                Submit Commitment
              </Button>
              <p className="text-muted mt-3 text-center text-[11px]">
                Your information is secure. Financial partners will be redirected to our giving portal.
              </p>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
