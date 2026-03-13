import React from "react";
import Link from "next/link";
import { Headphones, Image as ImageIcon, Youtube, Music, Instagram, Smartphone, ArrowRight } from "lucide-react";
import MediaHero from "./_components/MediaHero";

export default function MediaHubPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Existing Hero Component */}
      <MediaHero />

      {/* 1. MAIN HUB NAVIGATION (Sermons & Gallery) */}
      <section className="relative z-20 -mt-16 px-6 pb-24">
        <div className="mx-auto w-full max-w-5xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Audio Sermons Card */}
            <Link
              href="/media/sermons"
              className="group hover:border-danger-200 relative flex flex-col justify-between overflow-hidden rounded-3xl border border-gray-100 bg-white p-10 shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="bg-danger-50 text-danger-500 mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl transition-transform group-hover:scale-110">
                <Headphones size={32} />
              </div>
              <h2 className="mb-2 text-3xl font-black text-zinc-900">Audio Sermons</h2>
              <p className="mb-8 leading-relaxed text-gray-500">
                Listen to the latest messages, series, and teachings from our pastoral team to build your faith.
              </p>
              <div className="text-danger-500 group-hover:text-danger-600 inline-flex items-center gap-2 font-bold transition-colors">
                Listen Now <ArrowRight size={20} />
              </div>
            </Link>

            {/* Photo Gallery Card */}
            <Link
              href="/media/gallery"
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-gray-100 bg-white p-10 shadow-xl transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-2xl"
            >
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-500 transition-transform group-hover:scale-110">
                <ImageIcon size={32} />
              </div>
              <h2 className="mb-2 text-3xl font-black text-zinc-900">Photo Gallery</h2>
              <p className="mb-8 leading-relaxed text-gray-500">
                Explore moments from our Sunday services, community outreaches, and special church events.
              </p>
              <div className="inline-flex items-center gap-2 font-bold text-blue-500 transition-colors group-hover:text-blue-600">
                View Gallery <ArrowRight size={20} />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. CONNECT EVERYWHERE (Social & Streaming Grid) */}
      <section className="bg-white py-24">
        <div className="layout-container max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-black md:text-4xl">Connect With Us Everywhere</h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-500">
              Take the word of God with you throughout the week. Subscribe and follow our digital channels for daily
              encouragement.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* YouTube */}
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center rounded-3xl border border-gray-100 bg-gray-50 p-8 text-center transition-all hover:-translate-y-1 hover:border-red-200 hover:bg-white hover:shadow-xl"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600 transition-transform group-hover:scale-110">
                <Youtube size={28} />
              </div>
              <h3 className="mb-2 text-xl font-bold text-zinc-900">YouTube</h3>
              <p className="text-sm leading-relaxed text-gray-500">Watch full services & live streams</p>
            </a>

            {/* Spotify */}
            <a
              href="https://spotify.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center rounded-3xl border border-gray-100 bg-gray-50 p-8 text-center transition-all hover:-translate-y-1 hover:border-green-200 hover:bg-white hover:shadow-xl"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 transition-transform group-hover:scale-110">
                <Music size={28} />
              </div>
              <h3 className="mb-2 text-xl font-bold text-zinc-900">Spotify</h3>
              <p className="text-sm leading-relaxed text-gray-500">Stream audio messages on the go</p>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center rounded-3xl border border-gray-100 bg-gray-50 p-8 text-center transition-all hover:-translate-y-1 hover:border-pink-200 hover:bg-white hover:shadow-xl"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-pink-100 text-pink-600 transition-transform group-hover:scale-110">
                <Instagram size={28} />
              </div>
              <h3 className="mb-2 text-xl font-bold text-zinc-900">Instagram</h3>
              <p className="text-sm leading-relaxed text-gray-500">Daily quotes & church life</p>
            </a>

            {/* TikTok */}
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center rounded-3xl border border-gray-100 bg-gray-50 p-8 text-center transition-all hover:-translate-y-1 hover:border-zinc-300 hover:bg-white hover:shadow-xl"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-200 text-zinc-800 transition-transform group-hover:scale-110">
                <Smartphone size={28} />
              </div>
              <h3 className="mb-2 text-xl font-bold text-zinc-900">TikTok</h3>
              <p className="text-sm leading-relaxed text-gray-500">Short-form word & worship clips</p>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
