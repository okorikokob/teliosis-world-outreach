import Link from "next/link";
import { Button } from "@/components/ui/button";

const MediaCTA = () => {
  return (
    <section className="bg-danger-500 py-24 text-center">
      <div className="layout-container flex flex-col items-center">
        {/* Heading */}
        <h2 className="text-heading-md md:text-heading-lg mb-6 text-white">Never Miss a Message</h2>

        {/* Subtext */}
        <p className="text-body-lg mb-12 max-w-2xl text-white/90">
          Subscribe to get notified when new sermons and teachings are available.
        </p>

        {/* Buttons Container */}
        <div className="flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row sm:gap-6">
          {/* Spotify / Podcast Button */}
          <Button
            size="xl"
            className="text-danger-500 w-full rounded-full bg-white font-bold shadow-xl hover:bg-gray-50 active:scale-95 sm:w-auto"
            asChild
          >
            <Link
              href={
                process.env.NEXT_PUBLIC_SPOTIFY_PODCAST_ID
                  ? `https://open.spotify.com/show/${process.env.NEXT_PUBLIC_SPOTIFY_PODCAST_ID}`
                  : "#"
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              Subscribe to Podcast
            </Link>
          </Button>

          {/* Archive Button */}
          <Button
            size="xl"
            className="w-full rounded-full border-2 border-white bg-black font-bold text-white shadow-xl hover:bg-zinc-900 active:scale-95 sm:w-auto"
            asChild
          >
            <Link href="/media/archive">Browse Archive</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MediaCTA;
