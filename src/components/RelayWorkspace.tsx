"use client";

import Link from "next/link";
import { useState } from "react";
import { ConfigPanel } from "@/components/relay/ConfigPanel";
import { Footer } from "@/components/relay/Footer";
import { SendPanel } from "@/components/relay/SendPanel";
import { StatusStrip } from "@/components/relay/StatusStrip";
import { ThemeToggle } from "@/components/relay/ThemeToggle";
import { useBotConfig } from "@/hooks/relay/useBotConfig";

/** Relay shares the same header, container width, and hero rhythm as RigForge. */
export default function RelayWorkspace() {
  const config = useBotConfig();
  const { savedToken, savedChannelId, hasSavedConfig, status, lastCheck, slots, activeSlotId } = config;
  const [message, setMessage] = useState("");

  const activeSlot = slots.find((s) => s.id === activeSlotId);
  const activeLabel = activeSlot?.label.trim() || `Slot ${activeSlotId}`;
  const activeTail = activeSlot?.channelId.trim() ?? "";
  const slotText = activeTail ? `${activeLabel} — …${activeTail.slice(-6)}` : `${activeLabel} (kosong)`;

  return (
    <div className="relay-app min-h-screen">
      <header className="relay-site-header">
        <div className="relay-site-header__inner">
          <Link className="relay-brand" href="/" aria-label="Buka RigForge">
            <span className="relay-brand__mark" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m22 2-7 20-4-9-9-4Z" />
                <path d="M22 2 11 13" />
              </svg>
            </span>
            <span className="relay-brand__text">
              <span className="relay-brand__name">Relay</span>
              <span className="relay-brand__descriptor">Discord message tools</span>
            </span>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <main className="relay-page-shell">
        <section className="relay-hero" aria-labelledby="relay-hero-title">
          <div className="relay-hero__copy">
            <p className="relay-hero__eyebrow"><span aria-hidden="true" /> DISCORD WORKSPACE</p>
            <h1 id="relay-hero-title" className="relay-hero__title">Kirim pesan Discord dengan lebih teratur.</h1>
            <p className="relay-hero__description">
              Kelola konfigurasi bot, pilih channel tujuan, lalu kirim pesan lewat Discord Bot API resmi.
              Bukan self-bot dan bukan token akun pribadi.
            </p>
          </div>
          <div className="relay-hero__badge">BOT API <span>·</span> SERVER-SIDE</div>
        </section>

        <StatusStrip status={status} slotText={slotText} charCount={message.length} />

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
          <ConfigPanel config={config} />
          <SendPanel
            token={savedToken}
            channelId={savedChannelId}
            isActive={hasSavedConfig && status === "aktif"}
            channelName={lastCheck?.ok ? lastCheck.channelName : undefined}
            message={message}
            onMessageChange={setMessage}
          />
        </div>

        <Footer />
      </main>
    </div>
  );
}
