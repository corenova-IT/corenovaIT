import type { Metadata } from "next";
import { Bricolage_Grotesque, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import Header from "@/components/Header";
import Marquee from "@/components/Marquee";
import Footer from "@/components/Footer";
import CursorTrail from "@/components/CursorTrail";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const SITE_URL = "https://corenovait.com.au";
const SITE_NAME = "CoreNovaIT";
const SITE_DESCRIPTION =
  "CoreNovaIT is a white-label web, app, design, and AI-integration partner for agencies that don't build in-house.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "CoreNovaIT — Build. Design. Grow. Automate.",
    template: "%s — CoreNovaIT",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "white-label web development",
    "white-label agency partner",
    "app development agency",
    "AI integration agency",
    "graphic design agency",
    "digital marketing agency",
    "CoreNovaIT",
  ],
  authors: [{ name: SITE_NAME }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  alternates: {
    // "./" resolves against each page's own URL, so /services is canonical to
    // /services (a fixed "/" here would mark every page a duplicate of the homepage)
    canonical: "./",
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: "CoreNovaIT — Build. Design. Grow. Automate.",
    description: SITE_DESCRIPTION,
    locale: "en_AU",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "CoreNovaIT — white-label web, app, design, and AI-integration partner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CoreNovaIT — Build. Design. Grow. Automate.",
    description: SITE_DESCRIPTION,
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body>
        {/* Sets data-theme before paint so a saved light-mode choice
            doesn't flash the dark default first. Keep in sync with
            ThemeToggle's THEME_STORAGE_KEY. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('corenovait-theme');if(t==='light'){document.documentElement.setAttribute('data-theme','light');}}catch(e){}})();",
          }}
        />
        <GoogleAnalytics />
        <CursorTrail />
        <Header />
        <Marquee />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
