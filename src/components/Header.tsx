"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useTheme } from "../hooks/useTheme";
import { Icon } from "./Icon";

type HeaderProps = {
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
          <div className="brand">
            <Link
              className="brand__mark brand__mark--switch"
              href={destination}
              aria-label={`Beralih ke ${destinationName}`}
              title={`Beralih ke ${destinationName}`}
            >
              <Icon name={isRelay ? "arrow" : "brackets"} size={23} />
            </Link>
            <span className="brand__text">
              <span className="brand__name">{isRelay ? "Relay" : "RigForge"}</span>
              <span className="brand__descriptor">
                {isRelay ? "Discord message tools" : "Avatar data to Lua"}
              </span>
            </span>
          </div>
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
            <Icon name={theme === "dark" ? "sun" : "moon"} size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
