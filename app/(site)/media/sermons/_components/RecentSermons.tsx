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

const RecentSermons = ({ sermons }: RecentSermonsProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [activeSermonId, setActiveSermonId] = useState<string | null>(null);
  const [activeAudioUrl, setActiveAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackError, setPlaybackError] = useState<string | null>(null);

  const [currentTime, setCurrentTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);

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
        // Harmless when switching streams quickly; browser canceled prior request.
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
                className={`group flex flex-col items-start gap-8 rounded-[2rem] border p-6 transition-all md:flex-row md:items-center md:p-8 lg:p-10 ${
                  isActive
                    ? "border-danger-500/30 bg-danger-50/40 shadow-danger-500/10 shadow-lg"
                    : "border-gray-100 bg-gray-50 hover:bg-gray-100"
                }`}
              >
                <button
                  type="button"
                  className="bg-danger-500 shadow-danger-500/20 flex size-20 shrink-0 cursor-pointer items-center justify-center rounded-full text-white shadow-xl transition-transform hover:scale-105 active:scale-95"
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
                    <div className="border-danger-500/10 rounded-2xl border bg-white p-4">
                      {playbackError && <p className="mb-3 text-xs font-semibold text-red-600">{playbackError}</p>}

                      <div className="mb-3 flex items-center justify-between gap-3">
                        {/* <p className="text-danger-500 text-xs font-bold tracking-[0.2em] uppercase">Audio Player</p> */}
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
                          className="text-dark flex cursor-pointer items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-xs font-bold transition hover:bg-gray-200"
                        >
                          <RotateCcw className="size-4" />
                          10s
                        </button>

                        <button
                          type="button"
                          onClick={() => skipBy(10)}
                          className="text-dark flex cursor-pointer items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-xs font-bold transition hover:bg-gray-200"
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
                    asChild
                    size="xl"
                    variant="secondary"
                    className="text-dark w-full rounded-full bg-gray-200 font-bold hover:bg-gray-300 md:w-auto"
                  >
                    <a href={sermon.audioUrl} download={`${sermon.title}.mp3`}>
                      <Download className="mr-2 size-5" />
                      Download
                    </a>
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
