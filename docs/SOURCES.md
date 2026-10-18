# Sources, Credits, and Third-Party Notices

This file lists the primary documentation references used to understand the platforms and tooling integrated by RigForge. A reference link is not a claim of endorsement, nor does it imply that the project's implementation is copied from that documentation.

## Platform references

### Roblox avatar concepts

- [Roblox Creator Hub — Avatar](https://create.roblox.com/docs/avatar)
- [Roblox Creator Hub — Characters](https://create.roblox.com/docs/characters)
- [Roblox Creator Hub — Layered accessories](https://create.roblox.com/docs/avatar/layered-accessories)
- [Roblox Creator Hub — Avatar settings](https://create.roblox.com/docs/studio/avatar-settings)

These sources provide general terminology for avatars, body parts, classic clothing, and accessories. RigForge's accepted token syntax and parser behavior are project-specific and are documented in [INPUT_FORMAT.md](INPUT_FORMAT.md). In particular, the `AccessoryBlob Data:` input handled by the parser should not be treated as a guarantee of an official or stable Roblox export schema.

### Discord Relay integration

- [Discord Developer Documentation](https://docs.discord.com/developers/intro)
- [OAuth2 and bot authorization](https://docs.discord.com/developers/topics/oauth2)
- [Message Resource](https://docs.discord.com/developers/resources/message)
- [Rate limits](https://docs.discord.com/developers/topics/rate-limits)
- [Discord Developer Policy](https://support-dev.discord.com/hc/en-us/articles/8563934450327-Discord-Developer-Policy)

Relay uses Discord's official Bot API. The relevant application routes are implemented in `src/app/api/discord/check/route.ts` and `src/app/api/discord/send/route.ts`. Bot permissions, token safety, and current Discord policies are governed by Discord's own documentation and terms, which may change independently of this repository.

## Framework and tooling references

- [Next.js documentation](https://nextjs.org/docs)
- [React documentation](https://react.dev/learn)
- [TypeScript documentation](https://www.typescriptlang.org/docs/)
- [Vitest documentation](https://vitest.dev/guide/)
- [ESLint documentation](https://eslint.org/docs/latest/)
- [Vercel documentation](https://vercel.com/docs)

The dependency versions are defined in `package.json` and locked in `package-lock.json`.

## Project assets and trademarks

The logo and SVG diagrams maintained under `docs/` are documentation visuals for this project. Images labeled as illustrations or mockups are explanatory visuals and are not guaranteed to match the live application pixel-for-pixel.

RigForge is an independent project. Roblox, Discord, Next.js, React, TypeScript, Vercel, and other third-party names or logos are owned by their respective holders and are used only to identify the relevant platforms or technologies. No affiliation or endorsement is implied.

## Licensing

The repository includes a root [MIT License](../LICENSE). It applies to the project material covered by that license; it does not relicense third-party packages, fonts, service documentation, trademarks, or other materials owned by others.

Third-party dependencies must be used under their respective licenses. Consult each upstream package's license and notices when redistributing dependency code or generated bundles. The dependency metadata in `package.json` and `package-lock.json` is a starting point, not a substitute for the complete upstream license text.

Fonts are loaded using Next.js font support and the `@fontsource-variable/jetbrains-mono` package. Their upstream distribution terms remain applicable.
