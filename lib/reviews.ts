/* =============================================================================
 *  OMDÖMEN
 * =============================================================================
 *
 *  Sidan visar riktiga Google-omdömen så fort de finns, annars platshållare.
 *  Du behöver inte redigera den här filen — kör bara:
 *
 *      export GOOGLE_MAPS_API_KEY=...     # Places API (New) måste vara aktiverat
 *      npm run fetch-reviews
 *
 *  Skriptet fyller `lib/reviews.generated.json`, och allt nedan växlar över av
 *  sig självt: texterna, snittbetyget, antalet och aggregateRating i den
 *  strukturerade datan.
 *
 *  Så länge den filen är tom används EXEMPELTEXTERNA längst ned. De är inte
 *  riktiga kundomdömen. Att publicera påhittade omdömen som äkta är
 *  vilseledande marknadsföring och bryter mot Googles villkor — därför skickas
 *  inget betyg ut i strukturerad data förrän riktiga omdömen är på plats.
 * ---------------------------------------------------------------------------*/

import generated from "./reviews.generated.json";

export type Review = {
  /** Visningsnamn. Vid riktiga Google-omdömen: namnet som recensenten själv publicerat. */
  author: string;
  /** 1–5 */
  rating: number;
  /** Själva omdömestexten. Återges ordagrant — Googles villkor tillåter inte redigering. */
  body: string;
  /** Valfri kontext, t.ex. vilken typ av jobb det gällde. Bara för platshållarna. */
  context?: string;
  /** Valfri källa, t.ex. "Google" eller "Instagram". */
  source?: string;
};

/** Exempeltexter. Används bara så länge inga riktiga omdömen hämtats. */
const PLACEHOLDERS: Review[] = [
  {
    author: "Exempelkund 1",
    rating: 5,
    body: "Superproffsigt bemötande från första DM:et till sista sittningen. De tog sig tid att rita om skissen tills den satt precis rätt, och resultatet blev bättre än vad jag hade i huvudet.",
    context: "Blackwork, underarm",
    source: "Google",
  },
  {
    author: "Exempelkund 2",
    rating: 5,
    body: "Otroligt ren och trevlig studio mitt i stan. Kände mig lugn hela vägen, och de förklarade exakt vad de gjorde under tiden. Linjerna är knivskarpa.",
    context: "Fineline, nyckelben",
    source: "Google",
  },
  {
    author: "Exempelkund 3",
    rating: 5,
    body: "Hade en gammal ful tatuering som jag trodde var omöjlig att göra något åt. De var ärliga om vad som gick att göra och löste det snyggt — nu är det mitt favoritmotiv.",
    context: "Cover-up, överarm",
    source: "Google",
  },
  {
    author: "Exempelkund 4",
    rating: 5,
    body: "Första tatueringen och jag var rätt nervös. De var lugna, tog pauser när jag behövde och pushade aldrig på något jag inte ville. Kommer garanterat tillbaka.",
    context: "Första tatueringen",
    source: "Google",
  },
  {
    author: "Exempelkund 5",
    rating: 5,
    body: "Bra pris för kvaliteten och tydlig kommunikation kring vad det skulle kosta redan innan bokning. Inga överraskningar, bara ett riktigt bra jobb.",
    context: "Lettering, revben",
    source: "Google",
  },
  {
    author: "Exempelkund 6",
    rating: 5,
    body: "Har suttit flera gånger nu för att bygga ihop en hel arm. Varje sittning känns genomtänkt och de håller alltid tiden. Rekommenderar till alla i Trollhättan.",
    context: "Pågående sleeve",
    source: "Google",
  },
];

type GeneratedReview = { author?: string; rating?: number; body?: string; source?: string };

const fetched: Review[] = ((generated.reviews ?? []) as GeneratedReview[])
  .filter((r) => Boolean(r?.body && r.body.trim().length > 0))
  .map((r) => ({
    author: r.author || "Google-användare",
    rating: typeof r.rating === "number" ? r.rating : 5,
    body: (r.body ?? "").trim(),
    source: r.source ?? "Google",
  }));

/** True först när riktiga omdömen hämtats. Styr aggregateRating i StructuredData. */
export const REVIEWS_VERIFIED = fetched.length > 0;

export const reviews: Review[] = REVIEWS_VERIFIED ? fetched : PLACEHOLDERS;

/**
 * Google lämnar bara ut ett urval av omdömena via API:et, men `rating` och
 * `userRatingCount` gäller samtliga. Använd dem när de finns — annars skulle
 * sidan visa "5 omdömen" för en studio som i själva verket har femtio.
 */
export const reviewCount = REVIEWS_VERIFIED
  ? generated.userRatingCount || fetched.length
  : reviews.length;

export const averageRating = REVIEWS_VERIFIED
  ? (generated.rating ??
      Math.round((fetched.reduce((s, r) => s + r.rating, 0) / fetched.length) * 10) / 10)
  : Math.round((reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) * 10) / 10;
