<div align="center">

<img src="https://raw.githubusercontent.com/akndrn000/rigforge/main/docs/logo.svg" alt="RigForge" width="96" height="96">

# RigForge

<p>
  <a href="https://github.com/akndrn000/rigforge/actions/workflows/verify.yml"><img alt="CI checks" src="https://img.shields.io/github/actions/workflow/status/akndrn000/rigforge/verify.yml?branch=main&label=CI&logo=githubactions&logoColor=white"></a>
  <a href="https://nextjs.org/"><img alt="Next.js" src="https://img.shields.io/badge/Next.js-111827?style=flat&logo=nextdotjs&logoColor=white"></a>
  <a href="https://react.dev/"><img alt="React" src="https://img.shields.io/badge/React-087EA4?style=flat&logo=react&logoColor=white"></a>
  <a href="https://www.typescriptlang.org/"><img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white"></a>
  <a href="https://vercel.com/"><img alt="Vercel" src="https://img.shields.io/badge/Vercel-111827?style=flat&logo=vercel&logoColor=white"></a>
  <a href="https://vitest.dev/"><img alt="Vitest" src="https://img.shields.io/badge/Vitest-6E9F18?style=flat&logo=vitest&logoColor=white"></a>
  <a href="https://eslint.org/"><img alt="ESLint" src="https://img.shields.io/badge/ESLint-4B32C3?style=flat&logo=eslint&logoColor=white"></a>
  <a href="LICENSE"><img alt="MIT License" src="https://img.shields.io/github/license/akndrn000/rigforge?label=license"></a>
</p>

<p><a href="README.md">Bahasa Indonesia</a> · <a href="README.en.md">English</a></p>

<p><b>Convert Roblox avatar data into a Lua structure directly in your browser.</b> RigForge provides the avatar conversion workspace, while Relay is a separate workspace for Discord Bot configuration and message delivery.</p>

<p>
  <a href="#try-it-now">Try it now</a> ·
  <a href="#features">Features</a> ·
  <a href="#how-to-use">How to use</a> ·
  <a href="#input-format">Input format</a> ·
  <a href="#privacy">Privacy</a> ·
  <a href="#sources-credits-and-license">Sources &amp; license</a> ·
  <a href="#development">Development</a> ·
  <a href="#contributing">Contributing</a>
</p>

</div>

---

## Try it now

Start converting in three steps:

