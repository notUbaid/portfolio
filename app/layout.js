import { Inter, Space_Mono, Caveat } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import PhysicsCat from "@/components/Cat/PhysicsCat";
import ConsoleArt from "@/components/ConsoleArt";

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
    "Full-stack developer and UI designer who builds things that actually ship. This is not another AI-generated portfolio.",
  keywords: [
    "Ubaid Khan",
    "full-stack developer",
    "UI designer",
    "React",
    "Next.js",
    "portfolio",
  ],
  authors: [{ name: "Ubaid Khan" }],
  openGraph: {
    title: "Ubaid Khan — Developer, Designer, Club President",
    description:
      "Full-stack developer who builds things that ship. Not another AI-generated portfolio.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ubaid Khan — Developer, Designer, Club President",
    description:
      "Full-stack developer who builds things that ship. Not another AI-generated portfolio.",
  },
  icons: {
    icon: [
      { url: "/web-app-manifest-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/web-app-manifest-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/web-app-manifest-192x192.png" },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceMono.variable} ${caveat.variable} ${handmadeAlphabet.variable} ${amanojaku.variable}`}>
      <body>
        <ConsoleArt />
        {children}
        <PhysicsCat />
      </body>
    </html>
  );
}
