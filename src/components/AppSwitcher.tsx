"use client";

import Link from "next/link";

type AppSwitcherProps = {
  target: "relay" | "rigforge";
};

/**
 * Ikon zigzag yang berpindah di antara dua workspace.
 * Seluruh halaman berganti lewat navigasi route; bukan hanya mengganti judul.
 */
export function AppSwitcher({ target }: AppSwitcherProps) {
  const destination = target === "relay" ? "/relay" : "/";
  const destinationName = target === "relay" ? "Relay" : "RigForge";
  const label = `Beralih ke ${destinationName}`;

  return (
    <Link
      className="app-switcher-icon"
      href={destination}
      aria-label={label}
      title={label}
    >
      <svg
        width="44"
        height="18"
        viewBox="0 0 44 16"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M2 12 L10 4 L18 12 L26 4 L34 12 L42 4"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="sr-only">{label}</span>
    </Link>
  );
}
