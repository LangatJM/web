export function phoneImageSrc(path: string | null): string {
  if (!path) return "/logo.png";
  const parts = path.split("/");
  return parts.map((p, i) => (i === 0 ? p : encodeURIComponent(p))).join("/");
}
