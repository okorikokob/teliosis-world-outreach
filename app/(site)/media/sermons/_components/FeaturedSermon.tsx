"use client";

import { useRef, useState } from "react";
import { Calendar, Clock, Download, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Sermon } from "@/lib/sanity.queries";

interface FeaturedSermonProps {
  sermon: Sermon;
}

const FeaturedSermon = ({ sermon }: FeaturedSermonProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
        return;
      }

      await audio.play();
      setIsPlaying(true);
    } catch (error) {
      console.error("Featured sermon play failed:", error);
      setIsPlaying(false);
    }
  };

  return (
    <section className="bg-[#1f1f1f] pt-12 pb-6">
      <div className="layout-container">
        <div className="rounded-[2rem] border border-white/10 bg-[#2a2a2a] p-6 text-white shadow-xl sm:p-8 lg:p-10">
          <audio
            ref={audioRef}
            src={sermon.audioUrl || undefined}
            preload="metadata"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
          />

          <div className="max-w-3xl">
            <div className="bg-danger-500/10 text-danger-500 mb-4 inline-flex rounded-full px-4 py-2 text-xs font-bold tracking-[0.2em] uppercase">
              Featured Message
            </div>

            <h2 className="mb-4 text-3xl leading-tight font-bold sm:text-4xl">{sermon.title}</h2>

            <p className="mb-6 text-sm leading-7 text-white/70 sm:text-base">
              {sermon.description || "Listen and be transformed by God's word."}
            </p>

            <div className="mb-8 flex flex-wrap items-center gap-4 text-sm text-white/70">
              <span className="bg-danger-500 rounded-full px-4 py-1.5 text-xs font-bold text-white">
                {sermon.series || "Sunday Sermon"}
              </span>

              <span>by {sermon.speaker}</span>

              <span className="inline-flex items-center gap-2">
                <Calendar className="size-4" />
                {new Date(sermon.date).toLocaleDateString()}
              </span>

              <span className="inline-flex items-center gap-2">
                <Clock className="size-4" />
                {sermon.duration || "Audio"}
              </span>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                type="button"
                size="xl"
                onClick={handlePlayPause}
                className="bg-danger-500 shadow-danger-500/20 hover:bg-danger-600 cursor-pointer rounded-full font-bold text-white shadow-lg"
              >
                {isPlaying ? (
                  <>
                    <Pause className="mr-2 size-5" />
                    Pause Message
                  </>
                ) : (
                  <>
                    <Play className="mr-2 size-5" />
                    Listen Now
                  </>
                )}
              </Button>

              <Button
                asChild
                size="xl"
                variant="secondary"
                className="text-dark rounded-full bg-white font-bold hover:bg-gray-100"
              >
                <a href={sermon.audioUrl} target="_blank" rel="noopener noreferrer">
                  <Download className="mr-2 size-5" />
                  Download
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSermon;