1. Open [RigForge](https://rigforge-mocha.vercel.app/).
2. Paste avatar tokens or JSON data into the input panel. Lua output updates automatically.
3. Review the result, select **Salin Kode** (Copy Code), then paste and test it in Roblox Studio.

![RigForge converter workspace illustration](https://raw.githubusercontent.com/akndrn000/rigforge/main/docs/screenshots/en/converter.svg)

To send a message through the Discord Bot API, open [Relay](https://rigforge-mocha.vercel.app/relay), enter an official Bot Token, choose a Channel ID slot, and test access before sending.

![Relay workspace illustration](https://raw.githubusercontent.com/akndrn000/rigforge/main/docs/screenshots/en/relay.svg)

## Features

**Avatar conversion**

- Automatic conversion as input changes, plus **Generate Paksa** (Force Generate) for immediate conversion.
- Supports text tokens such as `Head: 12345` and JSON following the `AccessoryBlob Data:` marker.
- Groups data into body parts, classic clothing, layered clothing, and accessories.
- Maintains minimum slot counts; empty slots use `AssetId = 0`, and extra IDs add rows.
- Removes duplicate IDs within the same group.
- Sample data, input reset, and Lua copy actions.

**Relay / Discord**

- Configure an official Bot Token and up to 10 Channel ID slots.
- Name slots, select an active channel, and keep configuration in browser storage.
- Check channel access before sending.
- Send messages through the Discord Bot API, with an optional code-block format.
- Detects Discord `429` rate-limit responses and returns a retry-after hint; the server does not automatically resend the message.
- Delivery status and a short history for the active session.

**Interface and quality**

- Light and dark themes.
- Responsive layout for desktop, tablet, and mobile.
- Separate parser, UI components, Discord integration, and tests.
- TypeScript, ESLint, Vitest unit tests, and production-build checks through GitHub Actions.

## How to use

### 1. Paste avatar data

RigForge accepts avatar tokens and JSON `AccessoryBlob` data. Select **Contoh Data** (Sample Data) to try the converter without preparing your own input.

![Avatar input example](https://raw.githubusercontent.com/akndrn000/rigforge/main/docs/screenshots/en/input-format.svg)

### 2. Review and copy Lua output

Output is generated automatically. Use **Generate Paksa** (Force Generate) to run conversion immediately, then select **Salin Kode** (Copy Code) to copy the full result.

![Conversion workflow](https://raw.githubusercontent.com/akndrn000/rigforge/main/docs/screenshots/en/workflow-v2.svg)

### 3. Set up Relay when you need to send a message

1. Open [Relay](https://rigforge-mocha.vercel.app/relay).
2. Paste a Bot Token from the [Discord Developer Portal](https://discord.com/developers/applications).
3. Add and save a Channel ID in the desired slot, then select that active slot.
4. Test channel access. Make sure the bot has joined the server and has the required permissions.
5. Write the message, review the destination, and send it.

![Relay configuration and message workflow](https://raw.githubusercontent.com/akndrn000/rigforge/main/docs/screenshots/en/relay.svg)

## Input format

The parser searches the full text and is case-insensitive.

```text
Head: 12345
Torso: 23456
Pants: 34567
HairAccessory: 45678, 56789
Body Color: 242,215,205 (#F2D7CD)
```

| Group | Tokens or format |
| ----- | ---------------- |
| Body parts | `Head`, `Torso`, `LeftArm`, `RightArm`, `LeftLeg`, `RightLeg` |
| Classic clothing | `Pants`, `Shirt`, `TShirt`; `T-Shirt` and `Tshirt` are also recognized |
| Skin tone | `Body Color` with RGB; a hex value in parentheses takes priority |
| Accessories | `Hat`, `HairAccessory`, `FaceAccessory`, `FrontAccessory`, `NeckAccessory`, `BackAccessory`, `ShoulderAccessory`, `WaistAccessory` |
| JSON data | `AccessoryBlob Data:` followed by a JSON array using `AccessoryType` and `AssetId` properties |


### Slot rules

Minimum slot counts are configured through `LAYERED_GROUPS` and `ACCESSORY_GROUPS` in `src/lib/converter.ts`.

| Group | Minimum slots |
| ----- | ------------- |
| `Clothes.Layered` | `LeftShoe` 2, `RightShoe` 2, `TShirt` 3, `Shirt` 3, `Pants` 3, `Shorts` 3, `DressSkirt` 3, `Sweater` 3, `Jacket` 4 |
| `Accessories` | `Hat` 3, `Hair` 3, `Face` 7, `Front` 3, `Neck` 3, `Back` 3, `Shoulder` 3, `Waist` 3 |

Unused slots use `AssetId = 0`. Extra IDs add rows to the relevant group, while duplicate IDs within a group are emitted once. Unrecognized accessory types receive a new group. See the [input format guide](docs/INPUT_FORMAT.md) for details.

## Privacy

- **RigForge avatar input** is processed in the browser and is not uploaded to the conversion server.
- **Relay configuration**, including the Bot Token and channel slots, is stored in browser `localStorage`.
- When checking access or sending a message, Relay calls the app API, which forwards the request to Discord. The API routes are designed not to store or log the Bot Token.
- Relay stores the token in browser `localStorage`. Anyone with access to that browser profile may be able to read it; use a trusted device and grant the bot only the permissions it needs.
- Use an official token from the Discord Developer Portal. Personal-account tokens and self-bots are not supported.
- Never publish or commit a token. Reset it in the Discord Developer Portal if exposed. On shared devices, clear the site's data after use.

![Illustration of processing and request flow](https://raw.githubusercontent.com/akndrn000/rigforge/main/docs/screenshots/en/privacy.svg)

## Development

### Run locally

**Requirements:** Node.js 22.x, npm, and Git.

```bash
git clone https://github.com/akndrn000/rigforge.git
cd rigforge
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Tests and quality checks

```bash
npm run typecheck
npm run lint
npm run test
npm run build
```

| Command | Purpose |
| ------- | ------- |
| `npm run dev` | Start the Next.js development server |
| `npm run typecheck` | Check TypeScript types |
| `npm run lint` | Run ESLint |
| `npm run test` | Run Vitest unit tests |
| `npm run build` | Create a production build |
| `npm run start` | Run the production build locally |

### Deploy to Vercel

1. Import `akndrn000/rigforge` through [Vercel](https://vercel.com/).
2. Confirm that Next.js is detected and Node.js 22.x is selected.
3. Deploy. RigForge and Relay are served from the same deployment.

Production deployment via CLI:

```bash
npx vercel --prod
```

### Tech stack

- **Next.js** and **React** for the web application.
- **TypeScript** for type safety during development.
- **CSS** for the design system and responsive interface.
- **Discord Bot API** for Relay channel checks and message delivery.
- **Vitest**, **ESLint**, and **TypeScript** for quality checks.
- **Vercel** for hosting.

### Directory structure

```text
src/
├── app/
│   ├── api/discord/
│   │   ├── check/route.ts   # Validate Bot Token and channel access
│   │   └── send/route.ts    # Forward messages to Discord
│   ├── relay/               # Relay page
│   └── page.tsx             # Main page
├── components/              # Converter, Relay, header, and footer UI
├── hooks/                   # Theme and Relay configuration
├── lib/
│   ├── converter.ts         # Avatar parser and Lua generator
│   ├── relay/               # Discord integration and types
│   └── __fixtures__/        # Converter test fixtures
└── styles/                  # Design tokens and UI styles

docs/
├── logo.svg                 # README logo
├── screenshots/             # Interface illustrations and guides
├── INPUT_FORMAT.md          # Input format reference
└── SOURCES.md               # Documentation references and attribution
```

Root maintenance files: `LICENSE`, `CONTRIBUTING.md`, and `SECURITY.md`.

### Known limitations

- RigForge has no file-download action; output must be copied through the clipboard.
- Converter input is not saved as history after page reload.
- Relay configuration is stored in the browser and does not sync across devices.
- Relay sends real messages to the selected channel. Always verify the destination and content before sending.

## Sources, credits, and license

### Reference sources

- [Roblox Creator Hub — Avatar](https://create.roblox.com/docs/avatar) for general terminology such as body parts, classic clothing, and layered accessories. The token syntax and `AccessoryBlob Data` structure accepted by RigForge are documented in the [project input guide](docs/INPUT_FORMAT.md); this project does not claim that format is an official Roblox export schema.
- [Discord Developer Documentation](https://discord.com/developers/docs/intro), including [OAuth2 and bot authorization](https://discord.com/developers/docs/topics/oauth2), [Create Message](https://discord.com/developers/docs/resources/message#create-message), and [rate limits](https://discord.com/developers/docs/topics/rate-limits) for the Relay integration.
- Official documentation for [Next.js](https://nextjs.org/docs), [React](https://react.dev/learn), [TypeScript](https://www.typescriptlang.org/docs/), [Vitest](https://vitest.dev/guide/), [ESLint](https://eslint.org/docs/latest/), and [Vercel](https://vercel.com/docs) is used as technology reference material.
- See [docs/SOURCES.md](docs/SOURCES.md) for the fuller reference list and attribution notes.

The logo and SVG illustrations in `docs/` are project documentation visuals, not guaranteed screenshots of the live deployment. Roblox, Discord, and other third-party names and marks remain the property of their respective owners.

### MIT License

The code and project material covered by this repository are released under the [MIT License](LICENSE). The root `LICENSE` file is authoritative; when redistributing covered portions, retain the MIT copyright and permission notice. This license does not grant rights to third-party trademarks, services, or materials. Dependencies remain subject to their own licenses; see `package.json`, `package-lock.json`, and upstream documentation.

RigForge is an independent project and is not affiliated with Roblox Corporation or Discord Inc.

## Contributing

Contributions are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for the workflow and expected checks, and [SECURITY.md](SECURITY.md) for vulnerability reporting.

1. Fork the repository and create a branch for your change.
2. Run `npm ci`, and add or update tests when application logic changes.
3. Ensure these checks pass:

   ```bash
   npm run typecheck
   npm run lint
   npm run test
   npm run build
   ```

4. Open a Pull Request with a concise summary and rationale. For bugs, include reproduction steps and safe sample input—never include a Bot Token or other secrets.


---

<div align="center">
  <sub>RigForge — structured avatar conversion that stays simple and browser-based.</sub>
</div>
