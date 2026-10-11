export type MediaSource = {
  /** Local path ("/media/reel.mp4") or a verified remote URL. */
  src: string;
  /** MIME type, e.g. "video/webm" or "video/mp4". Used to pick a playable source. */
  type?: string;
};

/**
 * cover   — fill the frame, cropping edges.
 * contain — letterbox inside the frame.
 * auto    — cover when the footage roughly matches the frame, letterbox when it
 *           doesn't (portrait clip in a landscape frame and vice versa).
 */
export type MediaFit = "auto" | "cover" | "contain";

export type PlayerStatus = "idle" | "loading" | "playing" | "paused" | "ended" | "error";
