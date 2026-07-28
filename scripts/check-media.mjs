#!/usr/bin/env node
/**
 * Rapporterar vilka externa värdar den byggda sidan hämtar filer från.
 *
 *   npm run build && npm run check-media
 *
 * Poängen är att göra ett tyst beroende synligt. Bilder och filmer som ligger
 * kvar på ett CDN någon annan äger kan försvinna utan förvarning, och då blir
 * hero-videon svart utan att något i koden ändrats.
 *
 * Länkar (Instagram, Google Maps) räknas inte — de ska peka utåt.
 */

import { readdir, readFile } from "node:fs/promises";
import { join, dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "out");

/** Värdar som bara förekommer som länkar eller namnrymder, inte som filer. */
const LINK_ONLY = [
  "www.instagram.com",
  "www.tiktok.com",
  "www.google.com",
  "schema.org",
  "www.w3.org",
];

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if ([".html", ".js", ".css", ".txt"].includes(extname(e.name))) out.push(p);
  }
  return out;
}

let files;
try {
  files = await walk(OUT);
} catch {
  console.error("Ingen out/ hittad. Kör `npm run build` först.");
  process.exit(1);
}

const hosts = new Map();
for (const f of files) {
  const text = await readFile(f, "utf8");
  for (const m of text.matchAll(/https?:\/\/([a-z0-9.-]+)(\/[^"'\s)]*)?/gi)) {
    const [, host, path = ""] = m;
    if (LINK_ONLY.includes(host)) continue;
    if (!/\.(png|jpe?g|webp|avif|gif|svg|mp4|webm|woff2?|css|js)$/i.test(path)) continue;
    if (!hosts.has(host)) hosts.set(host, new Set());
    hosts.get(host).add(path.split("/").pop());
  }
}

if (hosts.size === 0) {
  console.log("✓ Sidan hämtar inga filer från externa värdar.");
  console.log("  Allt serveras från din egen domän.");
  process.exit(0);
}

console.log("⚠  Sidan hämtar fortfarande filer utifrån:\n");
let total = 0;
for (const [host, assets] of hosts) {
  console.log(`   ${host} — ${assets.size} filer`);
  for (const a of [...assets].sort()) console.log(`     ${a}`);
  total += assets.size;
  console.log();
}
console.log(`Totalt ${total} filer på en värd du inte kontrollerar.`);
console.log("Hämta hem dem så sidan blir självförsörjande:\n");
console.log("   npm run fetch-media");
console.log('   echo "NEXT_PUBLIC_MEDIA_SOURCE=local" >> .env.local');
console.log("   npm run build && npm run check-media\n");
process.exit(1);
