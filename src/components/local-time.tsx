"use client";

import { useEffect, useState } from "react";

/**
 * Current time in Salman's time zone, so clients abroad can see when he's
 * reachable. Rendered after mount to avoid a server/client mismatch; the
 * fixed-width fallback prevents layout shift.
 */
export function LocalTime({ timeZone, label }: { timeZone: string; label: string }) {
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    const format = new Intl.DateTimeFormat("en-GB", { timeZone, hour: "2-digit", minute: "2-digit", hour12: false });
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      setNow(format.format(new Date()));
      timer = setTimeout(tick, 60_000 - (Date.now() % 60_000));
    };
    tick();
    return () => clearTimeout(timer);
  }, [timeZone]);

  return (
    <span className="tabular-nums">
      <span className="sr-only">Local time </span>
      <time suppressHydrationWarning>{now ?? "--:--"}</time> {label}
    </span>
  );
}
