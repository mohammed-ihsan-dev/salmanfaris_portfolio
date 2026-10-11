"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/cn";

export function CopyButton({ value, label, className }: { value: string; label: string; className?: string }) {
  const [copied, setCopied] = useState<boolean | null>(null);

  useEffect(() => {
    if (copied === null) return;
    const t = setTimeout(() => setCopied(null), 2200);
    return () => clearTimeout(t);
  }, [copied]);

  return (
    <button
      type="button"
      onClick={() =>
        navigator.clipboard
          ?.writeText(value)
          .then(() => setCopied(true))
          .catch(() => setCopied(false))
      }
      className={cn(
        "inline-flex h-12 shrink-0 items-center gap-2 rounded-control border border-fg/25 px-5 text-[0.9375rem] text-fg transition-[border-color,scale] duration-(--duration-fast) hover:border-fg active:scale-[0.97]",
        className,
      )}
    >
      {copied ? <Check aria-hidden className="size-4" /> : <Copy aria-hidden className="size-4" />}
      <span aria-live="polite">{copied ? "Copied" : copied === false ? "Copy failed" : label}</span>
    </button>
  );
}
