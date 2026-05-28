"use client";

import { MeshGradient } from "@paper-design/shaders-react";
import { useEffect, useState } from "react";

export function HeroMesh({ className }: { className?: string }) {
  const [reduce, setReduce] = useState(false);
  const [maxPixels, setMaxPixels] = useState(2_500_000);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduce(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const sync = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      setMaxPixels(
        Math.min(2_500_000, Math.ceil(window.innerWidth * dpr * window.innerHeight * dpr))
      );
    };
    sync();
    window.addEventListener("resize", sync, { passive: true });
    return () => window.removeEventListener("resize", sync);
  }, []);

  return (
    <MeshGradient
      className={className}
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
      speed={reduce ? 0 : 0.45}
      maxPixelCount={maxPixels}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
