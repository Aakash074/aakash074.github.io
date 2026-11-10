import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { LINKS, SITE_URL } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const TITLE = "Aakash Kumar | AI Product Engineer";
const DESCRIPTION =
  "AI Product Engineer. Ex-CTO of CloneMyTrips (acquired) and former Head of AI at WanderOn. I build AI search, production AI agents and the evals behind them. Open to remote AI roles.";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b0c10",
  colorScheme: "dark",
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
    "AI Product Engineer",
    "AI Engineer",
    "Founding AI Engineer",
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
  jobTitle: "AI Product Engineer",
  url: SITE_URL,
  email: `mailto:${LINKS.email}`,
  address: { "@type": "PostalAddress", addressLocality: "New Delhi", addressCountry: "IN" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "National Institute of Technology, Warangal" },
  sameAs: [LINKS.linkedin, LINKS.github, LINKS.x],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body id="top" className="min-h-screen bg-background text-foreground">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-lg focus:bg-foreground focus:px-4 focus:py-3 focus:text-sm focus:font-medium focus:text-background"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
