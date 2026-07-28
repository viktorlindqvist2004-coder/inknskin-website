#!/usr/bin/env node
/**
 * Gör en sömlös bakgrundsloop av ett stillbild — samma sorts långsamma åkning
 * som hero, studiosektionen och kontaktpanelen använder.
 *
 *   node scripts/make-loop.mjs public/media/portfolio/arash-04-skalle.jpg ink-bloom
 *
 * Resultat i public/media/:
 *   <namn>.mp4          H.264, det enda Safari/iOS spelar
 *   <namn>.webm         VP9, reserv för byggen utan patentbelagda kodekar
 *   <namn>-poster.jpg   första bildrutan, visas medan videon laddar
 *
 * Peka sedan om raden i lib/media.ts (eller lägg till en ny) — `clip("<namn>")`
 * plockar upp alla tre filerna automatiskt.
 *
 * Varför fram- och baklänges hopfogat: en zoomning som bara går åt ett håll
 * hoppar synligt när den loopar om. Genom att lägga på samma klipp baklänges
 * blir sista bildrutan identisk med den första, och skarven syns inte.
 *
 * Kräver ffmpeg i PATH (`brew install ffmpeg` / `apt install ffmpeg`), eller
 * en sökväg i miljövariabeln FFMPEG. Det är medvetet inget npm-beroende —
 * verktyget behövs bara när man byter material, aldrig för att bygga sidan.
 */

import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const [src, name] = process.argv.slice(2);
if (!src || !name) {
  console.error("Användning: node scripts/make-loop.mjs <källbild> <namn>");
  process.exit(1);
}

/** Halva loopen i sekunder — den dubbleras av spegelvändningen. */
const HALF = 6;
const FPS = 25;
const ZOOM = 1.18; // hur nära åkningen slutar; över ~1.25 syns uppskalningen

// FFMPEG pekar ut ett annat binärt ffmpeg än det i PATH, om man har ett sådant.
const BIN = process.env.FFMPEG || "ffmpeg";
const ff = (args) => execFileSync(BIN, ["-y", "-hide_banner", "-loglevel", "error", ...args]);

// Bildens egna mått avgör videons — så att en stående bild ger en stående loop.
// ffmpeg skriver strömbeskrivningen på stderr och avslutar med felkod när det
// saknas utfil; det räcker för att läsa av måtten utan att kräva ffprobe.
const info = (() => {
  try {
    return execFileSync(BIN, ["-hide_banner", "-i", src], { stdio: ["ignore", "pipe", "pipe"] }).toString();
  } catch (e) {
    return (e.stderr ?? "").toString();
  }
})();
const dims = info.match(/Video:.*?[ ,](\d{2,5})x(\d{2,5})[ ,]/);
if (!dims) {
  console.error(`Kunde inte läsa måtten ur ${src} — är det en bildfil?`);
  process.exit(1);
}
let [, w, h] = dims.map(Number);

// Jämna mått krävs av yuv420p, och vi tar inte i mer än 1280 px på långsidan —
// det är en bakgrund, inte ett fotogalleri.
const cap = 1280;
const k = Math.min(1, cap / Math.max(w, h));
w = Math.round((w * k) / 2) * 2;
h = Math.round((h * k) / 2) * 2;

const tmp = mkdtempSync(path.join(tmpdir(), "loop-"));
try {
  // zoompan räknar i heltalssteg och blir hackigt på små bilder — skala upp
  // först så att panoreringen får subpixelupplösning att arbeta med.
  const fwd = path.join(tmp, "fwd.mp4");
  ff([
    "-loop", "1", "-i", src,
    "-vf",
    `scale=${w * 4}:${h * 4}:force_original_aspect_ratio=increase,crop=${w * 4}:${h * 4},` +
      `zoompan=z='min(zoom+${((ZOOM - 1) / (HALF * FPS)).toFixed(6)},${ZOOM})':d=${HALF * FPS}` +
      `:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=${w}x${h}:fps=${FPS}`,
    "-t", String(HALF),
    "-an", "-c:v", "libx264", "-preset", "slow", "-crf", "23", "-pix_fmt", "yuv420p",
    fwd,
  ]);

  const rev = path.join(tmp, "rev.mp4");
  ff(["-i", fwd, "-vf", "reverse", "-an", "-c:v", "libx264", "-preset", "slow", "-crf", "23", "-pix_fmt", "yuv420p", rev]);

  const list = path.join(tmp, "list.txt");
  writeFileSync(list, `file '${fwd}'\nfile '${rev}'\n`);
  const joined = path.join(tmp, "joined.mp4");
  ff(["-f", "concat", "-safe", "0", "-i", list, "-c", "copy", joined]);

  const out = (ext) => path.join("public", "media", `${name}${ext}`);

  // -movflags +faststart lägger indexet först i filen, så uppspelningen kan
  // börja innan hela klippet är nedladdat.
  ff(["-i", joined, "-an", "-c:v", "libx264", "-preset", "slow", "-crf", "24",
      "-pix_fmt", "yuv420p", "-movflags", "+faststart", out(".mp4")]);

  ff(["-i", joined, "-an", "-c:v", "libvpx-vp9", "-crf", "36", "-b:v", "0",
      "-row-mt", "1", "-pix_fmt", "yuv420p", out(".webm")]);

  ff(["-i", joined, "-frames:v", "1", "-q:v", "4", out("-poster.jpg")]);

  console.log(`✓ ${name}: ${w}x${h}, ${HALF * 2}s — mp4 + webm + poster i public/media/`);
} finally {
  rmSync(tmp, { recursive: true, force: true });
}
