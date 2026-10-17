"use client";

import { useCallback, useEffect, useState } from "react";

export type Theme = "terang" | "gelap";

/** Relay shares RigForge's single theme preference and root theme tokens. */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>("terang");
  const [ready, setReady] = useState(false);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    try {
      const root = document.documentElement;
      const saved = localStorage.getItem("rl-theme");
      const relaySaved = localStorage.getItem("relay-theme");
      if (saved === "dark" || saved === "light") {
        setTheme(saved === "dark" ? "gelap" : "terang");
      } else if (relaySaved === "gelap" || relaySaved === "terang") {
        setTheme(relaySaved);
      } else {
        setTheme(window.matchMedia("(prefers-color-scheme: dark)").matches ? "gelap" : "terang");
      }
      setReady(true);
      void root;
    } catch {
      setReady(true);
    }
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    if (!ready) return;
    const root = document.documentElement;
    const isDark = theme === "gelap";
    root.setAttribute("data-theme", isDark ? "dark" : "light");
    root.classList.toggle("dark", isDark);
    const color = getComputedStyle(root).getPropertyValue("--bg").trim();
    const meta = document.querySelector('meta[name="theme-color"]');
    if (color && meta) meta.setAttribute("content", color);
    try {
      localStorage.setItem("rl-theme", isDark ? "dark" : "light");
      localStorage.setItem("relay-theme", theme);
    } catch {
      /* Ignore unavailable localStorage. */
    }
  }, [theme, ready]);

  const toggle = useCallback(() => {
    setTheme((current) => (current === "terang" ? "gelap" : "terang"));
  }, []);

  return { theme, toggle, ready };
}
