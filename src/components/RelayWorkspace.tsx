"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Icon } from "@/components/Icon";
import { ConfigPanel } from "@/components/relay/ConfigPanel";
import { Footer } from "@/components/relay/Footer";
import { SendPanel } from "@/components/relay/SendPanel";
import { StatusStrip } from "@/components/relay/StatusStrip";
import { useBotConfig } from "@/hooks/relay/useBotConfig";

export default function RelayWorkspace() {
  const config = useBotConfig();
  const { savedToken, savedChannelId, hasSavedConfig, status, lastCheck, slots, activeSlotId } = config;
  const [message, setMessage] = useState("");

  const activeSlot = slots.find((slot) => slot.id === activeSlotId);
  const activeLabel = activeSlot?.label.trim() || `Slot ${activeSlotId}`;
  const activeTail = activeSlot?.channelId.trim() ?? "";
  const slotText = activeTail ? `${activeLabel} — …${activeTail.slice(-6)}` : `${activeLabel} (kosong)`;

  return (
    <div className="relay-app min-h-screen">
      <Header variant="relay" />

      <main id="konten-relay" tabIndex={-1}>
        <section className="hero" aria-labelledby="relay-hero-title">
          <div className="container">
            <div className="hero__surface">
              <div className="hero__copy">
                <p className="hero__eyebrow">
                  <span className="hero__eyebrow-dot" aria-hidden="true" />
                  TOOLING UNTUK DISCORD
                </p>
                <h2 className="hero__title" id="relay-hero-title">
                  Kirim pesan Discord dengan <span>lebih teratur.</span>
                </h2>
                <p className="hero__description">
                  Kelola konfigurasi bot, pilih channel tujuan, lalu kirim pesan melalui Discord Bot API resmi.
                  Bukan self-bot dan bukan token akun pribadi.
                </p>

                <div className="hero__actions">
                  <a className="hero__cta hero__cta--primary" href="#relay-config">
                    Mulai mengirim <Icon name="arrow" size={18} />
                  </a>
                  <a className="hero__cta hero__cta--secondary" href="#relay-workspace">
                    Konfigurasi bot
                  </a>
                </div>

                <div className="hero__proof" aria-label="Keunggulan Relay">
                  <span className="hero__proof-item">
                    <span className="hero__proof-icon"><Icon name="check" size={14} /></span>
                    Bot resmi Discord
                  </span>
                  <span className="hero__proof-item">
                    <span className="hero__proof-icon"><Icon name="check" size={14} /></span>
                    10 slot channel
                  </span>
                  <span className="hero__proof-item">
                    <span className="hero__proof-icon"><Icon name="check" size={14} /></span>
                    Token tidak disimpan di database
                  </span>
                </div>
              </div>

              <div className="hero__visual" role="img" aria-label="Ilustrasi konfigurasi bot dan pengiriman pesan Discord">
                <div className="hero__window">
                  <div className="hero__window-top">
                    <div className="hero__window-brand">
                      <span className="hero__window-mark"><Icon name="prompt" size={16} /></span>
                      <span>RELAY <span className="hero__window-slash">/</span> WORKSPACE</span>
                    </div>
                    <span className="hero__local-pill"><span /> BOT API</span>
                  </div>

                  <div className="hero__preview-flow">
                    <div className="hero__mini-card hero__mini-card--input">
                      <div className="hero__mini-head">
                        <span className="hero__mini-icon"><Icon name="prompt" size={15} /></span>
                        <div>
                          <span className="hero__mini-label">01 / CONFIG</span>
                          <strong>Konfigurasi Bot</strong>
                        </div>
                        <span className="hero__mini-tag">BOT</span>
                      </div>
                      <div className="hero__data-list">
                        <div><span>Bot Token</span><code>••••••••••••</code></div>
                        <div><span>Channel ID</span><code>1234…5678</code></div>
                        <div><span>Slot aktif</span><code>Slot 01</code></div>
                        <div><span>Status</span><code>Ready</code></div>
                      </div>
                      <div className="hero__mini-foot"><span className="hero__tiny-dot" /> Siap dikonfigurasi</div>
                    </div>

                    <div className="hero__flow-arrow" aria-hidden="true">
                      <Icon name="arrow" size={20} />
                    </div>

                    <div className="hero__mini-card hero__mini-card--output">
                      <div className="hero__mini-head">
                        <span className="hero__mini-icon"><Icon name="brackets" size={15} /></span>
                        <div>
                          <span className="hero__mini-label">02 / OUTPUT</span>
                          <strong>Pesan Discord</strong>
                        </div>
                        <span className="hero__mini-tag">API</span>
                      </div>
                      <pre className="hero__code"><code>{`{
  "channel": "…5678",
  "message": "Halo!",
  "method": "POST",
  "status": "ready"
}`}</code></pre>
                      <div className="hero__mini-foot"><span className="hero__tiny-dot" /> Siap dikirim</div>
                    </div>
                  </div>

                  <div className="hero__window-bottom">
                    <span>BOT CONFIG <span>→</span> DISCORD MESSAGE</span>
                    <span className="hero__window-status"><Icon name="check" size={12} /> READY TO SEND</span>
                  </div>
                </div>
                <div className="hero__visual-note"><span /> Pratinjau ilustratif · token disamarkan</div>
              </div>
            </div>
          </div>
        </section>

        <section id="relay-workspace" className="section section--tool" aria-labelledby="relay-workspace-title">
          <div className="container">
            <div className="workspace-heading">
              <div className="workspace-heading__copy">
                <p className="section-kicker">RELAY WORKSPACE</p>
                <h2 id="relay-workspace-title">Konfigurasi &amp; kirim pesan</h2>
                <p>Atur Bot Token dan channel tujuan, periksa status koneksi, lalu kirim pesan.</p>
              </div>
              <span className="workspace-heading__status">
                <Icon name="check" size={15} /> Discord Bot API
              </span>
            </div>

            <div id="relay-config" className="relay-status-wrap">
              <StatusStrip status={status} slotText={slotText} charCount={message.length} />
            </div>

            <div className="bench relay-bench">
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
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
