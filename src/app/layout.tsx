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
  // Set kedua tema sebelum paint pertama; keduanya menggunakan storage key terpisah.
  return `(function(){try{
    var t=localStorage.getItem("rl-theme");
    if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";}
    document.documentElement.setAttribute("data-theme",t);
    var r=localStorage.getItem("relay-theme");
    if(r==="gelap"||(r!=="terang"&&window.matchMedia("(prefers-color-scheme: dark)").matches)){document.documentElement.classList.add("dark");}
    else{document.documentElement.classList.remove("dark");}
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
