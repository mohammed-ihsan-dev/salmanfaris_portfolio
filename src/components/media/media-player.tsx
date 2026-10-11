"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { AlertTriangle, LoaderCircle, Pause, Play, RotateCcw, Volume2, VolumeX } from "lucide-react";
import { fade } from "@/lib/motion";
import { formatTime } from "@/lib/format";
import { cn } from "@/lib/cn";
import type { MediaFit, MediaSource, PlayerStatus } from "./types";

type MediaPlayerProps = {
  /** Accessible name, e.g. "Salman Faris showreel 2026". */
  title: string;
  sources: MediaSource[];
  poster?: string;
  /** CSS aspect-ratio of the frame, e.g. "16 / 9", "9 / 16", "4 / 5". */
  aspectRatio?: string;
  fit?: MediaFit;
  /** Muted, looping preview that only runs while in view. Ignored for reduced motion and Save-Data. */
  autoPlayPreview?: boolean;
  loop?: boolean;
  /** Rendered when there are no sources. Must not imply real work. */
  placeholder?: React.ReactNode;
  className?: string;
};

/**
 * Responsive media frame. With no sources it renders the placeholder, so the
 * layout is final before real footage exists. Swapping in a reel is a content
 * change in src/content, not a component change.
 */
export function MediaPlayer({ sources, placeholder, aspectRatio = "16 / 9", className, ...rest }: MediaPlayerProps) {
  if (sources.length === 0) {
    return (
      <div className={cn("relative overflow-hidden bg-ink-soft", className)} style={{ aspectRatio }}>
        {placeholder}
      </div>
    );
  }
  return <VideoPlayer sources={sources} aspectRatio={aspectRatio} className={className} {...rest} />;
}

const STATUS_MESSAGE: Record<PlayerStatus, string> = {
  idle: "",
  loading: "Loading video",
  playing: "Playing",
  paused: "Paused",
  ended: "Video ended",
  error: "The video could not be loaded",
};

