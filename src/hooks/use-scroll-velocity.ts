import { useEffect, useRef, useState } from "react";

export type ScrollVelocity = "fast" | "normal" | "slow";

/**
 * Reading & Scroll-Velocity Intelligence (#11)
 * - fast skimming → parent shows bullet/spec summary
 * - slow deep reading → parent reveals "Explain / 3D view" affordance
 */
export function useScrollVelocity(): { velocity: ScrollVelocity; hoverDeep: boolean } {
  const [velocity, setVelocity] = useState<ScrollVelocity>("normal");
  const [hoverDeep, setHoverDeep] = useState(false);
  const lastY = useRef(0);
  const lastT = useRef(Date.now());
  const slowTimer = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const now = Date.now();
      const dy = Math.abs(window.scrollY - lastY.current);
      const dt = Math.max(1, now - lastT.current);
      const pxPerSec = (dy / dt) * 1000;
      lastY.current = window.scrollY;
      lastT.current = now;
      if (pxPerSec > 2500) setVelocity("fast");
      else if (pxPerSec < 250) setVelocity("slow");
      else setVelocity("normal");
    };
    let hoverStart = 0;
    const onMouseMove = () => {
      if (!hoverStart) hoverStart = Date.now();
      if (slowTimer.current) window.clearTimeout(slowTimer.current);
      slowTimer.current = window.setTimeout(() => {
        if (Date.now() - hoverStart > 4000) setHoverDeep(true);
      }, 4000);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouseMove);
      if (slowTimer.current) window.clearTimeout(slowTimer.current);
    };
  }, []);

  return { velocity, hoverDeep };
}
