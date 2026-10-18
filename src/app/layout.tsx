import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Inter, Patrick_Hand } from "next/font/google";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import "../styles/tokens.css";
import "../styles/base.css";
import "../styles/site.css";
import "../styles/landing.css";
import "../styles/redesign.css";
import "../styles/workspace-parity.css";

const handFont = Patrick_Hand({
  variable: "--font-hand",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const sansFont = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rigforge-mocha.vercel.app"),
  title: {
    default: "RigForge — Roblox Avatar to Lua",
    template: "%s | RigForge",
  },
  description:
    "Konversi data avatar Roblox menjadi struktur Lua yang rapi, lalu kelola pengiriman pesan Discord melalui workspace Relay.",
  applicationName: "RigForge",
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    siteName: "RigForge",
    title: "RigForge — Roblox Avatar to Lua",
    description:
      "Konverter avatar Roblox ke Lua dan workspace Discord Relay, dengan antarmuka yang dirancang untuk alur kerja yang jelas.",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "RigForge — Roblox Avatar to Lua",
    description: "Konversi avatar Roblox dan gunakan workspace Discord Relay.",
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#080d18",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

function themeInitScript() {
  return "(function(){try{" +
    "var t=localStorage.getItem('rl-theme');" +
    "if(t!=='light'&&t!=='dark'){" +
    "var r=localStorage.getItem('relay-theme');" +
    "if(r==='gelap')t='dark';" +
    "else if(r==='terang')t='light';" +
    "else t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}" +
    "document.documentElement.setAttribute('data-theme',t);" +
    "document.documentElement.classList.toggle('dark',t==='dark');" +
    "localStorage.setItem('rl-theme',t);" +
    "localStorage.setItem('relay-theme',t==='dark'?'gelap':'terang');" +
    "}catch(e){document.documentElement.setAttribute('data-theme','light');}})();";
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={handFont.variable + " " + sansFont.variable}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript() }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
