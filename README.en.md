<div align="center">

<img src="docs/images/en/banner.svg" alt="RigForge — Roblox avatar data to Lua converter" width="100%">

# RigForge

**Turn Roblox avatar data into a Lua structure you can review.**

A browser-based avatar converter, with a separate workspace for sending Discord messages through the official Bot API.

<p>
  <a href="https://rigforge-mocha.vercel.app/"><img src="https://img.shields.io/badge/OPEN_RIGFORGE-Live-4C8DFF?style=for-the-badge&labelColor=0B1220" alt="Open RigForge"></a>
  <a href="https://rigforge-mocha.vercel.app/relay"><img src="https://img.shields.io/badge/OPEN_RELAY-Discord-4AD7E9?style=for-the-badge&labelColor=0B1220" alt="Open Relay"></a>
  <a href="README.md"><img src="https://img.shields.io/badge/Bahasa-Indonesia-9AB8FF?style=for-the-badge&labelColor=0B1220" alt="Read Indonesian"></a>
</p>

<p>
  <img src="https://img.shields.io/badge/Next.js-16-111827?logo=nextdotjs" alt="Next.js 16">
  <img src="https://img.shields.io/badge/React-19-087EA4?logo=react" alt="React 19">
  <img src="https://img.shields.io/badge/TypeScript-Strict-3178C6?logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tests-Vitest-6E9F18?logo=vitest&logoColor=white" alt="Vitest">
  <img src="https://img.shields.io/badge/Deploy-Vercel-111827?logo=vercel" alt="Vercel">
  <img src="https://img.shields.io/badge/License-MIT-16A879" alt="MIT License">
</p>

</div>

---

## Overview

RigForge is an independent web application that converts raw Roblox avatar data into a Lua structure you can review and copy into Roblox Studio. Avatar conversion runs in the browser; pasted conversion input is not sent to the RigForge server.

The same repository and deployment also include **Relay**, a separate workspace for configuring a Discord bot, checking channel access, and sending messages through a server-side API Route.

