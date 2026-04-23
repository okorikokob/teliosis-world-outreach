import { Volume2 } from "lucide-react";

export default function MediaHero() {
  return (
    <section className="relative flex min-h-[500px] w-full flex-col items-center justify-center overflow-hidden py-24">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/media-hero.jpg')",
        }}
      >
        <div className="overlay-dark absolute inset-0 backdrop-blur-[2px]" />
      </div>

      <div className="layout-container relative z-10 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-md">
          <Volume2 className="text-danger-500" size={16} fill="currentColor" />
          <span className="text-light-90">Sermons & Teachings</span>
        </div>

        <h1 className="text-heading-lg md:text-heading-xl mb-6 text-white">
          Listen & <span className="text-danger-500">Grow</span>
        </h1>

        <p className="text-body-lg text-light-70 mx-auto max-w-2xl">
          Access our library of sermons, teachings, and inspirational messages. Listen anytime, anywhere.
        </p>
      </div>
    </section>
  );
}
