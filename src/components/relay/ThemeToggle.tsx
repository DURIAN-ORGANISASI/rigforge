"use client";

import { Icon } from "@/components/Icon";
import { useTheme } from "@/hooks/relay/useTheme";

export function ThemeToggle() {
  const { theme, toggle, ready } = useTheme();
  const isDark = theme === "gelap";
  const label = isDark ? "Ganti ke mode terang" : "Ganti ke mode gelap";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={label}
      title={label}
      className="icon-btn"
      onClick={toggle}
      disabled={!ready}
    >
      <Icon name={isDark ? "moon" : "sun"} size={22} />
    </button>
  );
}
