/* =============================================================================
 *  PORTFOLIO — den enda filen du behöver röra för att lägga in riktiga jobb
 * =============================================================================
 *
 *  Bilderna nedan är genererat platshållarmaterial, inte tatueringar gjorda i
 *  studion. Byt ut dem mot riktiga foton från @arash_tattooer så här:
 *
 *    1. Lägg bilderna i `public/media/portfolio/` — namnge dem 01.jpg, 02.jpg …
 *       Stående format (4:5) ser bäst ut i rutnätet.
 *    2. Byt ut varje rad nedan mot:
 *
 *         { src: "/media/portfolio/01.jpg", width: 1600, height: 2000,
 *           alt: "Kort beskrivning av motivet",
 *           style: "Fineline", placement: "Underarm" },
 *
 *    3. Klart. Rutnätet, parallaxen och bildtexterna anpassar sig automatiskt
 *       efter hur många jobb som ligger i listan.
 *
 *  `style` och `placement` visas som bildtext under varje bild.
 * ---------------------------------------------------------------------------*/

import { asset } from "./media";

export type Work = {
  src: string;
  width: number;
  height: number;
  alt: string;
  /** Stil, visas i bildtexten. */
  style: string;
  /** Placering på kroppen, visas i bildtexten. */
  placement: string;
};

/** Sätt till true när listan innehåller studions egna foton. */
export const PORTFOLIO_IS_REAL_WORK = false;

const generated = (remoteFile: string, localFile: string, alt: string) =>
  asset(remoteFile, `portfolio/${localFile}`, 1856, 2304, alt);

export const portfolio: Work[] = [
  {
    ...generated(
      "hf_20260728_002304_5bd91e20-1aae-438f-b8da-df9935e4f141.png",
      "01-fineline-underarm.png",
      "Fineline-tatuering med tunna blomstjälkar på en underarm",
    ),
    style: "Fineline",
    placement: "Underarm",
  },
  {
    ...generated(
      "hf_20260728_002307_29f367ed-d79f-4ab1-88bc-133dabfd8be5.png",
      "02-blackwork-overarm.png",
      "Ornamental blackwork i täta geometriska band runt en överarm",
    ),
    style: "Blackwork",
    placement: "Överarm",
  },
  {
    ...generated(
      "hf_20260728_002309_5b05f411-f466-4147-b837-774bbc12481b.png",
      "03-realism-axel.png",
      "Svartgrå realism med ett vargmotiv över axel och överarm",
    ),
    style: "Svartgrått",
    placement: "Axel",
  },
  {
    ...generated(
      "hf_20260728_002311_eb33eebd-7c8b-41c4-b9fc-d24071c3aaaf.png",
      "04-mandala-underarm.png",
      "Symmetrisk mandala med fin punktskuggning på en underarm",
    ),
    style: "Ornamental",
    placement: "Underarm",
  },
  {
    ...generated(
      "hf_20260728_002421_6dd91fea-9406-49b1-8709-5424504c0ef7.png",
      "05-fineline-nyckelben.png",
      "Litet fineline-motiv med måne och stjärna över nyckelbenet",
    ),
    style: "Fineline",
    placement: "Nyckelben",
  },
  {
    ...generated(
      "hf_20260728_002423_8dcf3c72-c5f3-4a8f-aaf4-da2fec83c7b3.png",
      "06-blackwork-vad.png",
      "Grafisk blackwork med massiv svärta och whip-shading på en vad",
    ),
    style: "Blackwork",
    placement: "Vad",
  },
  {
    ...generated(
      "hf_20260728_002426_45864384-a10e-460e-9a34-32a0a9e29267.png",
      "07-ornamental-hand.png",
      "Ornamental filigran med punktdetaljer på handryggen",
    ),
    style: "Ornamental",
    placement: "Hand",
  },
  {
    ...generated(
      "hf_20260728_002427_23c6bd52-b23a-445d-aaf8-547811a7bb7f.png",
      "08-realism-rygg.png",
      "Svartgrå ros med mjuka skuggningar över skulderbladet",
    ),
    style: "Svartgrått",
    placement: "Rygg",
  },
];

/** Delar upp jobben i N kolumner, i ordning, för parallaxrutnätet. */
export function portfolioColumns(count: number): Work[][] {
  const cols: Work[][] = Array.from({ length: count }, () => []);
  portfolio.forEach((w, i) => cols[i % count].push(w));
  return cols;
}
