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

            <div id="relay-config" />

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
