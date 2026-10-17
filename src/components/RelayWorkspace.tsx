"use client";

import Link from "next/link";
import { useState } from "react";
import { ConfigPanel } from "@/components/relay/ConfigPanel";
import { Footer } from "@/components/relay/Footer";
import { SendPanel } from "@/components/relay/SendPanel";
import { StatusStrip } from "@/components/relay/StatusStrip";
import { ThemeToggle } from "@/components/relay/ThemeToggle";
import { useBotConfig } from "@/hooks/relay/useBotConfig";

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
                <path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" />
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
            <p className="relay-hero__eyebrow"><span aria-hidden="true" /> TOOLING UNTUK DISCORD</p>
            <h1 id="relay-hero-title" className="relay-hero__title">
              Kirim pesan Discord dengan <span>lebih teratur.</span>
            </h1>
            <p className="relay-hero__description">
              Kelola konfigurasi bot, pilih channel tujuan, lalu kirim pesan lewat Discord Bot API resmi.
              Bukan self-bot dan bukan token akun pribadi.
            </p>
            <div className="relay-hero__actions">
              <a href="#relay-workspace" className="relay-hero__cta relay-hero__cta--primary">Mulai mengirim <span aria-hidden="true">→</span></a>
              <a href="#relay-config" className="relay-hero__cta relay-hero__cta--secondary">Konfigurasi bot</a>
            </div>
            <div className="relay-hero__proof">
              <span><i aria-hidden="true">✓</i> Bot resmi Discord</span>
              <span><i aria-hidden="true">✓</i> 10 slot channel</span>
              <span><i aria-hidden="true">✓</i> Token tidak disimpan di database</span>
            </div>
          </div>

          <div className="relay-hero__visual" aria-label="Pratinjau alur pengiriman pesan">
            <div className="relay-preview">
              <div className="relay-preview__top">
                <span className="relay-preview__brand"><b>➤</b> RELAY <i>/ WORKSPACE</i></span>
                <span className="relay-preview__live"><i /> BOT API</span>
              </div>
              <div className="relay-preview__body">
                <div className="relay-preview__card">
                  <div className="relay-preview__cardhead"><b>01 / CONFIG</b><strong>Konfigurasi Bot</strong></div>
                  <div className="relay-preview__field"><span>Bot Token</span><code>••••••••••••••••</code></div>
                  <div className="relay-preview__field"><span>Channel ID</span><code>1234…5678</code></div>
                  <div className="relay-preview__state"><i /> Slot siap dikonfigurasi</div>
                </div>
                <div className="relay-preview__arrow" aria-hidden="true">→</div>
                <div className="relay-preview__card relay-preview__card--message">
                  <div className="relay-preview__cardhead"><b>02 / OUTPUT</b><strong>Pesan Discord</strong></div>
                  <div className="relay-preview__message">
                    <span>Halo, channel!</span><span>Informasi terbaru sudah tersedia.</span><span>✓ Pesan siap dikirim</span>
                  </div>
                  <div className="relay-preview__state"><i /> Discord Bot API</div>
                </div>
              </div>
              <div className="relay-preview__bottom"><span>BOT CONFIG <b>→</b> DISCORD MESSAGE</span><strong>● READY TO SEND</strong></div>
            </div>
            <p className="relay-hero__visual-note"><i /> Pratinjau ilustratif · token tidak ditampilkan</p>
          </div>
        </section>

        <section className="relay-workspace-section" id="relay-workspace" aria-labelledby="relay-workspace-title">
          <div className="relay-workspace-heading">
            <div><p>RELAY WORKSPACE</p><h2 id="relay-workspace-title">Konfigurasi &amp; kirim pesan</h2><span>Atur tujuan pesan, periksa status bot, lalu kirim ke channel yang dipilih.</span></div>
          </div>
          <div id="relay-config"><StatusStrip status={status} slotText={slotText} charCount={message.length} /></div>
          <div className="relay-workspace-grid">
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
        </section>
        <Footer />
      </main>
    </div>
  );
}
