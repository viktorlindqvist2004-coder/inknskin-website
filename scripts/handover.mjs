#!/usr/bin/env node
/**
 * Gör repot självförsörjande och redo att lämnas över.
 *
 *   npm run handover
 *
 * Fyra steg, i tur och ordning:
 *
 *   1. Laddar hem de åtta mediafilerna från CDN:et till public/media/
 *   2. Skriver om lib/media.ts så lokalt läge blir standard
 *   3. Bygger sidan
 *   4. Kontrollerar att ingenting längre hämtas utifrån
 *
 * Varför steg 2 ändrar källkoden i stället för att sätta en miljövariabel:
 * en miljövariabel måste sättas om på nytt i värdens byggmiljö, och glöms den
 * bort bygger Cloudflare tyst en sida som pekar tillbaka på CDN:et igen. En
 * rad i koden följer med i git och kan inte tappas bort.
 *
 * Kräver internet — CDN:et måste svara. Går det inte att nå avbryts allt innan
 * någonting skrivits om, så det är riskfritt att köra igen.
 */

import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const mediaTs = join(root, "lib", "media.ts");

const run = (cmd, args) =>
  execFileSync(cmd, args, { cwd: root, stdio: "inherit" });

const step = (n, text) => console.log(`\n\x1b[1m[${n}/4] ${text}\x1b[0m`);

// ── 1 ───────────────────────────────────────────────────────────────────────
step(1, "Hämtar mediafilerna");
try {
  run("node", ["scripts/fetch-media.mjs"]);
} catch {
  console.error(
    "\n✖ Nedladdningen misslyckades. Ingenting har ändrats.\n\n" +
      "  Vanligaste orsaken är att datorn saknar internet, eller att ett\n" +
      "  företagsnätverk blockerar utgående trafik. Prova från en annan\n" +
      "  uppkoppling.\n\n" +
      "  Svarar CDN:et inte alls längre måste materialet ersättas — se\n" +
      "  avsnittet Media i README.md.",
  );
  process.exit(1);
}

// ── 2 ───────────────────────────────────────────────────────────────────────
step(2, "Ställer om till lokalt media");
const before = readFileSync(mediaTs, "utf8");
const REMOTE_DEFAULT = 'process.env.NEXT_PUBLIC_MEDIA_SOURCE === "local"';
const LOCAL_DEFAULT = 'process.env.NEXT_PUBLIC_MEDIA_SOURCE !== "remote"';

if (before.includes(LOCAL_DEFAULT)) {
  console.log("•  redan inställt på lokalt läge");
} else if (before.includes(REMOTE_DEFAULT)) {
  writeFileSync(mediaTs, before.replace(REMOTE_DEFAULT, LOCAL_DEFAULT));
  console.log("✓  lib/media.ts pekar nu på public/media/ som standard");
} else {
  console.error(
    "✖ Hittade inte raden som styr remote/local i lib/media.ts.\n" +
      "  Har filen skrivits om? Sätt useLocal till true för hand.",
  );
  process.exit(1);
}

// ── 3 ───────────────────────────────────────────────────────────────────────
step(3, "Bygger sidan");
run("npx", ["next", "build"]);

// ── 4 ───────────────────────────────────────────────────────────────────────
step(4, "Kontrollerar att inget hämtas utifrån");
try {
  run("node", ["scripts/check-media.mjs"]);
} catch {
  console.error("\n✖ Sidan hämtar fortfarande filer utifrån — se listan ovan.");
  process.exit(1);
}

const count = readdirSync(join(root, "public", "media")).length;
console.log(
  `\n\x1b[32m\x1b[1m✓ Klart.\x1b[0m ${count} filer i public/media/. ` +
    "Sidan är självförsörjande.\n\n" +
    "Nästa steg — lägg upp den hos den som ska äga den:\n\n" +
    "  git add -A\n" +
    '  git commit -m "Självhostat media"\n' +
    "  git remote add origin https://github.com/<användare>/<repo>.git\n" +
    "  git push -u origin main\n\n" +
    "Koppla sedan Cloudflare Pages mot repot — se HANDOVER.md.\n",
);
