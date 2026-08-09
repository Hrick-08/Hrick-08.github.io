import type { Metadata } from "next";
import { Bangers, VT323, Press_Start_2P } from "next/font/google";
import "./globals.css";

const bangers = Bangers({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bangers",
  display: "swap",
});

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt323",
  display: "swap",
});

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start",
  display: "swap",
});

export const metadata: Metadata = {
  title: "hrick's hideout ✦",
  description:
    "a chaotic corner of the web — dev projects, anime shrines, pokémon nonsense, manhwa rambles, and too much coffee ☕",
  keywords: [
    "portfolio",
    "neocities",
    "y2k",
    "fan site",
    "web developer",
    "anime",
    "manga",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bangers.variable} ${vt323.variable} ${pressStart2P.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
