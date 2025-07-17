import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Grill My Reddit | Roast Reddit Users with AI 🔥",
  description:
    "Get hilariously brutal AI-generated roasts based on any Reddit user's comment history. Enter a username and watch the grill light up.",
  keywords: [
    "Reddit roast",
    "AI roast",
    "Grill My Reddit",
    "Reddit insults",
    "funny AI",
    "Reddit comment generator",
    "Roast my Reddit",
  ],
  metadataBase: new URL("https://grillmyreddit.vercel.app/"),
  themeColor: "#f97316",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Grill My Reddit",
    description: "Savage AI-generated roasts based on Reddit comment history.",
    url: "https://grillmyreddit.vercel.app/",
    siteName: "Grill My Reddit",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Grill My Reddit OG Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Grill My Reddit",
    description: "Hilarious AI roasts based on Reddit user comments.",
    creator: "@yourhandle",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
