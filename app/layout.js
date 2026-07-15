import { Inter, Space_Mono, Caveat } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import PhysicsCat from "@/components/Cat/PhysicsCat";
import ConsoleArt from "@/components/ConsoleArt";
import ChalkTrail from "@/components/ChalkTrail";
import PassiveAggressiveToast from "@/components/PassiveAggressiveToast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-sketch",
  display: "swap",
});

const handmadeAlphabet = localFont({
  src: "../public/fonts/HandmadeAlphabet.otf",
  variable: "--font-handmade",
  display: "swap",
});

const amanojaku = localFont({
  src: "../public/fonts/Amanojaku.otf",
  variable: "--font-amanojaku",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://notubaid.vercel.app"),
  title: "Ubaid Khan — Developer, Designer, Club President",
  description:
    "Full-stack developer and UI designer who builds things that actually ship.",
  keywords: [
    "Ubaid Khan",
    "full-stack developer",
    "UI designer",
    "React",
    "Next.js",
    "portfolio",
    "software engineer"
  ],
  authors: [{ name: "Ubaid Khan", url: "https://notubaid.vercel.app" }],
  creator: "Ubaid Khan",
  publisher: "Ubaid Khan",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Ubaid Khan — Developer, Designer, Club President",
    description:
      "Full-stack developer and UI designer who builds things that actually ship.",
    url: "https://notubaid.vercel.app",
    siteName: "Ubaid Khan Portfolio",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/web-app-manifest-512x512.png",
        width: 512,
        height: 512,
        alt: "Ubaid Khan Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ubaid Khan — Developer, Designer, Club President",
    description:
      "Full-stack developer and UI designer who builds things that actually ship.",
    images: ["/web-app-manifest-512x512.png"],
    creator: "@notUbaid",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/web-app-manifest-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/web-app-manifest-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/web-app-manifest-192x192.png" },
    ],
  },
  manifest: "/manifest.json",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ubaid Khan",
  url: "https://notubaid.vercel.app",
  jobTitle: "Full-Stack Developer & UI Designer",
  sameAs: [
    "https://github.com/notUbaid",
    "https://linkedin.com/in/notubaid"
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Institute of Advanced Research, Gandhinagar"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceMono.variable} ${caveat.variable} ${handmadeAlphabet.variable} ${amanojaku.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ConsoleArt />
        {children}
        <PhysicsCat />
        <ChalkTrail />
        <PassiveAggressiveToast />
      </body>
    </html>
  );
}
