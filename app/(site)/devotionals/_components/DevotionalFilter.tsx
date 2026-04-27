"use client";

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";

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
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DevotionalFilters;
