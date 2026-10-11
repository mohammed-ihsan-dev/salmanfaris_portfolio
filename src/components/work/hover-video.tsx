"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Muted preview loop that plays while a fine pointer hovers its tile.
 * Nothing loads until the first hover; touch devices and reduced-motion
 * users never load it.
 */
export function HoverVideo({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [armed, setArmed] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  // Runs after the <video> has mounted, so play() always has an element.
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (hovering) {
      video
        .play()
        .then(() => setVisible(true))
        .catch(() => {});
    } else {
      video.pause();
      setVisible(false);
    }
  }, [hovering, armed]);

  return (
    <div
      className="absolute inset-0 z-[1]"
      onPointerEnter={() => {
        const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (!fine || reduced) return;
        setArmed(true);
        setHovering(true);
      }}
      onPointerLeave={() => setHovering(false)}
    >
      {armed && (
        <video
          ref={ref}
          src={src}
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
          className={`h-full w-full object-cover transition-opacity duration-(--duration-slow) ${visible ? "opacity-100" : "opacity-0"}`}
        />
      )}
    </div>
  );
}
