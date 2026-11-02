import type { Metadata } from "next";
import localFont from "next/font/local";
import Header from "@/components/Header";
import Marquee from "@/components/Marquee";
import Footer from "@/components/Footer";
import CursorTrail from "@/components/CursorTrail";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import "./globals.css";

// Self-hosted (latin subset, from @fontsource 5.3.0; licences in app/fonts) so builds never
// need to reach Google Fonts. Same weights and CSS variables as before.
const display = localFont({
  src: [
    { path: "./fonts/bricolage-grotesque-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/bricolage-grotesque-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "./fonts/bricolage-grotesque-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-display",
  display: "swap",
  fallback: ["system-ui", "Arial", "sans-serif"],
});

const body = localFont({
  src: [
    { path: "./fonts/ibm-plex-sans-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/ibm-plex-sans-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/ibm-plex-sans-latin-600-normal.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-body",
  display: "swap",
  fallback: ["system-ui", "Arial", "sans-serif"],
});

const mono = localFont({
  src: [
    { path: "./fonts/ibm-plex-mono-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/ibm-plex-mono-latin-500-normal.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-mono",
  display: "swap",
  fallback: ["ui-monospace", "Menlo", "Consolas", "monospace"],
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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
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

const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/icon-512.png`,
  description: SITE_DESCRIPTION,
};

const WEBSITE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
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
        {/* Structured data: helps Google associate the logo/brand with this
            site in search results. Sitelinks (like the ChatGPT example) are
            algorithmic and can't be forced directly — they build up over
            time from search traffic, clear navigation, and Search Console
            verification, but this is the on-page signal that supports it. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSON_LD) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_JSON_LD) }}
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
