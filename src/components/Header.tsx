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
  const homePath = isRelay ? "/relay" : "/";
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
          <Link className="brand" href={homePath} aria-label={isRelay ? "Relay home" : "RigForge home"}>
            <span className="brand__mark">
              <Icon name={isRelay ? "arrow" : "brackets"} size={23} />
            </span>
            <span className="brand__text">
              <span className="brand__name">{isRelay ? "Relay" : "RigForge"}</span>
              <span className="brand__descriptor">
                {isRelay ? "Discord message workspace" : "Avatar data to Lua"}
              </span>
            </span>
          </Link>
        </div>

        <nav className="site-header__nav" aria-label="Navigasi utama">
          {isRelay ? (
            <>
              <span className="site-header__current"><span className="site-header__current-dot" /> Relay workspace</span>
              <Link className="site-header__nav-link site-header__nav-link--primary" href="/">
                RigForge <Icon name="arrow" size={15} />
              </Link>
            </>
          ) : (
            <>
              <a className="site-header__nav-link site-header__nav-link--home-secondary" href="#cara-kerja">Cara kerja</a>
              <a className="site-header__nav-link site-header__nav-link--primary" href="#konverter">Buka konverter <Icon name="arrow" size={15} /></a>
              <Link className="site-header__nav-link" href="/relay">Relay <Icon name="arrow" size={15} /></Link>
            </>
          )}
        </nav>

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
