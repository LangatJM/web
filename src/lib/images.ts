export function phoneImageSrc(path: string | null): string {
  if (!path) return "/logo.png";

  const normalized = path.trim();
  const parts = normalized.split("/").filter(Boolean);

  if (parts.length === 0) return "/logo.png";

  const isPhoneAsset = normalized.startsWith("/phone-images/") || normalized.startsWith("phone-images/");
  if (!isPhoneAsset) {
    return parts.map((part, index) => (index === 0 ? part : encodeURIComponent(part))).join("/");
  }

  const fileName = decodeURIComponent(parts[parts.length - 1] ?? "phone");
  const label = fileName.replace(/\.[^/.]+$/, "").replace(/[._+]+/g, " ").trim() || "Phone";
  const shortLabel = label.length > 18 ? `${label.slice(0, 18).trimEnd()}…` : label;
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800" role="img" aria-label="${shortLabel}">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#dfeefc" />
          <stop offset="100%" stop-color="#b7d8ef" />
        </linearGradient>
      </defs>
      <rect width="800" height="800" rx="60" fill="#f7f4ef"/>
      <rect x="180" y="60" width="440" height="680" rx="58" fill="url(#g)" stroke="#1f476e" stroke-width="18"/>
      <rect x="220" y="120" width="360" height="540" rx="28" fill="#f9fbff" stroke="#94afc9" stroke-width="10"/>
      <circle cx="400" cy="295" r="110" fill="#cfe3f5"/>
      <rect x="307" y="420" width="186" height="72" rx="18" fill="#1f476e" opacity="0.9"/>
      <rect x="245" y="535" width="310" height="14" rx="7" fill="#d5e6f7"/>
      <text x="400" y="670" text-anchor="middle" font-size="34" font-weight="700" fill="#1f476e" font-family="Arial, Helvetica, sans-serif">${shortLabel}</text>
      <circle cx="400" cy="106" r="18" fill="#1f476e"/>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}
