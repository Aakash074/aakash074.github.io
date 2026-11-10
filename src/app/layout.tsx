import type { Metadata, Viewport } from "next";
import { Fraunces, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MotionRoot } from "@/components/motion/motion-root";
import { DESCRIPTION, LINKS, SITE_URL, TITLE } from "@/lib/site";
import "./globals.css";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["opsz"],
  style: ["normal", "italic"],
  display: "swap",
});

const body = Instrument_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const code = JetBrains_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  preload: false,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f5f0e6",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Aakash Kumar",
  },
  description: DESCRIPTION,
  keywords: [
    "Aakash Kumar",
    "AI Engineer",
    "Senior AI Engineer",
    "Founding AI Engineer",
    "Applied AI Engineer",
    "Head of AI",
    "Semantic search",
    "RAG",
    "AI agents",
    "LLM evals",
    "Startup CTO",
    "NIT Warangal",
  ],
  authors: [{ name: "Aakash Kumar", url: SITE_URL }],
  creator: "Aakash Kumar",
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Aakash Kumar",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    creator: "@Kumaaraakash074",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Aakash Kumar",
  jobTitle: "AI Engineer",
  url: SITE_URL,
  email: `mailto:${LINKS.email}`,
  address: { "@type": "PostalAddress", addressLocality: "New Delhi", addressCountry: "IN" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "National Institute of Technology, Warangal" },
  sameAs: [LINKS.linkedin, LINKS.github, LINKS.x],
};

/**
 * Runs while the HTML is parsed, before first paint. Light for everyone unless
 * the visitor saved dark; also marks that JS is on so scroll reveals may hide content.
 */
const themeScript = `(function(){var d=document.documentElement;d.classList.add("js");try{if(localStorage.getItem("theme")==="dark"){d.setAttribute("data-theme","dark");var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content","#14110d")}}catch(e){}})()`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${code.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body id="top" className="min-h-screen">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-foreground focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-background"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main" tabIndex={-1} className="relative outline-none">
          {children}
        </main>
        <Footer />
        <MotionRoot />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
