"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useTheme } from "../hooks/useTheme";
import { Icon } from "./Icon";

type HeaderProps = {
  /** Identifies which workspace is currently open. The logo links to the other workspace. */
  variant?: "rigforge" | "relay";
};

export function Header({ variant = "rigforge" }: HeaderProps) {
  const { theme, toggle } = useTheme();
  const isRelay = variant === "relay";
  const destination = isRelay ? "/" : "/relay";
  const destinationName = isRelay ? "RigForge" : "Relay";
  const action = theme === "dark" ? "Ganti ke mode terang" : "Ganti ke mode gelap";
  const [swapping, setSwapping] = useState(false);
  const swapTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(swapTimer.current), []);

  const onToggle = () => {
    toggle();
    setSwapping(true);
    window.clearTimeout(swapTimer.current);
    swapTimer.current = window.setTimeout(() => setSwapping(false), 350);
  };

  return (
    <header className="site-header">
      <div className="container site-header__in">
        <div className="site-header__brand-group">
          <Link className="brand" href={destination} aria-label={`Buka ${destinationName}`}>
            <span className="brand__mark">
              {isRelay ? (
                <svg className="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m22 2-7 20-4-9-9-4Z" />
                  <path d="M22 2 11 13" />
                </svg>
              ) : (
                <Icon name="brackets" size={24} />
              )}
            </span>
            <div className="brand__text">
              <span className="brand__name">{isRelay ? "Relay" : "RigForge"}</span>
              <span className="brand__descriptor">
                {isRelay ? "Discord message tools" : <>Avatar data <span aria-hidden="true">→</span> Lua</>}
              </span>
            </div>
          </Link>
        </div>
        <div className="site-header__actions">
          <button
            type="button"
            role="switch"
            aria-checked={theme === "dark"}
            aria-label={action}
            title={action}
            className={swapping ? "icon-btn is-swapping" : "icon-btn"}
            onClick={onToggle}
          >
            <Icon name={theme === "dark" ? "moon" : "sun"} size={22} />
          </button>
        </div>
      </div>
    </header>
  );
}
