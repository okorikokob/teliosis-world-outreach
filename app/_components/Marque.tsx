"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface MarqueeProps {
  text: string;
}

export default function Marquee({ text }: MarqueeProps) {
  const container = useRef<HTMLDivElement>(null);
  const textRef1 = useRef<HTMLDivElement>(null);
  const textRef2 = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // The magic infinite scroll timeline
      gsap.to([textRef1.current, textRef2.current], {
        xPercent: -100,
        repeat: -1,
        duration: 10,
        ease: "linear",
      });
    },
    { scope: container }
  );

  return (
    <div ref={container} className="bg-danger-500 relative flex w-full overflow-hidden py-4 text-white">
      <div className="flex whitespace-nowrap">
        {/* We duplicate the text twice so it loops perfectly without jumping */}
        <div ref={textRef1} className="px-4 text-4xl font-black tracking-widest uppercase">
          {text} {text} {text}
        </div>
        <div ref={textRef2} className="px-4 text-4xl font-black tracking-widest uppercase">
          {text} {text} {text}
        </div>
      </div>
    </div>
  );
}
