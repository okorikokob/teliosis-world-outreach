"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ScrollResetter() {
  const pathname = usePathname();

  useEffect(() => {
    // Force window to top on route change
    window.scrollTo(0, 0);

    // Refresh GSAP ScrollTriggers to calculate new page positions
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
      ScrollTrigger.refresh();
    }
  }, [pathname]);

  return null;
}
