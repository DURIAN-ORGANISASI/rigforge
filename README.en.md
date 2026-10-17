<div align="center">

<img src="docs/images/en/banner.svg" alt="RigForge — Roblox avatar data to Lua script converter" width="100%">

<p><strong>Turn Roblox avatar data into Lua script you can review and copy into Roblox Studio.</strong><br>
Conversion runs in your browser; pasted avatar data is not sent to the RigForge server.</p>

<p>
  <a href="https://rigforge-mocha.vercel.app/"><img src="https://img.shields.io/badge/Open_RigForge-demo-6C63FF?style=for-the-badge&labelColor=111827" alt="Open RigForge demo"></a>
  <a href="https://rigforge-mocha.vercel.app/relay"><img src="https://img.shields.io/badge/Open_Relay-Discord-5865F2?style=for-the-badge&labelColor=111827" alt="Open Relay"></a>
  <a href="README.md"><img src="https://img.shields.io/badge/Baca_dalam-Bahasa_Indonesia-38BDF8?style=for-the-badge&labelColor=111827" alt="Read in Indonesian"></a>
</p>

<p>
  <img src="https://img.shields.io/badge/Next.js-App_Router-111827?logo=nextdotjs" alt="Next.js">
  <img src="https://img.shields.io/badge/React-19-087EA4?logo=react" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tests-Vitest-6E9F18?logo=vitest&logoColor=white" alt="Vitest">
  <img src="https://img.shields.io/badge/Deploy-Vercel-111827?logo=vercel" alt="Vercel">
</p>

</div>

---

## ✦ What is RigForge?

RigForge is a web tool that converts raw Roblox avatar data into a Lua script structure you can use as a starting point in Roblox Studio. Paste the data, review the generated output, then copy the code.

The same repository and deployment also include **Relay**, a separate workspace for checking channel access and sending Discord messages with an official Bot Token.

| Workspace | Purpose |
| --- | --- |
| **RigForge — `/`** | Reads avatar tokens and `AccessoryBlob` data, then generates a Lua structure. |
| **Relay — `/relay`** | Stores bot configuration in the browser, checks channel access, and forwards messages through an API Route to Discord. |

## Key features

- **Automatic conversion** — Lua output updates when the input changes; a Force Generate action is also available.
- **Two input formats** — tokens such as `Head: 123` and JSON following `AccessoryBlob Data:` can be used together.
- **Consistent template** — each group has a minimum slot count; unused slots use `AssetId = 0`, and extra IDs create additional rows.
- **Duplicate handling** — duplicate IDs within the same section are written once.
- **Copy to clipboard** — copy the complete result and paste it manually into Roblox Studio.
- **Light and dark themes** — follow the system preference or switch from the interface.
- **Discord Relay** — official Bot Token configuration, up to 10 channel slots, access checks, message sending, and session history.

## Application preview

<table>
  <tr>
    <td width="50%" align="center"><img src="docs/images/preview-dark.png" alt="RigForge interface in dark mode" width="100%"><br><sub>Dark mode</sub></td>
    <td width="50%" align="center"><img src="docs/images/preview-light.png" alt="RigForge interface in light mode" width="100%"><br><sub>Light mode</sub></td>
  </tr>
</table>

## How to use

<img src="docs/images/en/workflow.svg" alt="Four steps: paste data, convert, review the output, and copy into Roblox Studio" width="100%">

