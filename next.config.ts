import type { NextConfig } from "next";

/**
 * Sidan byggs som en helt statisk export.
 *
 * Ingenting här behöver en server: alla sidor är förrenderade, det finns inga
 * API-rutter och ingen data hämtas vid körning. `next build` lägger färdiga
 * HTML-, CSS- och JS-filer i `out/`, som kan läggas på vilken statisk värd som
 * helst — Cloudflare, Netlify, GitHub Pages eller ett vanligt webbhotell.
 *
 * Det är ett medvetet val inför överlämning till kund: ingen inlåsning mot en
 * enskild leverantör och inget krav på ett betalkonto någonstans. Se HANDOVER.md.
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  images: {
    // Next.js bildoptimering kräver en server. Sidan använder vanliga
    // <img>-taggar med egna storlekar, så ingenting går förlorat.
    unoptimized: true,
  },
};

export default nextConfig;
