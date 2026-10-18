import { NextResponse } from "next/server";
import { normalizeBotToken } from "../../../../lib/relay/token";
import type { CheckStatusResult } from "@/lib/relay/types";

interface DiscordMe { id: string; username: string; discriminator?: string; bot?: boolean; }
interface DiscordChannel { id: string; name?: string; guild_id?: string; type?: number; }
interface DiscordGuild { id: string; name?: string; }

function bad(message: string, status = 400, extra: Partial<CheckStatusResult> = {}): NextResponse<CheckStatusResult> {
  return NextResponse.json({ ...extra, ok: false, status: "gagal", error: message }, { status });
}

function discordError(status: number, context: "bot" | "channel"): string {
  if (status === 401) return "Discord menolak Bot Token (401 Unauthorized). Pastikan token berasal dari Developer Portal → Bot. Token yang ditempel boleh berupa token mentah atau diawali 'Bot '.";
  if (status === 403) return context === "bot"
    ? "Discord menolak kredensial bot (403 Forbidden). Buat ulang Bot Token resmi dari Discord Developer Portal."
    : "Bot Token valid, tetapi bot tidak dapat mengakses channel ini (403 Forbidden). Pastikan bot berada di server yang benar dan memiliki izin View Channel.";
  if (status === 404) return context === "channel"
    ? "Bot Token valid, tetapi channel tidak ditemukan atau tidak dapat dilihat (404). Periksa Channel ID dan pastikan bot berada di server tersebut."
    : "Endpoint Discord tidak ditemukan (404). Coba lagi nanti.";
  if (status === 429) return "Discord membatasi permintaan (429). Tunggu beberapa detik lalu coba lagi.";
  if (status >= 500) return "Server Discord sedang bermasalah. Token belum tentu salah; coba lagi sebentar.";
  return "Discord mengembalikan status " + status + ". Periksa detail konfigurasi lalu coba lagi.";
}

export async function POST(req: Request): Promise<NextResponse<CheckStatusResult>> {
  let body: { token?: unknown; channelId?: unknown };
  try {
    body = (await req.json()) as { token?: unknown; channelId?: unknown };
  } catch {
    return bad("Body request harus JSON valid berisi { token, channelId }.");
  }

  const token = normalizeBotToken(body.token);
  const channelId = typeof body.channelId === "string" ? body.channelId.trim() : "";
  if (!token) return bad("Bot Token wajib diisi.");

  const headers = { Authorization: "Bot " + token };

  // Validate the Bot Token independently of the channel configuration.
  let meRes: Response;
  try {
    meRes = await fetch("https://discord.com/api/v10/users/@me", { headers });
  } catch {
    return bad("Server Relay tidak dapat menghubungi Discord. Ini tidak membuktikan token salah; coba lagi.", 502);
  }

  if (!meRes.ok) {
    return bad(
      discordError(meRes.status, "bot"),
      meRes.status === 429 ? 429 : meRes.status >= 500 ? 502 : 400,
      { tokenValid: false, channelChecked: false },
    );
  }

  let me: DiscordMe;
  try {
    me = (await meRes.json()) as DiscordMe;
  } catch {
    return bad("Discord mengirim respons identitas yang tidak dapat dibaca. Coba lagi.", 502);
  }

  if (me.bot !== true) {
    return bad(
      "Kredensial dikenali, tetapi bukan Bot Token resmi. Gunakan token dari Developer Portal → Bot.",
      400,
      { tokenValid: false, channelChecked: false },
    );
  }

  const botInfo = {
    tokenValid: true,
    botId: me.id,
    botUsername: me.discriminator && me.discriminator !== "0" ? me.username + "#" + me.discriminator : me.username,
  };

  // An empty Channel ID is a valid token-only check.
  if (!channelId) {
    return NextResponse.json({ ok: true, status: "aktif", ...botInfo, channelChecked: false });
  }

  if (!/^\d{5,}$/.test(channelId)) {
    return bad("Bot Token valid, tetapi format Channel ID salah. Channel ID hanya berisi angka.", 400, {
      ...botInfo, channelChecked: false,
    });
  }

  let chRes: Response;
  try {
    chRes = await fetch(
      "https://discord.com/api/v10/channels/" + encodeURIComponent(channelId),
      { headers },
    );
  } catch {
    return bad("Bot Token valid, tetapi server Relay gagal menghubungi Discord untuk memeriksa channel. Coba lagi.", 502, {
      ...botInfo, channelChecked: false,
    });
  }

  if (!chRes.ok) {
    return bad(
      discordError(chRes.status, "channel"),
      chRes.status === 429 ? 429 : chRes.status >= 500 ? 502 : 400,
      { ...botInfo, channelChecked: false },
    );
  }

  let channel: DiscordChannel;
  try {
    channel = (await chRes.json()) as DiscordChannel;
  } catch {
    return bad("Bot Token valid, tetapi respons data channel dari Discord tidak dapat dibaca.", 502, {
      ...botInfo, channelChecked: false,
    });
  }

  let guildName: string | undefined;
  if (channel.guild_id) {
    try {
      const gRes = await fetch(
        "https://discord.com/api/v10/guilds/" + encodeURIComponent(channel.guild_id),
        { headers },
      );
      if (gRes.ok) guildName = ((await gRes.json()) as DiscordGuild).name;
    } catch {
      // Guild name is optional metadata and must not change the connection result.
    }
  }

  return NextResponse.json({
    ok: true, status: "aktif", ...botInfo, channelChecked: true,
    channelName: channel.name, guildName,
  });
}
