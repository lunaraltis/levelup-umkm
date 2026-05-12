export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://levelup-umkm.web.id";

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}
