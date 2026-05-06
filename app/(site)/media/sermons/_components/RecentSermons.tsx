"use client";

import { useRef, useState } from "react";
import { Play, Pause, Calendar, Clock, Download, RotateCcw, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Sermon } from "@/lib/sanity.queries";

interface RecentSermonsProps {
  sermons: Sermon[];
}

const formatTime = (time: number) => {
  if (!Number.isFinite(time)) return "0:00";

  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, "0");

  return `${minutes}:${seconds}`;
};

const SURFACE_CARD = "rounded-[2rem] border border-gray-200/80 bg-white shadow-sm";
const SURFACE_CARD_ACTIVE = "border-danger-500/25 bg-white shadow-md shadow-danger-500/10";
const CTA_BUTTON_BASE =
  "inline-flex items-center justify-center rounded-full font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger-500 focus-visible:ring-offset-2 active:scale-[0.98]";

const RecentSermons = ({ sermons }: RecentSermonsProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [activeSermonId, setActiveSermonId] = useState<string | null>(null);
  const [activeAudioUrl, setActiveAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackError, setPlaybackError] = useState<string | null>(null);

  const [currentTime, setCurrentTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);

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
  const handlePlayPause = async (sermon: Sermon) => {
    const audio = audioRef.current;
    if (!audio) return;

    const isSameSermon = activeSermonId === sermon._id;

    try {
      setPlaybackError(null);

      if (!sermon.audioUrl) {
        setPlaybackError("This sermon does not have a valid audio source yet.");
        setIsPlaying(false);
        return;
      }

      if (isSameSermon) {
        if (isPlaying) {
          audio.pause();
          setIsPlaying(false);
          return;
        }

        await audio.play();
        setIsPlaying(true);
        return;
      }

      setActiveSermonId(sermon._id);
      setActiveAudioUrl(sermon.audioUrl);
      setCurrentTime(0);
      setAudioDuration(0);

      audio.src = sermon.audioUrl;
      audio.load();

      await audio.play();
      setIsPlaying(true);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        // Harmless when switching streams quickly; ignore noisy browser cancellation.
        return;
      }

      if (error instanceof DOMException && error.name === "NotSupportedError") {
        setPlaybackError("This audio format is not supported by your browser or the URL is invalid.");
        setIsPlaying(false);
        return;
      }

      console.error("Audio play failed:", error);
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

  if (!sermons.length) {
    return (
      <section className="bg-white py-16 sm:py-20">
        <div className="layout-container">
          <div className="rounded-3xl border border-gray-100 bg-gray-50 p-10 text-center">
            <h2 className="text-heading-sm text-dark mb-2">No sermons published yet</h2>
            <p className="text-body-sm text-muted">Add your first sermon in Studio to populate this page.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-16 sm:py-20">
      <audio
        ref={audioRef}
        src={activeAudioUrl ?? undefined}
        preload="metadata"
        onLoadedMetadata={(event) => {
          setAudioDuration(event.currentTarget.duration || 0);
        }}
        onTimeUpdate={(event) => {
          setCurrentTime(event.currentTarget.currentTime);
        }}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={() => {
          setPlaybackError("Could not load this audio source. Confirm the URL points to a direct audio file.");
          setIsPlaying(false);
        }}
        onEnded={() => {
          setIsPlaying(false);
          setCurrentTime(0);
        }}
      />

      <div className="layout-container">
        <div className="flex flex-col gap-6">
          {sermons.map((sermon) => {
            const isActive = activeSermonId === sermon._id;
            const durationToShow = audioDuration || 0;

            return (
              <div
                key={sermon._id}
                className={`group ${SURFACE_CARD} flex flex-col items-start gap-8 p-6 transition-all md:flex-row md:items-center md:p-8 lg:p-10 ${
                  isActive ? SURFACE_CARD_ACTIVE : "hover:-translate-y-0.5 hover:shadow-md"
                }`}
              >
                <button
                  type="button"
                  className="bg-danger-500 shadow-danger-500/20 hover:bg-danger-600 focus-visible:ring-danger-500 flex size-20 shrink-0 cursor-pointer items-center justify-center rounded-full text-white shadow-lg transition-all duration-200 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none active:scale-95"
                  aria-label={`${isActive && isPlaying ? "Pause" : "Play"} ${sermon.title}`}
                  onClick={() => handlePlayPause(sermon)}
                >
                  {isActive && isPlaying ? (
                    <Pause className="size-8" strokeWidth={1.5} />
                  ) : (
                    <Play className="ml-1 size-8" strokeWidth={1.5} />
                  )}
                </button>

                <div className="flex-1 space-y-4">
                  <div className="text-label text-muted flex flex-wrap items-center gap-3 sm:gap-6">
                    <span className="bg-primary-100 text-primary-500 rounded-full px-4 py-1.5 text-[12px] font-bold tracking-wide">
                      {sermon.series || "Sunday Sermon"}
                    </span>

                    {isActive && (
                      <span className="bg-danger-500 rounded-full px-4 py-1.5 text-[12px] font-bold tracking-wide text-white">
                        {isPlaying ? "Now Playing" : "Paused"}
                      </span>
                    )}

                    <div className="flex items-center gap-2">
                      <Calendar className="size-4" />
                      <span>{new Date(sermon.date).toLocaleDateString()}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="size-4" />
                      <span>{sermon.duration || "N/A"}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-heading-sm text-dark mb-1">{sermon.title}</h3>
                    <div className="text-body-sm text-muted">
                      by <span className="font-medium text-gray-700">{sermon.speaker}</span>
                    </div>
                  </div>

                  <p className="text-body-sm text-muted">
                    {sermon.description || "Listen and be transformed by God's word."}
                  </p>

                  {isActive && (
                    <div className="rounded-[1.25rem] border border-gray-200/80 bg-gray-50 p-4">
                      {playbackError && <p className="mb-3 text-xs font-semibold text-red-600">{playbackError}</p>}
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <p className="text-danger-500 text-xs font-bold tracking-[0.2em] uppercase">Audio Player</p>

                        <p className="text-muted text-xs font-semibold">
                          {formatTime(currentTime)} / {formatTime(durationToShow)}
                        </p>
                      </div>

                      <input
                        type="range"
                        min="0"
                        max={durationToShow || 0}
                        value={Math.min(currentTime, durationToShow || 0)}
                        onChange={(event) => handleSeek(event.target.value)}
                        className="accent-danger-500 w-full cursor-pointer"
                        aria-label="Audio progress"
                      />

                      <div className="mt-4 flex flex-wrap items-center gap-3">
                        <button
                          type="button"
                          onClick={() => skipBy(-10)}
                          className={`${CTA_BUTTON_BASE} text-dark bg-white px-4 py-2 text-xs shadow-sm hover:bg-gray-100`}
                        >
                          <RotateCcw className="size-4" />
                          10s
                        </button>

                        <button
                          type="button"
                          onClick={() => skipBy(10)}
                          className={`${CTA_BUTTON_BASE} text-dark bg-white px-4 py-2 text-xs shadow-sm hover:bg-gray-100`}
                        >
                          10s
                          <RotateCw className="size-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="w-full shrink-0 md:w-auto">
                  <Button
                    type="button"
                    size="xl"
                    variant="secondary"
                    onClick={() => handleDownload(sermon.audioUrl, sermon.title, sermon._id)}
                    disabled={downloadingId === sermon._id}
                    className={`${CTA_BUTTON_BASE} text-dark w-full bg-white shadow-sm hover:bg-gray-100 md:w-auto`}
                  >
                    <Download className="mr-2 size-5" />
                    {downloadingId === sermon._id ? "Downloading..." : "Download"}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RecentSermons;
