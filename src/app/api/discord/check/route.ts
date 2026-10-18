import { NextResponse } from "next/server";
import { normalizeBotToken } from "../../../../lib/relay/token";
import type { CheckStatusResult } from "@/lib/relay/types";

interface DiscordMe { id: string; username: string; discriminator?: string; bot?: boolean; }
interface DiscordChannel { id: string; name?: string; guild_id?: string; type?: number; }
interface DiscordGuild { id: string; name?: string; }

function bad(message: string, status = 400, extra: Partial<CheckStatusResult> = {}): NextResponse<CheckStatusResult> {
  return NextResponse.json({ ...extra, ok: false, status: "gagal", error: message }, { status });
}

function discordError(
  status: number,
  context: "bot" | "channel",
  code?: number,
  apiMessage?: string,
): string {
  if (status === 401) {
    return "Discord menolak Bot Token (401 Unauthorized). Gunakan token dari Developer Portal → Bot. Token boleh ditempel dengan atau tanpa prefix 'Bot '.";
  }
  if (status === 403 && context === "bot") {
    return "Discord menolak kredensial bot (403 Forbidden). Buat ulang Bot Token resmi dari Developer Portal.";
  }
  if (status === 403 && context === "channel") {
    if (code === 50001 || /missing access/i.test(apiMessage ?? "")) {
      return "Discord mengembalikan Missing Access (50001). Token valid, tetapi bot ini tidak dapat melihat channel. Pastikan bot yang cocok dengan token ini sudah diundang ke server yang benar, Channel ID benar, dan izin View Channel tidak ditolak oleh permission override.";
    }
    if (code === 50013 || /missing permissions/i.test(apiMessage ?? "")) {
      return "Discord mengembalikan Missing Permissions (50013). Token valid, tetapi bot tidak memiliki izin yang diperlukan. Izinkan View Channel dan Send Messages pada channel tersebut.";
    }
    return "Discord menolak akses channel (HTTP 403" + (code ? ", code " + code : "") + "). Token valid. Periksa server/channel tujuan dan izin bot.";
  }
  if (status === 404 && context === "channel") {
    return code === 10003
      ? "Discord mengembalikan Unknown Channel (10003). Periksa bahwa ID yang disimpan adalah Channel ID, bukan Server ID atau Message ID."
      : "Bot Token valid, tetapi Discord tidak menemukan channel ini. Periksa Channel ID dan pastikan bot berada di server yang sama.";
  }
  if (status === 404) return "Endpoint Discord tidak ditemukan (404). Coba lagi nanti.";
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
  // The bot user ID is also used as the OAuth2 client_id for this bot invite.
  // This link requests only channel view + send-message defaults (1024 + 2048).
  const inviteUrl = "https://discord.com/oauth2/authorize?client_id=" +
    encodeURIComponent(me.id) + "&scope=bot&permissions=3072";

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
    let apiError: { code?: unknown; message?: unknown } = {};
    try {
      apiError = (await chRes.json()) as { code?: unknown; message?: unknown };
    } catch {
      // Keep status-based diagnostics if Discord did not return JSON.
    }
    const discordCode = typeof apiError.code === "number" ? apiError.code : undefined;
    const apiMessage = typeof apiError.message === "string" ? apiError.message : undefined;
    return bad(
      discordError(chRes.status, "channel", discordCode, apiMessage),
      chRes.status === 429 ? 429 : chRes.status >= 500 ? 502 : 400,
      {
        ...botInfo,
        channelChecked: false,
        discordCode,
        inviteUrl: chRes.status === 403 ? inviteUrl : undefined,
      },
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
