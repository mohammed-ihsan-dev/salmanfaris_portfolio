import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight, Instrument_Serif } from "next/font/google";
import { MotionProvider } from "@/components/motion-provider";
import "./globals.css";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const description =
  "Dubai-based video editor and motion graphics artist with 5+ years across commercials, brand content, education and wedding films.";

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl), alternates: { canonical: "/" } } : {}),
  title: "Salman Faris — Video Editor & Motion Graphics Artist",
  description,
  authors: [{ name: "Salman Faris" }],
  openGraph: {
    type: "profile",
    title: "Salman Faris — Video Editor & Motion Graphics Artist",
    description,
    siteName: "Salman Faris",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
  // Indexing switches on only once the final domain is configured.
  robots: siteUrl ? { index: true, follow: true } : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#f3efe7",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${interTight.variable} ${instrumentSerif.variable} ${inter.variable}`}>
      <body>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
