"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ScrollResetter() {
  const pathname = usePathname();
  const prevIndex = useRef<number | null>(null);

  useEffect(() => {
    const currentIndex = history.state?.idx ?? 0;
    const isForward = prevIndex.current === null || currentIndex > prevIndex.current;

    if (isForward) {
      window.scrollTo(0, 0);
    }

    ScrollTrigger.refresh();
    prevIndex.current = currentIndex;
  }, [pathname]);

  return null;
}