1. Open [RigForge](https://rigforge-mocha.vercel.app/). Sample Data loads automatically.
2. Paste avatar data into the **Data mentah** (raw data) panel. Select **Reset** first to start from an empty input.
3. Review the **Hasil Lua** (Lua output) panel. Conversion runs automatically when input changes.
4. Use **Generate Paksa** (Force Generate) to run conversion immediately.
5. Review the body, clothing, and accessory sections, then select **Salin Kode** (Copy Code).
6. Paste the code into Roblox Studio and test it before use.

To open Relay, use the blue zigzag icon beside the workspace name. Relay and RigForge are part of the same app and deployment.

## Input format

The parser searches the full text and is case-insensitive.

| Data | Example token | Notes |
| --- | --- | --- |
| Body | `Head`, `Torso`, `LeftArm`, `RightArm`, `LeftLeg`, `RightLeg` | One ID per token. If present, `DynamicHead` replaces the `Head` value. |
| Classic clothing | `Pants`, `Shirt`, `TShirt` | The variants `T-Shirt` and `Tshirt` are also recognized. |
| Skin tone | `Body Color: 242,215,205 (#F2D7CD)` | A hex value in parentheses takes priority; the default is `Pastel orange`. |
| Accessories | `Hat`, `HairAccessory`, `FaceAccessory`, `FrontAccessory`, `NeckAccessory`, `BackAccessory`, `ShoulderAccessory`, `WaistAccessory` | Multiple IDs can be comma-separated. |
| AccessoryBlob | `AccessoryBlob Data:` followed by a JSON array | Items use `AccessoryType` and `AssetId`; they are placed into the matching group. |

Within each section, IDs from tokens are processed first, followed by items from the blob. Invalid blob JSON is ignored and logged in the browser console; the rest of the input is still converted.

## Universal slot template

Minimum slot counts are defined in `LAYERED_GROUPS` and `ACCESSORY_GROUPS` in `src/lib/converter.ts`.

<img src="docs/images/en/slot-template.svg" alt="Minimum slots, zero AssetId values for unused slots, and extra rows when IDs exceed the slot count" width="100%">

| Group | Minimum slots |
| --- | --- |
| `Clothes.Layered` | `LeftShoe` 2, `RightShoe` 2, `TShirt` 3, `Shirt` 3, `Pants` 3, `Shorts` 3, `DressSkirt` 3, `Sweater` 3, `Jacket` 4 |
| `Accessories` | `Hat` 3, `Hair` 3, `Face` 7, `Front` 3, `Neck` 3, `Back` 3, `Shoulder` 3, `Waist` 3 |

- IDs fill slots from the top; unused slots stay at `AssetId = 0`.
- Extra IDs add rows to the same group.
- An accessory type not in the template creates a new section at the end of `Accessories`.
- Duplicate IDs within one group are written once.
- Empty input clears the output panel.

Values such as `Scaling`, `Face`, `UserId`, and the default skin tone are hardcoded in the converter. If you change them, update the snapshot fixture at `src/lib/__fixtures__/golden.json` too.

## Privacy and security

<img src="docs/images/en/privacy.svg" alt="Separate data paths for RigForge and Relay" width="100%">

- **RigForge:** pasted avatar data is processed in the browser; conversion input is not sent to the server.
- **Relay:** bot configuration and 10 channel slots are stored in browser `localStorage`. Channel checks and message sends go through a Next.js API Route and are forwarded to Discord. The token is not stored in a database or application logs.
- Use an official Bot Token from the Discord Developer Portal; personal-account and self-bot tokens are not supported.
- The app uses no analytics or trackers. Fonts are self-hosted through Fontsource.
- `vercel.json` sets security headers including `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, and `Permissions-Policy`.

## Known limitations

- One avatar is processed at a time; a new result replaces the previous panel output.
- Conversion input is not saved. Sample Data is loaded again after a page reload.
- There is no download button; copy the output to the clipboard and paste it into Studio yourself.
- Review and test the result in Roblox Studio, especially when data comes from different sources.
- RigForge is an independent project and is not affiliated with Roblox Corporation.

## Run locally

Prerequisites: **Node.js 22** and npm.

```bash
git clone https://github.com/akndrn000/rigforge.git
cd rigforge
npm install
npm run dev
```

Open `http://localhost:3000`. Before contributing, use these checks:

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Next.js development server. |
| `npm run test` | Run Vitest unit tests. |
| `npm run typecheck` | Check TypeScript types. |
| `npm run build` | Create a production build. |
| `npm run start` | Run the local production build. |

No environment variables are required for the standard workflow.

### Technology

Next.js App Router · React · TypeScript · CSS with design tokens · Vitest.

Key areas: `src/app/` contains pages and API Routes, `src/components/` contains the interface, and `src/lib/` contains the parser and helpers. See the [design guide](docs/DESIGN.md).

## Deploy to Vercel

Connect the repo in the Vercel Dashboard, or run:

```bash
npx vercel          # preview
npx vercel --prod   # production
```

The app runs as a Next.js project. Relay endpoints use server-side API Routes; no environment variables are required for the standard workflow.

## Contributing

Suggestions and fixes are welcome. Before opening a pull request, run `npm run test` and `npm run build`. If Lua output changes, update `golden.json` and explain the reason.

## License

Released under the [MIT License](LICENSE).

---

<div align="center"><sub>RigForge · an independent Roblox avatar tool · avatar conversion runs locally in the browser.</sub></div>
