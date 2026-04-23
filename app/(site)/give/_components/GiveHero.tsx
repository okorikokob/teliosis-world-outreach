import Image from "next/image";
import { Heart } from "lucide-react";

const GiveHero = () => {
  return (
    <section className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden md:h-[600px]">
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/give-hero.png"
          alt="Give Online background"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
      </div>

      <div className="layout-container relative z-10 flex h-full items-center justify-center">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-2 backdrop-blur-sm">
            <Heart className="text-danger-500 h-5 w-5" />
            <span className="text-body-md font-medium text-white">Worship Through Giving</span>
          </div>

          <h1 className="text-heading-lg md:text-heading-xl text-light-100 mb-6 max-w-4xl">
            Give <span className="text-danger-500">Online</span>
          </h1>

          <p className="text-body-lg max-w-3xl text-white/90">
            "And God will generously provide all you need. Then you will always have everything you need and plenty left
            over to share with others."
          </p>

          <span className="mt-4 block text-sm font-bold tracking-widest text-white/90 uppercase">
            — 2 Corinthians 9:8 (NLT)
          </span>
        </div>
      </div>
    </section>
  );
};

export default GiveHero;
