<div align="center">

<img src="docs/images/en/banner.svg" alt="RigForge — Roblox avatar to Lua converter" width="100%">

<p><strong>Convert Roblox avatar data into a structured Lua output, right in your browser.</strong><br>
<sub>Includes Relay, a workspace for Discord bot configuration and message delivery.</sub></p>

<p>
  <a href="https://rigforge-mocha.vercel.app/"><img src="https://img.shields.io/badge/OPEN_RIGFORGE-4C8DFF?style=for-the-badge&labelColor=0B1220" alt="Open RigForge"></a>
  <a href="https://rigforge-mocha.vercel.app/relay"><img src="https://img.shields.io/badge/OPEN_RELAY-4AD7E9?style=for-the-badge&labelColor=0B1220" alt="Open Relay"></a>
  <a href="README.md"><img src="https://img.shields.io/badge/DOCUMENTATION-Bahasa_Indonesia-9AB8FF?style=for-the-badge&labelColor=0B1220" alt="Documentation in Indonesian"></a>
</p>

<p>
  <a href="https://github.com/akndrn000/rigforge/actions/workflows/verify.yml"><img src="https://github.com/akndrn000/rigforge/actions/workflows/verify.yml/badge.svg?branch=main" alt="CI status"></a>
  <img src="https://img.shields.io/badge/Node.js-22.x-339933?logo=nodedotjs&logoColor=white" alt="Node.js 22">
  <img src="https://img.shields.io/badge/Next.js-16-111827?logo=nextdotjs" alt="Next.js 16">
  <img src="https://img.shields.io/badge/React-19-087EA4?logo=react" alt="React 19">
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-4AD7B1?labelColor=0B1220" alt="MIT License"></a>
</p>

</div>

---

## Contents

