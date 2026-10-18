# Security Policy

## Supported version

Security fixes target the latest code on the `main` branch. There are no separately maintained release branches at this time.

## Reporting a vulnerability

Please do **not** publish exploitable details, credentials, or tokens in a public GitHub issue.

1. Open the repository's **Security** tab and use **Report a vulnerability** to send a private report, if GitHub private vulnerability reporting is available for this repository.
2. If that option is unavailable, contact the repository maintainer through their public GitHub profile: https://github.com/akndrn000. Do not send Bot Tokens or other live credentials.
3. Include the affected area, impact, and reproducible steps using a safe test account or sample data.

There is no guaranteed response time or formal service-level agreement. Please give the maintainer a reasonable opportunity to investigate before publicly disclosing an unpatched issue.

## If a Discord Bot Token is exposed

Immediately reset or revoke the token in the Discord Developer Portal, update any affected deployment, and remove the exposed value from local storage or logs where applicable. Deleting a message or commit alone does not make a leaked token safe again.

## Safe bug reports

For non-sensitive bugs, use GitHub Issues. Remove tokens, private channel contents, user identifiers, and other personal or sensitive data from reproduction steps and screenshots.
