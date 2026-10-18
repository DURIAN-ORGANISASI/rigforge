# RigForge UI refresh

This branch refreshes the product interface for both workspaces while preserving converter, Discord API, storage, and message-dispatch logic.

## Design direction

- **Brand:** RigForge and Relay share a consistent navigation pattern and UI foundation.
- **Palette:** deep ink and cloud surfaces, electric blue for primary actions, cyan for secondary highlights.
- **Typography:** strong sans-serif hierarchy for content, JetBrains Mono for code and system-preview areas.
- **Layout:** product hero, working tool, and concise workflow guide on RigForge; service hero, configuration, and dispatch tools on Relay.
- **Responsive behavior:** the two-column editor becomes a vertical stack on compact screens; Relay's illustrative preview also collapses to one column.
- **Accessibility:** visible focus rings, semantic landmarks, clear link labels, and reduced-motion support.

## Implementation

- src/styles/redesign.css contains the override layer imported last by src/app/layout.tsx.
- src/components/Header.tsx provides shared navigation and the existing theme toggle.
- src/components/RigForgeApp.tsx composes the landing hero, converter, and workflow section.
- src/components/RelayWorkspace.tsx adds a product introduction while keeping configuration and send panels.
- README.md and README.en.md document workflows, privacy boundaries, scripts, and deployment.

## Validation checklist

- npm run lint
- npm run typecheck
- npm run test
- npm run build
- Manually test both themes at desktop and mobile widths.
- Verify converter sample, reset, force-generate, and clipboard behavior.
- Verify Relay config persistence, token visibility toggle, connection test, send validation, retries, and history.
