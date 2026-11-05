export const INSTITUTIONAL_URL = "https://grupobcenergia.com.br/";

const ALLOWED_EXTRA = new Set(["ad_id", "gclid", "fbclid", "li_fat_id"]);
const MACRO = /\{\{|\}\}|%7B%7B|%7D%7D/i;

// Captured at module load, before the lead form writes fallback UTMs into the URL,
// so visitors without a campaign are not sent invented UTMs.
export const initialSearch =
  typeof window !== "undefined" ? window.location.search : "";

/** Builds the institutional URL forwarding only real, allowed campaign params. */
export function buildInstitutionalUrl(search: string): string {
  const url = new URL(INSTITUTIONAL_URL);
  const incoming = new URLSearchParams(search);
  incoming.forEach((raw, key) => {
    const k = key.toLowerCase();
    if (!(k.startsWith("utm_") || ALLOWED_EXTRA.has(k))) return;
    const value = raw.trim();
    if (!value || MACRO.test(value) || value.length > 255) return;
    if (!/^[a-z0-9_]{1,64}$/.test(k)) return;
    if (!url.searchParams.has(k)) url.searchParams.set(k, value);
  });
  return url.toString();
}
