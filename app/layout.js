import { Inter, Space_Mono } from "next/font/google";
import "./globals.css";

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

export const metadata = {
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
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
