import type { Metadata } from "next";
import RelayWorkspace from "@/components/RelayWorkspace";

export const metadata: Metadata = {
  title: "Relay — Pengiriman Pesan Discord",
  description:
    "Konfigurasi Bot Token resmi, pilih channel tujuan, lalu kirim pesan ke Discord dengan aman melalui API server-side.",
};

export default function RelayPage() {
  return <RelayWorkspace />;
}