| Workspace | URL | Purpose |
| --- | --- | --- |
| **RigForge** | [Open converter](https://rigforge-mocha.vercel.app/) | Convert avatar tokens and AccessoryBlob data into Lua. |
| **Relay** | [Open Relay](https://rigforge-mocha.vercel.app/relay) | Configure a Bot Token, manage up to 10 channel slots, check access, and send messages. |

## Features

### RigForge — avatar converter
- **Automatic conversion.** Output updates when input changes, with a short debounce to keep typing and large pastes responsive.
- **Flexible input.** Recognizes text tokens such as Head: 123 and JSON following AccessoryBlob Data.
- **Structured output.** Maps IDs to body parts, classic clothing, layered clothing, and accessories.
- **Consistent slot templates.** Keeps minimum slots, fills unused slots with AssetId = 0, and adds rows for extra IDs.
- **Duplicate handling.** Repeated IDs within the same group are emitted once.
- **Quick actions.** Load sample data, reset input, force generation, and copy Lua to the clipboard.
- **Light and dark themes.** Uses the system preference on first visit and can be changed from the header.
- **Responsive UI.** Editor panels, navigation, and workflow guidance adapt to desktop, tablet, and mobile screens.

### Relay — Discord workspace
- Configure an official Discord Bot Token and up to 10 Channel ID slots.
- Label slots, select an active channel, and store configuration in the browser.
- Check channel access before sending.
- Send messages through the Discord Bot API with status feedback.
- Send whitespace-separated tokens/lines as separate messages, with optional code-block formatting.
- Handle Discord 429 rate limits with a wait and a bounded retry policy.
- View a short session history of successful sends.

## Preview

<table>
  <tr>
    <td width="50%" align="center">
      <img src="docs/images/preview-dark.png" alt="RigForge dark theme" width="100%">
      <sub>Dark theme</sub>
    </td>
    <td width="50%" align="center">
      <img src="docs/images/preview-light.png" alt="RigForge light theme" width="100%">
      <sub>Light theme</sub>
    </td>
  </tr>
</table>

> Static preview images may differ from the deployed site after interface updates.

## Using RigForge

1. Open [RigForge](https://rigforge-mocha.vercel.app/).
2. Paste avatar data into **Data mentah** (raw data), or select **Contoh Data** (sample data).
3. Wait for automatic conversion or select **Generate Paksa** to convert immediately.
4. Review the output in **Hasil Lua**.
5. Select **Salin Kode**, then paste and test the script in Roblox Studio.
6. Use **Reset** to clear the input.

### Supported input formats

The parser searches the full input and is case-insensitive.

| Category | Example | Notes |
| --- | --- | --- |
| Body parts | Head, Torso, LeftArm, RightArm, LeftLeg, RightLeg | DynamicHead replaces Head when present. |
| Classic clothing | Pants, Shirt, TShirt | T-Shirt and Tshirt variants are also recognized. |
| Skin tone | Body Color: 242,215,205 (#F2D7CD) | A hex value in parentheses takes priority. |
| Accessories | Hat, HairAccessory, FaceAccessory, FrontAccessory, NeckAccessory, BackAccessory, ShoulderAccessory, WaistAccessory | Multiple IDs can be comma-separated. |
| AccessoryBlob | AccessoryBlob Data followed by a JSON array | Items use AccessoryType and AssetId properties. |

When token data and AccessoryBlob specify the same category, token values are processed first, followed by JSON items. Invalid blob JSON is ignored so other input can still be processed; diagnostics are written to the browser console.

### Slot templates

Minimum slot counts are defined by LAYERED_GROUPS and ACCESSORY_GROUPS in src/lib/converter.ts.

| Group | Minimum slots |
| --- | --- |
| Clothes.Layered | LeftShoe 2, RightShoe 2, TShirt 3, Shirt 3, Pants 3, Shorts 3, DressSkirt 3, Sweater 3, Jacket 4 |
| Accessories | Hat 3, Hair 3, Face 7, Front 3, Neck 3, Back 3, Shoulder 3, Waist 3 |

Unused slots use AssetId = 0. IDs beyond the minimum add rows to their existing group. Unrecognized accessory types receive a new group at the end of Accessories.

## Privacy and security

### Avatar processing
- RigForge conversion input is processed in the browser and is not sent to the RigForge server.
- Avatar input is not stored as application history.
- Review and test generated Lua in Roblox Studio before using it.

### Relay and Bot Tokens
- Relay configuration is stored in browser localStorage.
- Channel checks and message sends are forwarded through a Next.js API Route to Discord.
- Keep your Bot Token private. Use a token from the Discord Developer Portal and grant only the permissions you need.
- Personal-account tokens and self-bots are not supported.
- The bot can only send to channels it can access and that match the current configuration.

### Important limitations
- RigForge has no file-download action; copy the output and paste it manually.
- Conversion input is not retained after a page reload; sample data is loaded again.
- Relay send history exists only for the current session and is cleared on refresh.
- Relay sends real messages to Discord. Check the destination and payload before sending.
- Consider browser and device privacy when using the app on a shared computer.

## Run locally

### Requirements
- [Node.js 22.x](https://nodejs.org/)
- npm
- Git

### Install

~~~bash
git clone https://github.com/akndrn000/rigforge.git
cd rigforge
npm install
npm run dev
~~~

Open [http://localhost:3000](http://localhost:3000).

### Available scripts

| Command | Purpose |
| --- | --- |
| npm run dev | Start the Next.js development server. |
| npm run lint | Run ESLint checks. |
| npm run typecheck | Check TypeScript types without emitting files. |
| npm run test | Run unit tests with Vitest. |
| npm run build | Create a production build. |
| npm run start | Run the local production build. |

Run the checks before a release:

~~~bash
npm run lint
npm run typecheck
npm run test
npm run build
~~~

The standard workflow does not require additional environment variables. Testing Relay against Discord requires a valid Bot Token and a channel the bot can access.

## Project structure

~~~text
src/
├── app/
│   ├── api/discord/       # Discord check/send API Routes
│   ├── relay/             # Relay page
│   ├── globals.css        # Application base styles
│   ├── layout.tsx         # Metadata, fonts, and theme initialization
│   └── page.tsx           # Main page
├── components/            # UI and workspace components
├── hooks/                 # Theme and Relay configuration hooks
├── lib/
│   ├── converter.ts       # Avatar parser and Lua generator
│   ├── relay/             # Discord integration and Relay types
│   └── __fixtures__/      # Converter test fixtures
└── styles/                # Tokens and page styles

docs/                      # Design guide, images, and documentation
~~~

## Deploy to Vercel

1. Import akndrn000/rigforge into the [Vercel Dashboard](https://vercel.com/).
2. Let Vercel detect the Next.js framework.
3. Use Node.js 22, as defined by the project.
4. Deploy. The homepage and /relay are served by the same deployment.

Alternatively, use the CLI:

~~~bash
npx vercel
npx vercel --prod
~~~

After deployment, smoke-test the homepage, theme switch, avatar conversion, clipboard action, Relay configuration, channel checks, and message sending in a test channel.

## Contributing

Pull requests and bug reports are welcome. Include reproduction steps for UI or functional issues. For converter changes, include representative input/output and update src/lib/__fixtures__/golden.json when expected Lua output changes.

## License and trademarks

RigForge is released under the [MIT License](LICENSE).

RigForge is an independent project and is not affiliated with Roblox Corporation or Discord Inc. Roblox and Discord are trademarks of their respective owners.

---

<div align="center">

**RigForge** · Keep your avatar workflow clear and focused.

<sub>Built for structured conversion, practical controls, and a more comfortable workflow.</sub>

</div>