function VideoPlayer({
  title,
  sources,
  poster,
  aspectRatio,
  fit = "auto",
  autoPlayPreview = false,
  loop = false,
  className,
}: Omit<MediaPlayerProps, "placeholder">) {
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const seekId = useId();
  const reducedMotion = useReducedMotion();

  const [src, setSrc] = useState<string | null>(null);
  const [status, setStatus] = useState<PlayerStatus>("idle");
  const [previewing, setPreviewing] = useState(false);
  const [engaged, setEngaged] = useState(false);
  const [muted, setMuted] = useState(true);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [objectFit, setObjectFit] = useState<"cover" | "contain">(fit === "contain" ? "contain" : "cover");

  // Choose the first source this browser can decode, but only attach it once the
  // frame is near the viewport: below-the-fold players stay lazy, and a player
  // hidden with display:none (e.g. the unused portrait/landscape cut) never loads.
  const sourceKey = sources.map((s) => `${s.type ?? ""}|${s.src}`).join(",");
  useEffect(() => {
    const video = videoRef.current;
    const frame = frameRef.current;
    if (!video || !frame) return;
    const playable = sources.find((s) => !s.type || video.canPlayType(s.type) !== "");
    if (!playable) {
      setStatus("error");
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setSrc(playable.src);
        observer.disconnect();
      },
      { rootMargin: "300px 0px" },
    );
    observer.observe(frame);
    return () => observer.disconnect();
    // sourceKey captures the content of `sources`
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sourceKey]);

  const play = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;
    setStatus((s) => (s === "playing" ? s : "loading"));
    try {
      await video.play();
    } catch (error) {
      const name = error instanceof DOMException ? error.name : "";
      if (name === "NotAllowedError") {
        // Autoplay policy: fall back to muted playback, else wait for the user.
        video.muted = true;
        setMuted(true);
        await video.play().catch(() => setStatus("idle"));
      } else if (name !== "AbortError" || video.error) {
        setStatus("error");
      }
    }
  }, []);

  // In-view muted preview. Never runs for reduced-motion or Save-Data users.
  useEffect(() => {
    const frame = frameRef.current;
    const video = videoRef.current;
    if (!autoPlayPreview || engaged || reducedMotion || !src || !frame || !video) return;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (saveData) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.muted = true;
          video.loop = true;
          setPreviewing(true);
          void play();
        } else if (!video.paused) {
          video.pause();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(frame);
    return () => observer.disconnect();
  }, [autoPlayPreview, engaged, reducedMotion, src, play]);

  const startFromBeginning = () => {
    const video = videoRef.current;
    if (!video) return;
    setEngaged(true);
    setPreviewing(false);
    video.loop = loop;
    video.muted = false;
    setMuted(false);
    if (previewing || status === "ended") video.currentTime = 0;
    void play();
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused || video.ended) void play();
    else video.pause();
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  const retry = () => {
    const video = videoRef.current;
    if (!video) return;
    setStatus("idle");
    video.load();
    if (engaged) void play();
  };

  const onLoadedMetadata = () => {
    const video = videoRef.current;
    const frame = frameRef.current;
    if (!video || !frame) return;
    setDuration(Number.isFinite(video.duration) ? video.duration : 0);
    if (fit !== "auto" || !video.videoWidth || !video.videoHeight) return;
    const frameRatio = frame.clientWidth / frame.clientHeight;
    const mediaRatio = video.videoWidth / video.videoHeight;
    // Within ~12% of the frame: fill it. Otherwise letterbox (e.g. 9:16 in 16:9).
    setObjectFit(Math.abs(Math.log(mediaRatio / frameRatio)) < 0.12 ? "cover" : "contain");
  };

  const showStart = !engaged && status !== "error" && status !== "loading";
  const showStartWhilePreviewing = !engaged && previewing && status === "playing";
  const showControls = engaged && status !== "error";
  const showSpinner = status === "loading" && (engaged || !previewing);

  return (
    <div
      ref={frameRef}
      className={cn("group/player relative overflow-hidden bg-ink-soft", className)}
      style={{ aspectRatio }}
    >
      <video
        ref={videoRef}
        src={src ?? undefined}
        poster={poster}
        aria-label={title}
        playsInline
        muted={muted}
        preload={autoPlayPreview ? "metadata" : "none"}
        className="absolute inset-0 h-full w-full bg-ink-soft"
        style={{ objectFit }}
        onClick={engaged ? togglePlay : undefined}
        onLoadedMetadata={onLoadedMetadata}
        onDurationChange={(e) => Number.isFinite(e.currentTarget.duration) && setDuration(e.currentTarget.duration)}
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onPlaying={() => setStatus("playing")}
        // A failed load also fires pause/waiting; only retry() clears an error.
        onWaiting={() => setStatus((s) => (s === "error" ? s : "loading"))}
        onPause={(e) => !e.currentTarget.ended && setStatus((s) => (s === "error" ? s : "paused"))}
        onEnded={() => setStatus("ended")}
        onError={() => setStatus("error")}
      />

      <p className="sr-only" role="status" aria-live="polite">
        {engaged || status === "error" ? STATUS_MESSAGE[status] : ""}
      </p>

      <AnimatePresence>
        {(showStart || showStartWhilePreviewing) && (
          <m.div key="start" {...fade} className="absolute inset-x-0 bottom-0 flex items-end p-3 sm:p-5">
            <button
              type="button"
              onClick={startFromBeginning}
              className="group/play inline-flex items-center gap-3 rounded-control bg-ink/85 py-1.5 pr-5 pl-1.5 text-small font-medium text-paper backdrop-blur-[2px] transition-colors duration-(--duration-fast) hover:bg-ink"
            >
              <span className="grid size-10 place-items-center rounded-full bg-signal text-ink transition-transform duration-(--duration-base) ease-(--ease-out-quart) group-hover/play:scale-110 group-active/play:scale-95">
                <Play aria-hidden className="size-4 translate-x-px fill-current" />
              </span>
              <span>
                {status === "ended" ? "Replay" : previewing ? "Play with sound" : "Play"}
                <span className="sr-only"> {title}</span>
              </span>
              {duration > 0 && <span className="font-mono text-paper/60 tabular-nums">{formatTime(duration)}</span>}
            </button>
          </m.div>
        )}

        {showSpinner && (
          <m.div key="loading" {...fade} className="pointer-events-none absolute inset-0 grid place-items-center">
            <span className="grid size-14 place-items-center rounded-full bg-ink/80">
              <LoaderCircle aria-hidden className="size-6 text-signal motion-safe:animate-spin" />
            </span>
          </m.div>
        )}

        {status === "error" && (
          <m.div
            key="error"
            {...fade}
            className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-ink-soft p-6 text-center"
          >
            <AlertTriangle aria-hidden className="size-6 text-paper/70" />
            <p className="text-small text-paper/70">This video couldn’t be loaded.</p>
            {src && (
              <button
                type="button"
                onClick={retry}
                className="inline-flex items-center gap-2 rounded-control border border-paper/30 px-4 py-2 text-small text-paper transition-colors duration-(--duration-fast) hover:border-paper"
              >
                <RotateCcw aria-hidden className="size-3.5" />
                Try again
              </button>
            )}
          </m.div>
        )}

        {showControls && (
          <m.div
            key="controls"
            {...fade}
            className={cn(
              "absolute inset-x-0 bottom-0 flex items-center gap-3 bg-ink/85 px-3 py-2 transition-opacity duration-(--duration-base) sm:px-4",
              // Hide while playing on hover devices until the pointer/focus returns.
              status === "playing" &&
                "[@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover/player:opacity-100 [@media(hover:hover)]:focus-within:opacity-100",
            )}
          >
            <button
              type="button"
              onClick={status === "ended" ? startFromBeginning : togglePlay}
              aria-label={status === "playing" ? "Pause" : "Play"}
              className="grid size-9 shrink-0 place-items-center rounded-full text-paper transition-colors hover:bg-paper/15"
            >
              {status === "playing" ? (
                <Pause aria-hidden className="size-4 fill-current" />
              ) : (
                <Play aria-hidden className="size-4 translate-x-px fill-current" />
              )}
            </button>
            <span className="shrink-0 font-mono text-small text-paper/70 tabular-nums" aria-hidden>
              {formatTime(time)} / {formatTime(duration)}
            </span>
            <label htmlFor={seekId} className="sr-only">
              Seek
            </label>
            <input
              id={seekId}
              type="range"
              min={0}
              max={duration || 0}
              step={0.1}
              value={Math.min(time, duration || 0)}
              aria-valuetext={`${formatTime(time)} of ${formatTime(duration)}`}
              onChange={(e) => {
                const video = videoRef.current;
                if (video) video.currentTime = Number(e.currentTarget.value);
              }}
              className="h-1 min-w-0 flex-1 cursor-pointer accent-signal"
            />
            <button
              type="button"
              onClick={toggleMute}
              aria-label={muted ? "Unmute" : "Mute"}
              className="grid size-9 shrink-0 place-items-center rounded-full text-paper transition-colors hover:bg-paper/15"
            >
              {muted ? <VolumeX aria-hidden className="size-4" /> : <Volume2 aria-hidden className="size-4" />}
            </button>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
