"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { cn } from "@/lib/utils";

/* ---- time formatting ---- */
function fmt(t: number) {
  if (!Number.isFinite(t) || t < 0) t = 0;
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

/* ---- player glyphs (filled where it reads better at small sizes) ---- */
function PlayGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M8 5.14v13.72a1 1 0 0 0 1.54.84l10.3-6.86a1 1 0 0 0 0-1.68L9.54 4.3A1 1 0 0 0 8 5.14z" />
    </svg>
  );
}
function PauseGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <rect x="6" y="5" width="4" height="14" rx="1.5" />
      <rect x="14" y="5" width="4" height="14" rx="1.5" />
    </svg>
  );
}
function VolumeGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M4 9.5v5h3.5L13 19V5L7.5 9.5H4z" fill="currentColor" stroke="none" />
      <path d="M16.5 8.8a4.5 4.5 0 0 1 0 6.4" />
      <path d="M19 6.5a8 8 0 0 1 0 11" />
    </svg>
  );
}
function MuteGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M4 9.5v5h3.5L13 19V5L7.5 9.5H4z" fill="currentColor" stroke="none" />
      <path d="M17 9.5l4.5 5M21.5 9.5l-4.5 5" />
    </svg>
  );
}
function MaximizeGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M8 4H4v4M16 4h4v4M16 20h4v-4M8 20H4v-4" />
    </svg>
  );
}
function MinimizeGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M8 4v4H4M16 4v4h4M16 20v-4h4M8 20v-4H4" />
    </svg>
  );
}
function Spinner({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("animate-spin", className)} aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2.5" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

const iconBtn =
  "grid h-8 w-8 shrink-0 place-items-center rounded-lg text-fg/90 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60";

export function VideoPlayer({
  src,
  poster,
  label,
  className,
}: {
  src: string;
  poster?: string;
  label?: string;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const volRef = useRef<HTMLDivElement>(null);
  const hideTimer = useRef<number | null>(null);

  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [current, setCurrent] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [fs, setFs] = useState(false);
  const [buffering, setBuffering] = useState(false);
  const [controlsShown, setControlsShown] = useState(true);
  const [scrubbing, setScrubbing] = useState(false);
  const [hoverFrac, setHoverFrac] = useState<number | null>(null);

  const toggle = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    wrapRef.current?.focus({ preventScroll: true });
    if (v.paused) void v.play().catch(() => {});
    else v.pause();
  }, []);

  /* wire native media events → state */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onLoaded = () => setDuration(v.duration || 0);
    const onTime = () => setCurrent(v.currentTime);
    const onPlay = () => {
      setPlaying(true);
      setStarted(true);
    };
    const onPause = () => setPlaying(false);
    const onWaiting = () => setBuffering(true);
    const onPlaying = () => setBuffering(false);
    const onVol = () => {
      setMuted(v.muted);
      setVolume(v.volume);
    };
    const onProgress = () => {
      try {
        if (v.buffered.length) setBuffered(v.buffered.end(v.buffered.length - 1));
      } catch {
        /* ranges not ready */
      }
    };
    v.addEventListener("loadedmetadata", onLoaded);
    v.addEventListener("durationchange", onLoaded);
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    v.addEventListener("waiting", onWaiting);
    v.addEventListener("playing", onPlaying);
    v.addEventListener("volumechange", onVol);
    v.addEventListener("progress", onProgress);
    return () => {
      v.removeEventListener("loadedmetadata", onLoaded);
      v.removeEventListener("durationchange", onLoaded);
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("waiting", onWaiting);
      v.removeEventListener("playing", onPlaying);
      v.removeEventListener("volumechange", onVol);
      v.removeEventListener("progress", onProgress);
    };
  }, []);

  /* fullscreen state */
  useEffect(() => {
    const onFs = () => setFs(document.fullscreenElement === wrapRef.current);
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  const toggleFs = useCallback(() => {
    const el = wrapRef.current;
    if (!el) return;
    if (document.fullscreenElement) void document.exitFullscreen().catch(() => {});
    else void el.requestFullscreen?.().catch(() => {});
  }, []);

  const toggleMute = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.muted || v.volume === 0) {
      v.muted = false;
      if (v.volume === 0) v.volume = 1;
    } else {
      v.muted = true;
    }
  }, []);

  /* auto-hide the control bar while playing + idle */
  const wake = useCallback(() => {
    setControlsShown(true);
    if (hideTimer.current) window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => {
      const v = videoRef.current;
      if (v && !v.paused) setControlsShown(false);
    }, 2600);
  }, []);

  useEffect(() => {
    if (!playing) setControlsShown(true);
  }, [playing]);

  /* ---- scrubber ---- */
  const seekToClientX = useCallback(
    (clientX: number) => {
      const t = trackRef.current;
      const v = videoRef.current;
      if (!t || !v || !duration) return;
      const rect = t.getBoundingClientRect();
      const frac = clamp01((clientX - rect.left) / rect.width);
      v.currentTime = frac * duration;
      setCurrent(frac * duration);
    },
    [duration]
  );

  const onTrackDown = (e: ReactPointerEvent) => {
    e.preventDefault();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    setScrubbing(true);
    seekToClientX(e.clientX);
  };
  const onTrackMove = (e: ReactPointerEvent) => {
    const t = trackRef.current;
    if (!t) return;
    const rect = t.getBoundingClientRect();
    setHoverFrac(clamp01((e.clientX - rect.left) / rect.width));
    if (scrubbing) seekToClientX(e.clientX);
  };
  const endScrub = (e: ReactPointerEvent) => {
    if ((e.currentTarget as HTMLElement).hasPointerCapture?.(e.pointerId)) {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    }
    setScrubbing(false);
  };

  /* ---- volume slider ---- */
  const setVolFromClientX = useCallback((clientX: number) => {
    const el = volRef.current;
    const v = videoRef.current;
    if (!el || !v) return;
    const rect = el.getBoundingClientRect();
    const frac = clamp01((clientX - rect.left) / rect.width);
    v.volume = frac;
    v.muted = frac === 0;
  }, []);
  const onVolDown = (e: ReactPointerEvent) => {
    e.preventDefault();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    setVolFromClientX(e.clientX);
  };
  const onVolMove = (e: ReactPointerEvent) => {
    if (e.buttons === 1) setVolFromClientX(e.clientX);
  };

  /* ---- keyboard ---- */
  const onKey = (e: React.KeyboardEvent) => {
    const v = videoRef.current;
    if (!v) return;
    switch (e.key) {
      case " ":
      case "k":
        e.preventDefault();
        toggle();
        break;
      case "m":
        e.preventDefault();
        toggleMute();
        break;
      case "f":
        e.preventDefault();
        toggleFs();
        break;
      case "ArrowRight":
        e.preventDefault();
        v.currentTime = Math.min(duration, v.currentTime + 5);
        wake();
        break;
      case "ArrowLeft":
        e.preventDefault();
        v.currentTime = Math.max(0, v.currentTime - 5);
        wake();
        break;
      default:
    }
  };

  const playedPct = duration ? (current / duration) * 100 : 0;
  const bufPct = duration ? (buffered / duration) * 100 : 0;
  const volPct = muted ? 0 : volume * 100;
  // Keep the pre-play state clean (poster + center play + caption); the full
  // control bar only appears once playback has started.
  const barVisible = started && (controlsShown || scrubbing);

  return (
    <div
      ref={wrapRef}
      tabIndex={0}
      onKeyDown={onKey}
      onMouseMove={wake}
      onMouseLeave={() => {
        if (playing) setControlsShown(false);
        setHoverFrac(null);
      }}
      className={cn(
        "group/player relative select-none overflow-hidden bg-ink-950 outline-none",
        fs ? "h-full w-full rounded-none" : "rounded-[15px]",
        playing && !controlsShown ? "cursor-none" : "cursor-default",
        className
      )}
      aria-label={label}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        playsInline
        preload="metadata"
        onClick={toggle}
        className={cn(
          "h-full w-full bg-ink-950",
          fs ? "object-contain" : "aspect-video object-cover"
        )}
      />

      {/* top hairline */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
      />

      {/* pre-play scrim + caption */}
      {!started ? (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-ink-950/70 via-ink-950/15 to-ink-950/45"
          />
          <div className="pointer-events-none absolute bottom-5 left-5 z-10 hidden items-center gap-2 sm:flex">
            <span className="rounded-full border border-violet/30 bg-violet/[0.12] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-violet-300 backdrop-blur-sm">
              Demo
            </span>
            <span className="font-mono text-[12px] text-fg-muted">
              Watch AndSpace in motion{duration ? ` · ${fmt(duration)}` : ""}
            </span>
          </div>
        </>
      ) : null}

      {/* buffering spinner */}
      {buffering && started ? (
        <div className="pointer-events-none absolute inset-0 z-20 grid place-items-center">
          <Spinner className="h-10 w-10 text-white/90" />
        </div>
      ) : null}

      {/* center play / resume button */}
      {!playing && !buffering ? (
        <button
          type="button"
          onClick={toggle}
          aria-label="Play demo"
          className="absolute inset-0 z-20 grid place-items-center"
        >
          <span className="grid h-16 w-16 place-items-center rounded-full border border-white/20 bg-violet-500/85 shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_18px_50px_-12px_rgba(124,58,237,0.85),0_0_60px_-8px_rgba(124,58,237,0.6)] backdrop-blur-md transition-transform duration-200 hover:scale-105 hover:bg-violet-500 sm:h-[72px] sm:w-[72px]">
            <PlayGlyph className="ml-1 h-7 w-7 text-white sm:h-8 sm:w-8" />
          </span>
        </button>
      ) : null}

      {/* control bar */}
      <div
        className={cn(
          "absolute inset-x-0 bottom-0 z-30 transition-opacity duration-300",
          barVisible ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-ink-950/95 via-ink-950/55 to-transparent"
        />
        <div className="relative px-3 pb-3 pt-8 sm:px-4 sm:pb-4">
          {/* scrubber */}
          <div
            ref={trackRef}
            onPointerDown={onTrackDown}
            onPointerMove={onTrackMove}
            onPointerUp={endScrub}
            onPointerLeave={() => setHoverFrac(null)}
            className="group/track relative flex h-4 cursor-pointer touch-none items-center"
          >
            {hoverFrac !== null && duration ? (
              <div
                className="pointer-events-none absolute -top-7 -translate-x-1/2 rounded-md border border-white/10 bg-ink-900/95 px-1.5 py-0.5 font-mono text-[10.5px] text-fg shadow-lg backdrop-blur-sm"
                style={{ left: `${hoverFrac * 100}%` }}
              >
                {fmt(hoverFrac * duration)}
              </div>
            ) : null}
            <div className="relative h-1 w-full rounded-full bg-white/15 transition-[height] duration-150 group-hover/track:h-1.5">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-white/20"
                style={{ width: `${bufPct}%` }}
              />
              {hoverFrac !== null ? (
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-white/25"
                  style={{ width: `${hoverFrac * 100}%` }}
                />
              ) : null}
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-violet-500 to-violet-400"
                style={{ width: `${playedPct}%` }}
              />
              <span
                className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full bg-white shadow-[0_0_0_4px_rgba(167,139,250,0.35)] transition-transform duration-150 group-hover/track:scale-100"
                style={{ left: `${playedPct}%` }}
              />
            </div>
          </div>

          {/* buttons */}
          <div className="mt-2 flex items-center gap-2 sm:gap-2.5">
            <button
              type="button"
              onClick={toggle}
              aria-label={playing ? "Pause" : "Play"}
              className={iconBtn}
            >
              {playing ? (
                <PauseGlyph className="h-[18px] w-[18px]" />
              ) : (
                <PlayGlyph className="ml-px h-[18px] w-[18px]" />
              )}
            </button>

            <div className="group/vol flex items-center">
              <button
                type="button"
                onClick={toggleMute}
                aria-label={muted || volume === 0 ? "Unmute" : "Mute"}
                className={iconBtn}
              >
                {muted || volume === 0 ? (
                  <MuteGlyph className="h-[18px] w-[18px]" />
                ) : (
                  <VolumeGlyph className="h-[18px] w-[18px]" />
                )}
              </button>
              <div
                ref={volRef}
                onPointerDown={onVolDown}
                onPointerMove={onVolMove}
                className="relative ml-0.5 hidden h-3 w-0 cursor-pointer touch-none items-center opacity-0 transition-[width,opacity] duration-200 group-hover/vol:w-16 group-hover/vol:opacity-100 sm:flex"
              >
                <div className="relative h-1 w-full rounded-full bg-white/20">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-white/85"
                    style={{ width: `${volPct}%` }}
                  />
                  <span
                    className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_0_3px_rgba(255,255,255,0.18)]"
                    style={{ left: `${volPct}%` }}
                  />
                </div>
              </div>
            </div>

            <span className="ml-0.5 font-mono text-[11.5px] tabular-nums text-fg-muted">
              {fmt(current)}
              <span className="text-fg-faint"> / {fmt(duration)}</span>
            </span>

            <button
              type="button"
              onClick={toggleFs}
              aria-label={fs ? "Exit fullscreen" : "Fullscreen"}
              className={cn(iconBtn, "ml-auto")}
            >
              {fs ? (
                <MinimizeGlyph className="h-[18px] w-[18px]" />
              ) : (
                <MaximizeGlyph className="h-[18px] w-[18px]" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
