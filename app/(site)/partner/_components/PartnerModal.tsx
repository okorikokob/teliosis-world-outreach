"use client";

import { useMemo, useState } from "react";
import { HeartHandshake, CheckCircle2, Copy, Check, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { MessageCircle } from "lucide-react";

interface PartnerModalProps {
  children: React.ReactNode;
  defaultInterest?: string;
}

type GivingType = "recurring" | "one-time" | null;

const accountDetails: Record<string, { bank: string; accountNumber: string; accountName: string; label: string }> = {
  children: {
    bank: "UBA Bank",
    accountNumber: "1029794288",
    accountName: "TELIOSIS ETERNAL LIFE GLO ASS CHILDREN BIBLE CLUB",
    label: "Children's Ministry",
  },
  devotional: {
    bank: "UBA Bank",
    accountNumber: "1029794381",
    accountName: "TELIOSIS ETERNAL LIFE GLOBAL ASS MOG DEVOTIONAL",
    label: "Daily Devotional",
  },
  radio: {
    bank: "UBA Bank",
    accountNumber: "1029794635",
    accountName: "TELIOSIS ETERNAL LIFE GLOBAL ASSEMBLIES RADIO",
    label: "Radio Broadcast",
  },
  storehouse: {
    bank: "UBA Bank",
    accountNumber: "1029794745",
    accountName: "TELIOSIS ETERNAL LIFE GLOBAL ASSEMBLIES STOREHOUSE",
    label: "Storehouse",
  },
  mission: {
    bank: "UBA Bank",
    accountNumber: "1029795254",
    accountName: "TELIOSIS ETERNAL LIFE GLOBAL ASSEMBLIES MISSIONS",
    label: "Mission",
  },
  nachadava: {
    bank: "UBA Bank",
    accountNumber: "1029795546",
    accountName: "TELIOSIS ETERNAL LIFE GLOBAL ASSEMBLIES TSTM",
    label: "Nachadava",
  },
  general: {
    bank: "UBA Bank",
    accountNumber: "1029795254",
    accountName: "TELIOSIS ETERNAL LIFE GLOBAL ASSEMBLIES MISSIONS",
    label: "General Ministry Support",
  },
};

export default function PartnerModal({ children, defaultInterest = "general" }: PartnerModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [interest, setInterest] = useState(defaultInterest);
  const [givingType, setGivingType] = useState<GivingType>(null);
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [tierError, setTierError] = useState(false);
  const [step, setStep] = useState<"form" | "details">("form");
  const [copied, setCopied] = useState(false);

  const givingTiers = ["₦500 - ₦5,000", "₦5,000 - ₦10,000", "₦10,000 - ₦50,000", "₦50,000+"];

  const account = useMemo(() => {
    return accountDetails[interest] || accountDetails.general;
  }, [interest]);

  const resetModalState = (open: boolean) => {
    setIsOpen(open);

    if (!open) {
      setInterest(defaultInterest);
      setGivingType(null);
      setSelectedTier(null);
      setTierError(false);
      setStep("form");
      setCopied(false);
    }
  };

  const handleContinue = () => {
    if (!givingType || !selectedTier) {
      setTierError(true);
      return;
    }

    setTierError(false);
    setStep("details");
  };

  const handleCopy = async () => {
    const textToCopy = account.accountNumber.trim();

    if (!textToCopy) {
      toast.error("Account number is empty and cannot be copied.");
      return;
    }

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.select();
        const successful = document.execCommand("copy");
        document.body.removeChild(textArea);

        if (!successful) {
          throw new Error("Document copy command failed");
        }
      }

      toast.success("Copied to clipboard", {
        // description: `${textToCopy} is ready to paste.`,
        duration: 3000,
      });

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Copy failed", error);
      toast.error("Failed to copy account number. Please copy it manually.");
      setCopied(false);
    }
  };

  const message = `Hello, I just made a ${
    givingType === "recurring" ? "recurring" : "one-time"
  } payment to ${account.label}.`;

  const whatsappLink = `https://wa.me/2347010848004?text=${encodeURIComponent(message)}`;
  return (
    <Dialog open={isOpen} onOpenChange={resetModalState}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="w-[95vw] overflow-hidden rounded-[2rem] bg-white p-0 outline-none sm:max-w-2xl [&>button]:top-4 [&>button]:right-4 [&>button]:h-10 [&>button]:w-10 [&>button]:cursor-pointer [&>button]:rounded-full [&>button]:border [&>button]:border-gray-200 [&>button]:bg-white [&>button]:p-2 [&>button]:shadow-sm [&>button:hover]:bg-gray-50">
        <div className="max-h-[90vh] overflow-y-auto p-6 md:p-8">
          {step === "form" ? (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <DialogHeader className="mb-8 text-left">
                <div className="bg-danger-100 text-danger-500 mb-4 flex h-14 w-14 items-center justify-center rounded-full">
                  <HeartHandshake size={28} />
                </div>

                <DialogTitle className="text-dark text-3xl font-bold">Partner with Us</DialogTitle>

                <DialogDescription className="text-body-md text-muted">
                  Select the ministry arm you want to support and we’ll show you the correct bank details.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-dark mb-2 block text-xs font-bold">Area of Interest</label>
                  <Select value={interest} onValueChange={setInterest}>
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

                <div className="space-y-4 border-t border-gray-100 pt-6">
                  <label className="text-dark mb-2 block text-sm font-bold">Choose one giving option</label>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => {
                        setGivingType("recurring");
                        setSelectedTier(null);
                        setTierError(false);
                      }}
                      className={`cursor-pointer rounded-2xl border p-4 text-left transition-all duration-200 ${
                        givingType === "recurring"
                          ? "border-danger-500 bg-danger-50 ring-danger-200 shadow-sm ring-1"
                          : "hover:border-danger-300 border-gray-200 bg-white hover:bg-gray-50 hover:shadow-sm"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-dark font-bold">Recurring Partner</p>
                          <p className="text-muted mt-1 text-sm leading-6">
                            Support the ministry consistently on a monthly basis.
                          </p>
                        </div>
                        {givingType === "recurring" && (
                          <CheckCircle2 className="text-danger-500 mt-1 shrink-0" size={18} />
                        )}
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setGivingType("one-time");
                        setSelectedTier(null);
                        setTierError(false);
                      }}
                      className={`cursor-pointer rounded-2xl border p-4 text-left transition-all duration-200 ${
                        givingType === "one-time"
                          ? "border-danger-500 bg-danger-50 ring-danger-200 shadow-sm ring-1"
                          : "hover:border-danger-300 border-gray-200 bg-white hover:bg-gray-50 hover:shadow-sm"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-dark font-bold">One-Time Payment</p>
                          <p className="text-muted mt-1 text-sm leading-6">Make a single financial contribution.</p>
                        </div>
                        {givingType === "one-time" && (
                          <CheckCircle2 className="text-danger-500 mt-1 shrink-0" size={18} />
                        )}
                      </div>
                    </button>
                  </div>

                  {givingType && (
                    <div className="animate-in slide-in-from-top-2 fade-in mt-4 duration-300">
                      <p className="text-muted mb-3 text-[10px] font-bold tracking-wider uppercase">
                        {givingType === "recurring" ? "Select Monthly Commitment Range" : "Select One-Time Gift Range"}
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
                              className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 text-sm font-bold transition-all ${
                                isSelected
                                  ? "border-danger-500 bg-danger-50 text-danger-500 ring-danger-200 shadow-sm ring-1"
                                  : "text-dark border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                              }`}
                            >
                              {tier}
                              {isSelected && <CheckCircle2 size={18} className="text-danger-500" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {tierError && (
                    <p className="text-danger-500 text-xs font-bold">
                      Please choose a giving option and amount range to continue.
                    </p>
                  )}
                </div>

                <div className="pt-2">
                  <Button
                    type="button"
                    size="xl"
                    onClick={handleContinue}
                    className="bg-danger-500 shadow-danger-500/20 hover:bg-danger-600 w-full cursor-pointer rounded-full py-6 text-lg font-bold text-white shadow-lg active:scale-95"
                  >
                    Continue to Bank Details
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="animate-in fade-in zoom-in-95 duration-300">
              <div className="mb-6">
                <button
                  type="button"
                  onClick={() => setStep("form")}
                  className="text-muted hover:text-dark inline-flex cursor-pointer items-center gap-2 text-sm font-medium transition-colors"
                >
                  <ArrowLeft size={16} />
                  Back
                </button>
              </div>

              <div className="rounded-[1.5rem] border border-gray-200 bg-gray-50 p-6">
                <h3 className="text-dark mb-4 text-2xl font-bold">Bank Details</h3>

                <div className="space-y-3 text-sm">
                  <p className="text-muted">
                    <span className="text-dark font-semibold">Ministry Arm:</span> {account.label}
                  </p>

                  <p className="text-muted">
                    <span className="text-dark font-semibold">Giving Type:</span>{" "}
                    {givingType === "recurring" ? "Recurring Partner" : "One-Time Payment"}
                  </p>

                  <p className="text-muted">
                    <span className="text-dark font-semibold">Amount Range:</span> {selectedTier}
                  </p>

                  <p className="text-muted">
                    <span className="text-dark font-semibold">Bank Name:</span> {account.bank}
                  </p>

                  <p className="text-muted">
                    <span className="text-dark font-semibold">Account Name:</span> {account.accountName}
                  </p>
                </div>

                <div className="mt-5 rounded-2xl border border-gray-200 bg-white p-4">
                  <div className="space-y-3">
                    <div
                      onClick={handleCopy}
                      className="hover:border-danger-200 relative mt-5 flex cursor-pointer items-center justify-between rounded-2xl border-2 border-dashed border-gray-200 bg-white p-4 transition-colors"
                    >
                      <div className="flex flex-col">
                        <span className="text-muted mb-1 text-[10px] font-bold tracking-[0.2em] uppercase">
                          Account Number (Copy)
                        </span>
                        <span className="text-dark font-mono text-2xl font-black tracking-[0.12em] break-all select-all sm:text-3xl">
                          {account.accountNumber}
                        </span>
                      </div>

                      <div
                        className={cn(
                          "ml-4 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl shadow-lg transition-all duration-300",
                          copied
                            ? "scale-110 bg-green-500 text-white shadow-green-500/30"
                            : "bg-danger-500 shadow-danger-500/30 text-white"
                        )}
                      >
                        {copied ? <CheckCircle2 size={24} /> : <Copy size={24} />}
                      </div>
                    </div>
                  </div>
                </div>

                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-500 px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-green-600"
                >
                  <MessageCircle className="h-5 w-5" />
                  Send Proof via WhatsApp
                </a>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
