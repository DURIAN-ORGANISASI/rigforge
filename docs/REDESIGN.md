# RigForge UI refresh

This refresh focuses on a **tool-first interface**. Both routes open directly into their working panels without large marketing heroes, feature cards, or promotional sections.

## Design direction

- **Primary goal:** make the tool accessible immediately and keep the working area dominant.
- **Palette:** deep ink and cloud surfaces with electric blue and cyan accents.
- **Typography:** clear sans-serif headings, JetBrains Mono for code and technical preview content.
- **Layout:** a compact workspace heading followed by the active tool panels.
- **Navigation:** a single workspace switch between RigForge and Relay, plus the theme control.
- **Responsive behavior:** converter panels sit side-by-side on wide screens and stack on smaller screens; Relay uses a similar layout.
- **Accessibility:** visible focus rings, semantic landmarks, clear link labels, and reduced-motion support.

## Implementation

- `src/styles/redesign.css` contains the shared visual layer and workspace sizing overrides.
- `src/components/Header.tsx` provides the compact workspace switcher and theme toggle.
- `src/components/RigForgeApp.tsx` renders only the converter workspace.
- `src/components/RelayWorkspace.tsx` renders only the Relay configuration and send panels.
- `README.md` and `README.en.md` document workflows, privacy boundaries, scripts, and deployment.

## Validation checklist

- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run build`
- Verify both themes at desktop and mobile widths.
- Verify converter sample, reset, force-generate, and clipboard behavior.
- Verify Relay configuration persistence, token visibility, connection checks, send validation, rate-limit retries, and session history.
