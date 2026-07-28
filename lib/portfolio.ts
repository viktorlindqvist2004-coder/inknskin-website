/* =============================================================================
 *  PORTFOLIO — riktiga arbeten från studion
 * =============================================================================
 *
 *  Bilderna ligger i `public/media/portfolio/` och är beskurna ur studions och
 *  tatuerarnas egna Instagram-inlägg. De är alltså skärmdumpar, inte original —
 *  be om originalfilerna när det går, så blir de skarpare.
 *
 *  Lägga till fler: släpp filen i mappen och lägg till en rad nedan. Rutnätet,
 *  parallaxen och bildtexterna anpassar sig efter hur många som ligger i listan.
 * ---------------------------------------------------------------------------*/

export type Work = {
  src: string;
  width: number;
  height: number;
  /** Beskrivning för skärmläsare och sökmotorer. Ta med placering här. */
  alt: string;
  /** Visas till vänster i bildtexten. */
  style: string;
  /** Visas till höger i bildtexten — vem som gjort jobbet. */
  artist: string;
};

const work = (
  file: string,
  alt: string,
  style: string,
  artist: string,
): Work => ({
  src: `/media/portfolio/${file}`,
  width: 1200,
  height: 1500,
  alt,
  style,
  artist,
});

/* Ordningen är medvetet omlottlagd: rutnätet fördelar posterna kolumnvis med
   index % antal kolumner, så varvade tatuerare ger en blandning i varje
   kolumn i stället för att klumpa ihop dem. */
export const portfolio: Work[] = [
  work(
    "arash-02-orm.jpg",
    "Orm och liljor i fineline på underarm, tunna rena linjer",
    "Fineline",
    "Arash",
  ),
  work(
    "nick-01-duva.jpg",
    "Duva och örn bland moln och ljusstrålar i svartgrått, underarm",
    "Svartgrått",
    "Nick",
  ),
  work(
    "arash-03-tiger.jpg",
    "Tigerblick i svartgrå realism med bärnstensfärgade ögon, underarm",
    "Realism",
    "Arash",
  ),
  work(
    "nick-02-rosor.jpg",
    "Rosor med minnesdatum på banderoll i svartgrått, underarm",
    "Svartgrått",
    "Nick",
  ),
  work(
    "arash-01-skelett.jpg",
    "Skelett i bön med draperi, svartgrå realism med punktskuggning på överarm",
    "Realism",
    "Arash",
  ),
  work(
    "nick-03-stjarna.jpg",
    "Stjärna med mjuk skuggning på överarm",
    "Old school",
    "Nick",
  ),
  work(
    "arash-04-skalle.jpg",
    "Ansikte som övergår i kranium, tät svartgrå detaljering på lår",
    "Svartgrått",
    "Arash",
  ),
  work(
    "arash-05-serenity.jpg",
    "Handskriven bön med kerub, duva och ornamentalt kors i rött, underarm",
    "Lettering",
    "Arash",
  ),
];

/** Delar upp jobben i N kolumner, i ordning, för parallaxrutnätet. */
export function portfolioColumns(count: number): Work[][] {
  const cols: Work[][] = Array.from({ length: count }, () => []);
  portfolio.forEach((w, i) => cols[i % count].push(w));
  return cols;
}
