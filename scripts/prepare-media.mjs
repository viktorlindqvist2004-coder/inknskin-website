#!/usr/bin/env node
/**
 * Ser till att stämningsmaterialet ligger i public/media/ innan Next bygger.
 *
 * Körs automatiskt av `npm run build` — även på Vercel, Cloudflare Pages eller
 * vilken värd som helst som bygger från GitHub. Det är avsiktligt: den som får
 * sidan ska kunna ladda upp filerna i GitHubs webbgränssnitt och koppla en värd
 * utan att någonsin öppna en terminal, och ändå få en sida som serverar allt
 * från sin egen domän.
 *
 * Filer som redan finns rörs aldrig. Lägger du in eget material med samma
 * filnamn hoppas nedladdningen över och din version används.
 *
 * Går en fil inte att hämta avbryts bygget. Det är med flit: alternativet vore
 * att publicera en sida där hero-videon är svart, och ett rött kryss med ett
 * begripligt felmeddelande är lättare att förstå än en sida som ser trasig ut.
 *
 * `--soft` varnar i stället för att avbryta. Används av `npm run dev`, så att
 * man kan arbeta vidare på texter och layout utan uppkoppling.
 */

import { mkdir, writeFile, stat, readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "media");

// Manifestet läses som text i stället för att importeras — då slipper skriptet
// ett TypeScript-steg och kan köras med bara node.
const manifest = await readFile(join(root, "lib", "media.ts"), "utf8");

const REMOTE_BASE = manifest.match(/"(https:\/\/[^"]+\/)"/)?.[1];
if (!REMOTE_BASE) {
  console.error("✖ Hittade ingen nedladdningsadress i lib/media.ts");
  process.exit(1);
}

// Blankstegen är avsiktligt toleranta: kräver mönstret exakt formatering slutar
// det matcha så fort någon kör filen genom en formaterare.
const files = [
  ...manifest.matchAll(/"(hf_[^"]+\.(?:png|jpg|mp4))"\s*,\s*"([^"]+)"/g),
].map(([, remote, local]) => ({ remote, local }));

if (files.length === 0) {
  console.error("✖ Hittade inga mediafiler i lib/media.ts");
  process.exit(1);
}

await mkdir(outDir, { recursive: true });

const exists = async (p) => {
  try {
    return (await stat(p)).size > 0;
  } catch {
    return false;
  }
};

const missing = [];
for (const f of files) if (!(await exists(join(outDir, f.local)))) missing.push(f);

if (missing.length === 0) {
  console.log(`media: ${files.length} filer på plats i public/media/`);
  process.exit(0);
}

console.log(`media: hämtar ${missing.length} av ${files.length} filer …`);

const failed = [];
for (const { remote, local } of missing) {
  try {
    const res = await fetch(REMOTE_BASE + remote);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length === 0) throw new Error("tom fil");
    await writeFile(join(outDir, local), buf);
    console.log(`  ↓ ${local}  ${(buf.length / 1024 / 1024).toFixed(1)} MB`);
  } catch (err) {
    console.log(`  ✖ ${local}  ${err.message}`);
    failed.push(local);
  }
}

if (failed.length > 0) {
  const soft = process.argv.includes("--soft");
  if (soft) {
    console.warn(
      `\n⚠ ${failed.length} mediafil(er) gick inte att hämta — filmerna kommer\n` +
        "  vara tomma tills du har uppkoppling. Allt annat fungerar.\n",
    );
    process.exit(0);
  }
  console.error(
    `\n✖ Bygget avbryts: ${failed.length} mediafil(er) gick inte att hämta.\n\n` +
      "  Filmerna och deras posterbilder hämtas från en extern server första\n" +
      "  gången sidan byggs. Svarar den inte finns tre vägar vidare:\n\n" +
      "   1. Bygger du på en värd (Vercel, Cloudflare) — starta om bygget.\n" +
      "      Tillfälliga nätverksfel är den vanligaste orsaken.\n\n" +
      "   2. Har du filerna sedan tidigare — lägg dem i public/media/ med\n" +
      "      exakt dessa namn och committa dem. Då hämtas ingenting alls:\n" +
      failed.map((f) => `        ${f}`).join("\n") +
      "\n\n   3. Är servern borta för gott måste materialet ersättas.\n" +
      "      Se avsnittet Media i README.md.\n",
  );
  process.exit(1);
}

console.log(
  `media: klart, ${files.length} filer i public/media/.\n` +
    "       Committa gärna public/media/ — då är sidan oberoende av\n" +
    "       den externa servern även vid framtida byggen.",
);
