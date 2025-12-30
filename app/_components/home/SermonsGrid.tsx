"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';

type SermonCardData = {
  id: string;
  title: string;
  speaker: string;
  image: string;
  audioUrl: string;
};

export default function SermonsGrid() {
  // Dummy data for four sermons. Place matching MP3s in /public/audio
  const items: SermonCardData[] = useMemo(
    () => [
      {
        id: 'd1',
        title: 'The Shepherd’s Heart',
        speaker: 'Bishop Daniel Cross',
        image: '/images/home/about-us-img-1.jpg',
        audioUrl: '/audio/The_Book_of_Mark_Part_35_Pastor_Peter_E_Nwoji_15th_OCtober_2025_.mp3',
      },
      {
        id: 'd2',
        title: 'Worship That Transforms',
        speaker: 'Bob Kauflin',
        image: '/images/home/about-us-img-2.jpg',
        audioUrl: '/audio/The_Book_of_Mark_Part_36_A_teaching_by_Pastor_Peter_E_Nwoji_22nd.mp3',
      },
      {
        id: 'd3',
        title: 'Heart of a Worshipper',
        speaker: 'Rory Noland',
        image: '/images/home/banner-img-03.jpg',
        audioUrl: '/audio/Wait_on_the_Lord_A_teaching_by_Pastor_Peter_E_Nwoji_19th_October.mp3',
      },
      {
        id: 'd4',
        title: 'Songs in the Night',
        speaker: 'Ruth Anne Hayes',
        image: '/images/home/hero-bg.jpg',
        // Reusing one audio until a 4th file is added
        audioUrl: '/audio/The_Book_of_Mark_Part_36_A_teaching_by_Pastor_Peter_E_Nwoji_22nd.mp3',
      },
    ],
    []
  );

  // Keep refs to pause others when one plays
  const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);
  const registerAudioRef = (index: number, el: HTMLAudioElement | null) => {
    audioRefs.current[index] = el;
  };
  const pauseOthers = (exceptIndex: number) => {
    audioRefs.current.forEach((a, i) => {
      if (i !== exceptIndex) {
        try {
          a?.pause();
        } catch {}
      }
    });
  };

  return (
    <section className="py-12 sm:py-16">
      <div className="layout-container--wide">
        <div className="text-center mb-8 sm:mb-10">
          <p className="eyebrow text-color-primary font-fira-condensed">Sermons</p>
          <h2 className="h3 mt-1 font-fira-condensed">Listen to Recent Messages</h2>
        </div>

        <ul
          role="list"
          className="mx-auto grid max-w-7xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {items.map((item, idx) => (
            <li key={item.id} className="flex">
              <SermonCard
                index={idx}
                data={item}
                registerAudioRef={registerAudioRef}
                onRequestPlay={() => pauseOthers(idx)}
              />
            </li>
          ))}
        </ul>

        <div className="mt-10 flex justify-center">
          <Link
            href="/sermons"
            className="inline-flex items-center justify-center rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white shadow hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black dark:bg-[var(--color-foreground)]"
          >
            VIEW ALL SERMONS
          </Link>
        </div>
      </div>
    </section>
  );
}

