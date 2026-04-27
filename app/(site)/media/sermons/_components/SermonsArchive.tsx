"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import type { Sermon } from "@/lib/sanity.queries";
import RecentSermons from "./RecentSermons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SermonsArchiveProps {
  sermons: Sermon[];
}

const INITIAL_VISIBLE_COUNT = 6;

const SermonsArchive = ({ sermons }: SermonsArchiveProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSeries, setSelectedSeries] = useState("all");
  const [selectedSpeaker, setSelectedSpeaker] = useState("all");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);

  const seriesOptions = useMemo(() => {
    return Array.from(new Set(sermons.map((sermon) => sermon.series).filter(Boolean))) as string[];
  }, [sermons]);

  const speakerOptions = useMemo(() => {
    return Array.from(new Set(sermons.map((sermon) => sermon.speaker).filter(Boolean)));
  }, [sermons]);

  const filteredSermons = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return sermons
      .filter((sermon) => {
        const matchesSearch =
          !search ||
          sermon.title.toLowerCase().includes(search) ||
          sermon.speaker.toLowerCase().includes(search) ||
          sermon.series?.toLowerCase().includes(search) ||
          sermon.description?.toLowerCase().includes(search);

        const matchesSeries = selectedSeries === "all" || sermon.series === selectedSeries;
        const matchesSpeaker = selectedSpeaker === "all" || sermon.speaker === selectedSpeaker;

        return matchesSearch && matchesSeries && matchesSpeaker;
      })
      .sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();

        return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
      });
  }, [sermons, searchTerm, selectedSeries, selectedSpeaker, sortOrder]);

  const visibleSermons = filteredSermons.slice(0, visibleCount);
  const hasMore = visibleCount < filteredSermons.length;

  const hasActiveFilters =
    Boolean(searchTerm) || selectedSeries !== "all" || selectedSpeaker !== "all" || sortOrder !== "newest";

  const resetVisibleCount = () => {
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedSeries("all");
    setSelectedSpeaker("all");
    setSortOrder("newest");
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  };

  return (
    <>
      <section className="bg-white pt-10">
        <div className="layout-container">
          <div className="mb-10 text-center">
            <h2 className="text-heading-md text-dark mb-4">Recent Sermons</h2>
            <p className="text-body-md text-muted font-normal">Listen to our latest messages and teachings</p>
          </div>

          <div className="rounded-[2rem] border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1.6fr_1fr_1fr_auto]">
              <div className="relative">
                <Search
                  className={`absolute top-1/2 left-4 -translate-y-1/2 transition-colors ${
                    searchTerm ? "text-danger-500" : "text-gray-400"
                  }`}
                  size={18}
                />

                <Input
                  type="search"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    resetVisibleCount();
                  }}
                  placeholder="Search sermons, speakers, or series..."
                  className="focus-visible:ring-danger-500 h-12 w-full rounded-full border-gray-100 bg-gray-50 pr-10 pl-11 text-sm font-medium transition-all focus:bg-white"
                />

                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchTerm("");
                      resetVisibleCount();
                    }}
                    className="hover:text-dark absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer text-gray-400"
                    aria-label="Clear search"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              <select
                value={selectedSpeaker}
                onChange={(e) => {
                  setSelectedSpeaker(e.target.value);
                  resetVisibleCount();
                }}
                className="focus:border-danger-500 h-12 rounded-full border border-gray-100 bg-gray-50 px-4 text-sm font-medium text-gray-700 transition outline-none focus:bg-white"
              >
                <option value="all">All Speakers</option>
                {speakerOptions.map((speaker) => (
                  <option key={speaker} value={speaker}>
                    {speaker}
                  </option>
                ))}
              </select>

              <select
                value={sortOrder}
                onChange={(e) => {
                  setSortOrder(e.target.value as "newest" | "oldest");
                  resetVisibleCount();
                }}
                className="focus:border-danger-500 h-12 rounded-full border border-gray-100 bg-gray-50 px-4 text-sm font-medium text-gray-700 transition outline-none focus:bg-white"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>

              {hasActiveFilters && (
                <Button type="button" variant="outline" onClick={clearFilters} className="h-12 rounded-full">
                  <X className="mr-2 size-4" />
                  Clear
                </Button>
              )}
            </div>

            <div className="mt-4 border-t border-gray-100 pt-4">
              <div className="no-scrollbar flex items-center gap-2 overflow-x-auto">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedSeries("all");
                    resetVisibleCount();
                  }}
                  className={`cursor-pointer rounded-full px-5 py-2 text-sm font-bold whitespace-nowrap transition-all ${
                    selectedSeries === "all"
                      ? "bg-danger-500 shadow-danger-500/20 text-white shadow-md"
                      : "text-muted hover:text-dark bg-gray-50 hover:bg-gray-100"
                  }`}
                >
                  All Series
                </button>

                {seriesOptions.map((series) => (
                  <button
                    key={series}
                    type="button"
                    onClick={() => {
                      setSelectedSeries(series);
                      resetVisibleCount();
                    }}
                    className={`cursor-pointer rounded-full px-5 py-2 text-sm font-bold whitespace-nowrap transition-all ${
                      selectedSeries === series
                        ? "bg-danger-500 shadow-danger-500/20 text-white shadow-md"
                        : "text-muted hover:text-dark bg-gray-50 hover:bg-gray-100"
                    }`}
                  >
                    {series}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <p className="text-muted mt-4 text-sm font-medium">
            Showing <span className="text-dark font-bold">{visibleSermons.length}</span> of{" "}
            <span className="text-dark font-bold">{filteredSermons.length}</span> sermons
          </p>
        </div>
      </section>

      {filteredSermons.length > 0 && <RecentSermons sermons={visibleSermons} />}

      {filteredSermons.length > 0 && hasMore && (
        <section className="bg-white pb-20">
          <div className="layout-container flex justify-center">
            <Button
              type="button"
              size="xl"
              onClick={() => setVisibleCount((count) => count + INITIAL_VISIBLE_COUNT)}
              className="bg-danger-500 hover:bg-danger-600 rounded-full text-white"
            >
              Load More Sermons
            </Button>
          </div>
        </section>
      )}

      {sermons.length > 0 && filteredSermons.length === 0 && (
        <section className="bg-white py-20">
          <div className="layout-container">
            <div className="rounded-3xl border border-gray-100 bg-gray-50 p-10 text-center">
              <h2 className="text-heading-sm text-dark mb-2">No sermons found</h2>
              <p className="text-body-sm text-muted mb-6">Try changing your search or clearing the filters.</p>
              <Button type="button" onClick={clearFilters} className="rounded-full">
                Clear Filters
              </Button>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default SermonsArchive;
