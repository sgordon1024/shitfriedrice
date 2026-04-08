/**
 * Root Layout — Wraps every page on the site
 *
 * Loads fonts, global styles, the navigation, footer,
 * cart drawer, and the skip-to-content accessibility link.
 *
 * This is the skeleton of the whole site.
 */

import type { Metadata } from "next";
import {
  Bebas_Neue,
  Big_Shoulders,
  Syne,
  Inter,
  Syne_Mono,
  IM_Fell_English,
  Cormorant_Garamond,
} from "next/font/google";
import "@/styles/globals.css";

// --- Load all the fonts (zero FOUT via next/font) ---

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bebas",
});

// Variable font for the hero headline — supports weight 100-900
// so we can drive it with mouse proximity
const bigShoulders = Big_Shoulders({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-big-shoulders",
});

const syne = Syne({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-syne",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const syneMono = Syne_Mono({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-syne-mono",
});

// Old-book fonts for Squish's fairy tale page
const imFellEnglish = IM_Fell_English({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fell",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cormorant",
});

// --- Site-wide metadata ---

export const metadata: Metadata = {
  title: {
    default: "Shitfriedrice — Art That Gives Things a Second Life",
    template: "%s — Shitfriedrice",
  },
  description:
    "Handmade art sculptures and objects from found, discarded, and unexpected materials. Sauce packet magnets, lava lamps, resin sculptures, and prop food for film/TV.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://shitfriedrice.com"
  ),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Shitfriedrice",
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: "/favicon.svg",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${bigShoulders.variable} ${syne.variable} ${inter.variable} ${syneMono.variable} ${imFellEnglish.variable} ${cormorantGaramond.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-sfr-black text-sfr-cream font-[family-name:var(--font-inter)]">
        {children}
      </body>
    </html>
  );
}
