/** Normalize a Bot Token pasted raw, with a "Bot " prefix, or as an Authorization header. */
export function normalizeBotToken(value: unknown): string {
  if (typeof value !== "string") return "";
  let token = value.trim();
  if (!token) return "";

  const unwrapQuotes = (input: string) => {
    if (input.length >= 2 &&
      ((input.startsWith('"') && input.endsWith('"')) ||
       (input.startsWith("'") && input.endsWith("'")))) {
      return input.slice(1, -1).trim();
    }
    return input;
  };

  token = unwrapQuotes(token);
  token = token.replace(/^authorization\s*:\s*/i, "").trim();
  token = token.replace(/^bot(?:\s+|$)/i, "").trim();
  return unwrapQuotes(token);
}
