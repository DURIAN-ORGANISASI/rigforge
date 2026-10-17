import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Inter, Patrick_Hand } from "next/font/google";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import "../styles/tokens.css";
import "../styles/base.css";
import "../styles/site.css";
import "../styles/landing.css";

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
    default: "RigForge + Relay — Roblox Lua & Discord Tools",
    template: "%s | RigForge + Relay",
  },
  description:
    "RigForge mengubah data avatar Roblox menjadi script Lua. Relay mengirim pesan ke channel Discord menggunakan Bot Token resmi.",
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    siteName: "RigForge + Relay",
    title: "RigForge + Relay — Roblox Lua & Discord Tools",
    description:
      "Konverter avatar Roblox ke Lua dan alat pengiriman pesan Discord dalam satu workspace.",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "RigForge + Relay",
    description: "Roblox Lua converter and official Discord bot tools.",
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFBEB",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

function themeInitScript() {
  // One shared preference keeps RigForge and Relay visually identical on first paint.
  return `(function(){try{
    var t=localStorage.getItem("rl-theme");
    if(t!=="light"&&t!=="dark"){
      var r=localStorage.getItem("relay-theme");
      if(r==="gelap")t="dark";
      else if(r==="terang")t="light";
      else t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";
    }
    document.documentElement.setAttribute("data-theme",t);
    document.documentElement.classList.toggle("dark",t==="dark");
    localStorage.setItem("rl-theme",t);
    localStorage.setItem("relay-theme",t==="dark"?"gelap":"terang");
  }catch(e){document.documentElement.setAttribute("data-theme","light");}})();`;
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${handFont.variable} ${sansFont.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript() }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