- [Project overview](#project-overview)
- [Workspaces](#workspaces)
- [Features](#features)
- [How to use](#how-to-use)
- [Input format](#input-format)
- [Privacy and security](#privacy-and-security)
- [Run locally](#run-locally)
- [Project structure](#project-structure)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Project overview

**RigForge** is an independent web application that converts raw Roblox avatar data into a structured Lua output you can review and copy into Roblox Studio. Avatar conversion runs in the browser and requires no account.

The same repository also includes **Relay**, a separate workspace for keeping bot configuration in the browser, checking channel access, and sending messages through the Discord Bot API.

## Workspaces

<table>
  <tr>
    <td width="50%" valign="top">
      <h3>RigForge / Avatar → Lua</h3>
      <p>Convert avatar tokens and <code>AccessoryBlob</code> data into structured Lua output.</p>
      <ul>
        <li>Automatic conversion and Force Generate</li>
        <li>Slot templates for clothing and accessories</li>
        <li>Sample data, reset, and copy actions</li>
        <li>Local browser processing</li>
      </ul>
      <a href="https://rigforge-mocha.vercel.app/">Open RigForge ↗</a>
    </td>
    <td width="50%" valign="top">
      <h3>Relay / Discord</h3>
      <p>A workspace for configuring a Bot Token, choosing a destination channel, and sending messages.</p>
      <ul>
        <li>Up to 10 Channel ID slots</li>
        <li>Access checks before sending</li>
        <li>Separate messages and code-block option</li>
        <li>Delivery feedback and session history</li>
      </ul>
      <a href="https://rigforge-mocha.vercel.app/relay">Open Relay ↗</a>
    </td>
  </tr>
</table>

## Features

### Avatar converter

- **Two input formats:** text tokens such as `Head: 12345` and JSON following `AccessoryBlob Data:`.
- **Consistent output:** IDs are grouped into body parts, classic clothing, layered clothing, and accessories.
- **Automatic slots:** minimum slots remain available, empty slots use `AssetId = 0`, and extra IDs extend their group.
- **Duplicate handling:** repeated IDs within the same group are emitted once.
- **Fast workflow:** load sample data, reset, regenerate, and copy Lua output.
- **Light/dark themes** and a responsive layout for desktop and mobile.

### Relay

- Stores bot configuration in browser `localStorage` and supports up to 10 channel slots.
- Checks channel access through the Discord Bot API before sending.
- Sends whitespace-separated tokens/lines as individual messages, with optional code-block formatting.
- Handles Discord `429` rate limits with a wait and a bounded retry policy.
- Shows delivery feedback and a short history for the active session.

## How to use

### RigForge

1. Open [RigForge](https://rigforge-mocha.vercel.app/).
2. Paste avatar data into **Data mentah** (raw data), or select **Contoh Data** (sample data).
3. The **Hasil Lua** output updates automatically. Use **Generate Paksa** to run conversion immediately.
4. Review the output and select **Salin Kode** (copy code).
5. Paste and test the script in Roblox Studio before using it.

### Relay

1. Open [Relay](https://rigforge-mocha.vercel.app/relay).
2. Paste a Bot Token from the Discord Developer Portal.
3. Set a label and Channel ID, then select the active slot.
4. Test the connection and channel access.
5. Write the message, verify the destination, then send.

> Relay can send real messages. Test in a safe channel and verify the bot has the correct permissions.

## Input format

The parser searches the full text and is case-insensitive. Example:

```text
Head: 12345
Torso: 23456
Pants: 34567
HairAccessory: 45678, 56789
Body Color: 242,215,205 (#F2D7CD)
```

| Group | Example tokens |
| --- | --- |
| Body parts | `Head`, `Torso`, `LeftArm`, `RightArm`, `LeftLeg`, `RightLeg` |
| Classic clothing | `Pants`, `Shirt`, `TShirt` |
| Skin tone | `Body Color` with RGB or hex values |
| Accessories | `Hat`, `HairAccessory`, `FaceAccessory`, `FrontAccessory`, `NeckAccessory`, `BackAccessory`, `ShoulderAccessory`, `WaistAccessory` |
| JSON data | `AccessoryBlob Data:` followed by a JSON array |

When present, `DynamicHead` replaces `Head`. Minimum slot counts are defined in `LAYERED_GROUPS` and `ACCESSORY_GROUPS` in `src/lib/converter.ts`. Extra IDs add rows; unrecognized accessory types create a new group.

## Privacy and security

- **RigForge:** avatar input is processed in the browser and is not sent to the RigForge conversion server.
- **Relay:** bot configuration is stored in browser `localStorage`. Channel checks and message delivery are forwarded through a Next.js API Route to Discord.
- Keep your Bot Token private. Never share it in issues, public screenshots, or messages.
- Use an official token from the Discord Developer Portal; personal-account tokens and self-bots are not supported.
- Review and test generated Lua in Roblox Studio before use.

On shared devices, clear site data after use so browser-stored configuration is not left behind.

## Run locally

**Requirements:** Node.js 22.x, npm, and Git.

```bash
git clone https://github.com/akndrn000/rigforge.git
cd rigforge
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Development commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server. |
| `npm run lint` | Run ESLint. |
| `npm run typecheck` | Check TypeScript types. |
| `npm run test` | Run Vitest unit tests. |
| `npm run build` | Create a production build. |
| `npm run start` | Run the local production build. |

Pre-release checks:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

The standard workflow does not require additional environment variables. Testing Relay against Discord requires a valid Bot Token and a channel the bot can access.

## Project structure

```text
src/
├── app/                 # Next.js pages and API Routes
├── components/          # RigForge and Relay UI components
├── hooks/               # Theme and Relay configuration
├── lib/
│   ├── converter.ts     # Avatar parser and Lua generator
│   ├── relay/           # Discord integration and types
│   └── __fixtures__/    # Converter test fixtures
└── styles/              # Design tokens and UI styles
docs/                    # Guides, diagrams, and documentation assets
```

## Deployment

### Vercel

1. Import `akndrn000/rigforge` in [Vercel](https://vercel.com/).
2. Confirm Next.js is detected and Node.js 22.x is selected.
3. Deploy. RigForge and Relay are served from the same deployment.

For a production deployment with the CLI:

```bash
npx vercel --prod
```

After deployment, test conversion, clipboard copying, theme switching, Relay configuration, channel checks, and sending to a test channel.

## Contributing

Issues and pull requests are welcome. Include clear reproduction steps for bugs. For parser or generator changes, add representative input/output and update `src/lib/__fixtures__/golden.json` when expected output changes.

## License

RigForge is released under the [MIT License](LICENSE). It is an independent project and is not affiliated with Roblox Corporation or Discord Inc. Roblox and Discord are trademarks of their respective owners.

---

<div align="center">
  <sub>Built to keep avatar conversion and message delivery clear, structured, and practical.</sub>
</div>
