"use client";

import { useRef, useState } from "react";
import { Calendar, Clock, Download, Pause, Play, RotateCcw, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Sermon } from "@/lib/sanity.queries";

interface FeaturedSermonProps {
  sermon: Sermon;
}

const CTA_BUTTON_BASE =
  "inline-flex items-center justify-center rounded-full font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger-500 focus-visible:ring-offset-2 active:scale-[0.98]";

const formatTime = (time: number) => {
  if (!Number.isFinite(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
};

const FeaturedSermon = ({ sermon }: FeaturedSermonProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [playbackError, setPlaybackError] = useState<string | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleDownload = async (audioUrl: string, title: string, id: string) => {
    try {
      setDownloadingId(id);
      const response = await fetch(audioUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${title}.mp3`;
      a.click();
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
        a.remove();
      }, 1000);
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setDownloadingId(null);
    }
  };

  const handlePlayPause = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      setPlaybackError(null);
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
        return;
      }
      await audio.play();
      setIsPlaying(true);
    } catch (error) {
      console.error("Featured sermon play failed:", error);
      setPlaybackError("Unable to play this sermon right now. Please try again.");
      setIsPlaying(false);
    }
  };

  const handleSeek = (value: string) => {
    const audio = audioRef.current;
    if (!audio) return;
    const nextTime = Number(value);
    audio.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const skipBy = (seconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    const nextTime = Math.min(Math.max(audio.currentTime + seconds, 0), audio.duration || 0);
    audio.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  return (
    <section className="bg-[#1f1f1f] pt-12 pb-6">
      <div className="layout-container">
        <div className="rounded-[2rem] border border-white/10 bg-[#2a2a2a] p-6 text-white shadow-xl sm:p-8 lg:p-10">
          <audio
            ref={audioRef}
            src={sermon.audioUrl || undefined}
            preload="metadata"
            onLoadedMetadata={(event) => setAudioDuration(event.currentTarget.duration || 0)}
            onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => {
              setIsPlaying(false);
              setCurrentTime(0);
            }}
            onError={() => {
              setPlaybackError("Could not load this audio source.");
              setIsPlaying(false);
            }}
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
                type="button"
                size="xl"
                variant="secondary"
                onClick={() => handleDownload(sermon.audioUrl, sermon.title, sermon._id)}
                disabled={downloadingId === sermon._id}
                className={`${CTA_BUTTON_BASE} text-dark bg-white shadow-sm hover:bg-gray-100`}
              >
                <Download className="mr-2 size-5" />
                {downloadingId === sermon._id ? "Downloading..." : "Download"}
              </Button>
            </div>

            {/* Player Controls - shows once playing or paused */}
            {(isPlaying || currentTime > 0) && (
              <div className="mt-6 rounded-[1.25rem] border border-white/10 bg-white/5 p-4">
                {playbackError && <p className="mb-3 text-xs font-semibold text-red-400">{playbackError}</p>}

                <div className="mb-3 flex items-center justify-between gap-3">
                  <p className="text-danger-500 text-xs font-bold tracking-[0.2em] uppercase">Now Playing</p>
                  <p className="text-xs font-semibold text-white/60">
                    {formatTime(currentTime)} / {formatTime(audioDuration)}
                  </p>
                </div>

                <input
                  type="range"
                  min="0"
                  max={audioDuration || 0}
                  value={Math.min(currentTime, audioDuration || 0)}
                  onChange={(event) => handleSeek(event.target.value)}
                  className="accent-danger-500 w-full cursor-pointer"
                  aria-label="Audio progress"
                />

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => skipBy(-10)}
                    className={`${CTA_BUTTON_BASE} bg-white/10 px-4 py-2 text-xs text-white hover:bg-white/20`}
                  >
                    <RotateCcw className="mr-1 size-4" />
                    10s
                  </button>

                  <button
                    type="button"
                    onClick={() => skipBy(10)}
                    className={`${CTA_BUTTON_BASE} bg-white/10 px-4 py-2 text-xs text-white hover:bg-white/20`}
                  >
                    10s
                    <RotateCw className="ml-1 size-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSermon;