function SermonCard({
  index,
  data,
  registerAudioRef,
  onRequestPlay,
}: {
  index: number;
  data: SermonCardData;
  registerAudioRef: (index: number, el: HTMLAudioElement | null) => void;
  onRequestPlay: () => void;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [duration, setDuration] = useState(0);
  const [current, setCurrent] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [volume, setVolume] = useState(1); // 0.0 - 1.0

  useEffect(() => {
    registerAudioRef(index, audioRef.current);
    const a = audioRef.current;
    if (!a) return;
    const onLoaded = () => {
      setDuration(a.duration || 0);
      // Initialize buffered when metadata loads
      try {
        const len = a.buffered?.length ?? 0;
        if (len > 0) setBuffered(a.buffered.end(len - 1));
      } catch {}
    };
    const onTime = () => setCurrent(a.currentTime || 0);
    const onEnd = () => setIsPlaying(false);
    const onProgress = () => {
      try {
        const len = a.buffered?.length ?? 0;
        if (len > 0) setBuffered(a.buffered.end(len - 1));
      } catch {}
    };
    a.addEventListener('loadedmetadata', onLoaded);
    a.addEventListener('timeupdate', onTime);
    a.addEventListener('ended', onEnd);
    a.addEventListener('progress', onProgress);
    return () => {
      a.removeEventListener('loadedmetadata', onLoaded);
      a.removeEventListener('timeupdate', onTime);
      a.removeEventListener('ended', onEnd);
      a.removeEventListener('progress', onProgress);
    };
  }, [index, registerAudioRef]);

  const fmt = (s: number) => {
    if (!isFinite(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };

  const togglePlay = async () => {
    const a = audioRef.current;
    if (!a) return;
    if (isPlaying) {
      a.pause();
      setIsPlaying(false);
    } else {
      onRequestPlay();
      try {
        await a.play();
        setIsPlaying(true);
      } catch (e) {
        console.warn('Play failed', e);
      }
    }
  };

  const toggleMute = () => {
    const a = audioRef.current;
    if (!a) return;
    a.muted = !a.muted;
    setIsMuted(a.muted);
  };

  const changeVolume = (v: number) => {
    const a = audioRef.current;
    if (!a) return;
    const clamped = Math.min(1, Math.max(0, v));
    a.volume = clamped;
    setVolume(clamped);
    if (clamped === 0) {
      a.muted = true;
      setIsMuted(true);
    } else if (isMuted) {
      a.muted = false;
      setIsMuted(false);
    }
  };

  const skip = (delta: number) => {
    const a = audioRef.current;
    if (!a) return;
    a.currentTime = Math.max(0, Math.min((a.currentTime || 0) + delta, duration || a.duration || 0));
  };

  const progress = duration > 0 ? Math.min(100, (current / duration) * 100) : 0;
  const bufferedPct = duration > 0 ? Math.min(100, (buffered / duration) * 100) : 0;

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const a = audioRef.current;
    if (!a || duration <= 0) return;
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const pct = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    a.currentTime = pct * duration;
  };

  return (
    <article className="flex w-full flex-col overflow-hidden rounded-2xl border border-color-border bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg">
      {/* Top image */}
      <div className="relative h-40 w-full">
        <Image
          src={data.image}
          alt={data.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover "
          priority={false}
        />
      </div>

      {/* Text */}
      <div className="p-4">
        <p className="text-xs text-[var(--color-text-muted)]">{data.speaker}</p>
        <h3 className="mt-1 text-base font-semibold text-[var(--color-foreground)] sm:text-lg">{data.title}</h3>
      </div>

      {/* Player */}
      <div className="px-4 pb-4">
        {/* Time and Progress on one row */}
        <div className="mb-3 flex items-center gap-3 text-[11px] text-[var(--color-text-muted)]">
          <span className="w-10 tabular-nums text-right">{fmt(current)}</span>
          <div
            className="relative h-1 w-full cursor-pointer"
            onClick={seek}
            role="slider"
            aria-valuemin={0}
            aria-valuemax={duration || 0}
            aria-valuenow={current}
          >
            {/* Base track (stroke) */}
            <div className="absolute inset-0 rounded-full bg-[var(--color-muted)]/60 ring-1 ring-color-border/50" />
            {/* Buffered */}
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-color-primary/25"
              style={{ width: `${bufferedPct}%` }}
              aria-hidden="true"
            />
            {/* Played fill */}
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-color-primary"
              style={{ width: `${progress}%` }}
            />
            {/* Knob */}
            <div
              className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-color-primary shadow ring-2 ring-white"
              style={{ left: `calc(${progress}% )` }}
              aria-hidden="true"
            />
          </div>
          <span className="w-10 tabular-nums">{fmt(duration)}</span>
        </div>

        {/* Controls: skip back, big play, skip forward; right: shuffle, volume */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <IconButton label="Skip back" onClick={() => skip(-10)}>
              {/* Skip back 10s */}
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M10 19l-7-7 7-7" />
                <path d="M20 19l-7-7 7-7" />
              </svg>
            </IconButton>

            <button
              type="button"
              onClick={togglePlay}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-color-primary text-color-primary-foreground shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-primary)]"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            <IconButton label="Skip forward" onClick={() => skip(15)}>
              {/* Skip forward 15s */}
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 19l7-7-7-7" />
                <path d="M14 19l7-7-7-7" />
              </svg>
            </IconButton>
          </div>

          <div className="flex items-center gap-2">
            <IconButton
              label="Toggle shuffle"
              onClick={() => setShuffle((s) => !s)}
              className={shuffle ? 'bg-[var(--color-muted)]/40' : ''}
            >
              {/* Shuffle */}
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M16 3h5v5" />
                <path d="M4 20l16-16" />
                <path d="M16 21h5v-5" />
                <path d="M4 4l5 5" />
                <path d="M9 15l-5 5" />
              </svg>
            </IconButton>

            <IconButton label={isMuted ? 'Unmute' : 'Mute'} onClick={toggleMute}>
              {isMuted ? (
                // Muted icon
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9 9v6h4l5 4V5l-5 4H9z" />
                  <path d="M3 3l18 18" />
                </svg>
              ) : (
                // Volume icon
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9 9v6h4l5 4V5l-5 4H9z" />
                  <path d="M19 12a3 3 0 000-6" />
                </svg>
              )}
            </IconButton>
          </div>
        </div>

        <audio ref={audioRef} preload="metadata" src={data.audioUrl} />

        {/* Volume slider & download */}
        <div className="mt-4 flex items-center gap-3">
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(e) => changeVolume(parseFloat(e.target.value))}
            aria-label="Volume"
            className="flex-1 accent-[var(--color-primary)]"
          />
          <a
            href={data.audioUrl}
            download
            className="inline-flex items-center gap-1 rounded-md border border-color-border bg-white px-3 py-2 text-xs font-medium text-[var(--color-foreground)] shadow-sm hover:bg-[var(--color-muted)]/30"
            aria-label={`Download ${data.title} audio`}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <path d="M7 10l5 5 5-5" />
              <path d="M12 15V3" />
            </svg>
            MP3
          </a>
        </div>
      </div>
    </article>
  );
}

function IconButton({
  children,
  onClick,
  label,
  className = '',
}: {
  children: React.ReactNode;
  onClick: () => void;
  label: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-color-border bg-white text-[var(--color-foreground)] shadow-sm hover:bg-[var(--color-muted)]/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-primary)] ${className}`}
    >
      {children}
    </button>
  );
}
