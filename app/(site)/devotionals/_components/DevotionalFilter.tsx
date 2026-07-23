"use client";

import { useState } from "react";
import { Search, X, Download, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface DevotionalFiltersProps {
  topics: string[];
  activeTopic: string;
  setActiveTopic: (topic: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const DevotionalFilters = ({
  topics,
  activeTopic,
  setActiveTopic,
  searchQuery,
  setSearchQuery,
}: DevotionalFiltersProps) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadMonth = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch("/api/devotionals/download");
      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || "Failed to download devotionals.");
      }

      const blob = await response.blob();
      const disposition = response.headers.get("Content-Disposition") ?? "";
      const filenameMatch = disposition.match(/filename="(.+)"/);
      const filename = filenameMatch?.[1] ?? "devotionals.pdf";

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to download devotionals.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <nav className="sticky top-20 z-40 w-full border-y border-gray-100 bg-white/80 backdrop-blur-xl transition-all">
      <div className="layout-container py-4">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="no-scrollbar flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0">
            {topics.map((topic) => (
              <button
                key={topic}
                type="button"
                onClick={() => setActiveTopic(topic)}
                className={`cursor-pointer rounded-full px-6 py-2.5 text-sm font-bold whitespace-nowrap transition-all duration-200 ${
                  activeTopic === topic
                    ? "bg-danger-500 shadow-danger-500/20 text-white shadow-lg"
                    : "text-muted hover:text-dark bg-gray-50 hover:bg-gray-100"
                }`}
              >
                {topic}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative w-full lg:w-72">
              <Search
                className={`absolute top-1/2 left-4 -translate-y-1/2 transition-colors ${
                  searchQuery ? "text-danger-500" : "text-gray-400"
                }`}
                size={18}
              />

              <Input
                type="text"
                placeholder="Search archive..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="focus-visible:ring-danger-500 h-12 w-full rounded-full border-gray-100 bg-gray-50 pr-10 pl-11 text-sm font-medium transition-all focus:bg-white focus:shadow-sm"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="hover:text-dark absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer text-gray-400"
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <Button
              type="button"
              variant="brand"
              disabled={isDownloading}
              onClick={handleDownloadMonth}
              className="shadow-danger-500/30 hover:shadow-danger-500/50 h-12 shrink-0 gap-2 rounded-full px-6 font-bold whitespace-nowrap shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0"
            >
              {isDownloading ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
              Download This Month
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DevotionalFilters;
