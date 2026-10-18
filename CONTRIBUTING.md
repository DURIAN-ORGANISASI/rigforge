# Contributing to RigForge

Thank you for helping improve RigForge. Contributions can include bug fixes, parser coverage, accessibility, documentation, and UI improvements.

## Before you start

- For a large change, open a GitHub issue first to discuss the scope.
- Keep pull requests focused and describe the user-visible effect.
- Never include bot tokens, credentials, private messages, or personal data in issues, fixtures, test output, or screenshots.
- The accepted avatar input formats are documented in [docs/INPUT_FORMAT.md](docs/INPUT_FORMAT.md). Treat changes to parser behavior as compatibility changes and add tests for them.

## Local development

Requirements: Node.js 22.x, npm, and Git.

```bash
git clone https://github.com/akndrn000/rigforge.git
cd rigforge
npm ci
npm run dev
```

## Checks required before a pull request

Run these commands from the repository root:

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

Include or update tests whenever parser logic, API behavior, or other application logic changes. Do not remove a failing test merely to make the verification pass.

## Pull request checklist

- [ ] Explain what changed and why.
- [ ] Keep the change limited to its stated purpose.
- [ ] Add or update tests for behavior changes.
- [ ] Run typecheck, lint, tests, and production build.
- [ ] Update the README or relevant docs if behavior or setup changes.
- [ ] Confirm no secrets, private data, or unrelated generated files are included.

## License

By submitting a contribution, you agree that your contribution may be distributed under the repository's [MIT License](LICENSE), subject to applicable law and the rights you hold in the contribution.
