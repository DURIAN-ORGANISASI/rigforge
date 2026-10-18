"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Icon } from "@/components/Icon";
import { ConfigPanel } from "@/components/relay/ConfigPanel";
import { Footer } from "@/components/relay/Footer";
import { SendPanel } from "@/components/relay/SendPanel";
import { useBotConfig } from "@/hooks/relay/useBotConfig";

export default function RelayWorkspace() {
  const config = useBotConfig();
  const { savedToken, savedChannelId, hasSavedConfig, status, lastCheck } = config;
  const [message, setMessage] = useState("");

  return (
    <div className="relay-app min-h-screen">
      <Header variant="relay" />

      <main id="konten-relay" tabIndex={-1}>
        <section className="relay-intro" aria-labelledby="relay-intro-title">
          <div className="container">
            <div className="relay-intro__panel">
              <div className="relay-intro__copy">
                <p className="relay-intro__eyebrow"><span />DISCORD WORKSPACE / BOT API</p>
                <h1 className="relay-intro__title" id="relay-intro-title">
                  Pesan Discord, <span>lebih teratur.</span>
                </h1>
                <p className="relay-intro__description">
                  Siapkan Bot Token resmi, pilih channel tujuan, uji aksesnya, lalu kirim pesan
                  melalui satu workspace yang jelas. Status, validasi, dan riwayat sesi membantu
                  kamu memantau alurnya tanpa berpindah-pindah alat.
                </p>
                <div className="relay-intro__proof" aria-label="Karakteristik Relay">
                  <span><i />Konfigurasi di browser</span>
                  <span><i />Tes channel sebelum mengirim</span>
                  <span><i />Menggunakan Discord Bot API</span>
                </div>
              </div>

              <div className="relay-intro__visual" role="img" aria-label="Ilustrasi workspace Relay untuk memilih channel dan mengirim pesan">
                <div className="relay-console">
                  <div className="relay-console__top">
                    <span className="relay-console__dots" aria-hidden="true"><i /><i /><i /></span>
                    <span>relay / dispatch</span>
                    <span className="relay-console__ready">READY</span>
                  </div>
                  <div className="relay-console__body">
                    <div className="relay-console__route">
                      <span className="relay-console__route-mark">#</span>
                      <span className="relay-console__route-copy">
                        <small>DESTINATION</small>
                        <strong>Selected Discord channel</strong>
                      </span>
                      <span className="relay-console__status">VERIFIED</span>
                    </div>
                    <div className="relay-console__message">
                      <span>dispatch.message(</span><br />
                      <strong>&nbsp;&nbsp;channel = selectedChannel,</strong><br />
                      <strong>&nbsp;&nbsp;content = messagePayload</strong><br />
                      <span>)</span>
                    </div>
                  </div>
                  <div className="relay-console__bottom">
                    <span>REQUEST PIPELINE</span>
                    <strong>CLIENT → API → DISCORD</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="relay-workspace" className="section section--tool" aria-labelledby="relay-workspace-title">
          <div className="container">
            <div className="workspace-heading">
              <div className="workspace-heading__copy">
                <p className="section-kicker">RELAY WORKSPACE</p>
                <h2 id="relay-workspace-title">Konfigurasi bot dan pengiriman pesan</h2>
                <p>Atur kredensial dan slot channel di panel kiri. Uji akses sebelum mengirim pesan dari panel kanan.</p>
              </div>
              <span className="workspace-heading__status">
                <Icon name="check" size={15} /> Discord Bot API
              </span>
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
