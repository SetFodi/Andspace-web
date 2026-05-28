"use client";

import { MeshGradient } from "@paper-design/shaders-react";
import { useEffect, useRef, useState } from "react";

const MAX_SHADER_PIXELS = 1_400_000;

export function HeroMesh({ className }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [reduce, setReduce] = useState(false);
  const [active, setActive] = useState(true);
  const [maxPixels, setMaxPixels] = useState(MAX_SHADER_PIXELS);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduce(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: "1200px 0px", threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const sync = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      setMaxPixels(
        Math.min(
          MAX_SHADER_PIXELS,
          Math.ceil(window.innerWidth * dpr * window.innerHeight * dpr)
        )
      );
    };
    sync();
    window.addEventListener("resize", sync, { passive: true });
    return () => window.removeEventListener("resize", sync);
  }, []);

  return (
    <div ref={rootRef} className={className}>
      <MeshGradient
        className="h-full w-full"
        colors={[
          "#08080b",
          "#0b0a18",
          "#3b1d6e",
          "#6d28d9",
          "#4338ca",
          "#0a0a0c",
        ]}
        distortion={0.85}
        swirl={0.55}
        grainMixer={0.2}
        grainOverlay={0}
        minPixelRatio={1}
        speed={reduce || !active ? 0 : 0.32}
        maxPixelCount={maxPixels}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
