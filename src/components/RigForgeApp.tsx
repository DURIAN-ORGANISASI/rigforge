"use client";

import { useRef } from "react";
import { Converter } from "@/components/Converter";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LandingHero } from "@/components/Landing";

export default function RigForgeApp() {
  const mainRef = useRef<HTMLElement>(null);

  return (
    <div className="rigforge-app">
      <a
        className="skip-link"
        href="#konten"
        onClick={(e) => {
          e.preventDefault();
          mainRef.current?.focus();
        }}
      >
        Lewati ke konten
      </a>
      <Header />
      <main id="konten" ref={mainRef} tabIndex={-1}>
        <LandingHero />
        <Converter />
      </main>
      <Footer />
    </div>
  );
}
