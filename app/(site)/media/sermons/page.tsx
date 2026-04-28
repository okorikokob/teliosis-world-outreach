import Link from "next/link";
import { Headphones, ArrowLeft } from "lucide-react";
import { getAllSermons } from "@/lib/sanity.queries";
import SermonsArchive from "./_components/SermonsArchive";

export default async function SermonsPage() {
  const sermons = await getAllSermons(8);

  return (
    <main className="min-h-screen bg-gray-50 pb-24">
      <section className="bg-zinc-900 py-20 text-center text-white">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-10 flex justify-center">
            <Link
              href="/media"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
            >
              <ArrowLeft size={16} />
              Back to Media Hub
            </Link>
          </div>

          <div className="mb-6 flex justify-center">
            <div className="bg-danger-500/20 text-danger-500 flex h-16 w-16 items-center justify-center rounded-2xl">
              <Headphones size={32} />
            </div>
          </div>

          <h1 className="mb-6 text-4xl font-black tracking-tight md:text-5xl">Audio Sermons</h1>

          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-400">
            Listen to the latest messages, series, and teachings from our pastoral team. Feed your spirit and grow in
            faith wherever you go.
          </p>
        </div>
      </section>

      <div className="relative z-10 -mt-8">
        <SermonsArchive sermons={sermons} />
      </div>
    </main>
  );
}
