import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ParticleBackground } from "@/components/animations/particle-background";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#06080d",
};

export const metadata: Metadata = {
  title: {
    default: "Aakash Kumar — AI Product Engineer & Startup Operator",
    template: "%s | Aakash Kumar",
  },
  description:
    "AI Product Engineer, Startup Operator, and Full Stack Architect. Building AI systems, fintech infrastructure, and Web3 products. Former CTO of CloneMyTrips (acquired). Head of AI at WanderOn.",
  keywords: [
    "Aakash Kumar", "AI Product Engineer", "Full Stack Developer", "Startup CTO",
    "Web3 Builder", "AI Engineer", "Blockchain Developer", "Solana", "Hedera",
    "React", "Next.js", "TypeScript", "NIT Warangal",
  ],
  authors: [{ name: "Aakash Kumar" }],
  creator: "Aakash Kumar",
  metadataBase: new URL("https://aakashkumar.dev"),
  openGraph: {
    type: "website", locale: "en_US", url: "https://aakashkumar.dev",
    title: "Aakash Kumar — AI Product Engineer & Startup Operator",
    description: "Building AI systems, fintech infrastructure, and internet products.",
    siteName: "Aakash Kumar",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Aakash Kumar" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aakash Kumar — AI Product Engineer & Startup Operator",
    description: "Building AI systems, fintech infrastructure, and internet products.",
    images: ["/og-image.png"], creator: "@aakash074",
  },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
        <ParticleBackground />
        <Navbar />
        <main className="relative z-10 flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
