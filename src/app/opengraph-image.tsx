import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Salman Faris — Video Editor & Motion Graphics Artist";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social preview in the site's type language: paper, ink, REC dot, serif-italic accent. */
export default async function OpengraphImage() {
  // TTFs (SIL OFL): the OG renderer cannot read the site's woff2 files.
  const [tight, serif] = await Promise.all([
    readFile(join(process.cwd(), "src/app/fonts/InterTight-SemiBold.ttf")),
    readFile(join(process.cwd(), "src/app/fonts/InstrumentSerif-Italic.ttf")),
  ]);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F3EFE7",
          color: "#14161B",
          padding: "60px 72px",
          fontFamily: "Inter Tight",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 28 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 14, letterSpacing: -0.5 }}>
            <span style={{ width: 16, height: 16, borderRadius: 999, background: "#FF4A1C" }} />
            Salman Faris
          </span>
          <span style={{ color: "#565961", fontSize: 22, letterSpacing: 3 }}>DUBAI, UAE</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 118, lineHeight: 0.98, letterSpacing: -5 }}>
          <span>Crafting motion</span>
          <span style={{ display: "flex", alignItems: "baseline", gap: 26 }}>
            that <span style={{ fontFamily: "Instrument Serif", fontSize: 130, letterSpacing: -2 }}>moves</span> people.
          </span>
        </div>
        <div style={{ display: "flex", gap: 14 }}>
          {["Video Editor", "Motion Graphics Artist"].map((t) => (
            <span
              key={t}
              style={{ border: "2px solid #14161B", borderRadius: 999, padding: "10px 22px", fontSize: 22, letterSpacing: 1 }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Inter Tight", data: tight, weight: 600, style: "normal" },
        { name: "Instrument Serif", data: serif, weight: 400, style: "italic" },
      ],
    },
  );
}
