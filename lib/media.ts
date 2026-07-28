/**
 * Mediamanifest för stämningsmaterialet — hero, studiosektionen, bakgrunden
 * bakom tatuerarna och videopanelen i kontaktsektionen.
 *
 * Allt ligger i `public/media/` och serveras från egen domän. Sidan hämtar
 * ingenting från externa värdar; kontrollera med `npm run check-media`.
 *
 * Looparna är byggda av studions egna foton med en långsam åkning, renderade
 * framlänges och sedan hopfogade med sin egen spegelvändning så sista rutan
 * är identisk med den första — därför syns inget hopp när de loopar.
 *
 * Byta ut en loop: lägg en ny .mp4 (H.264, yuv420p, utan ljudspår) i
 * `public/media/`, plus en poster som är dess första bildruta, och peka om
 * raden nedan. Ljudspår bör utelämnas — webbläsare är strängare mot media som
 * kan låta.
 */

export type VideoAsset = {
  /** H.264 — spelas av i princip alla webbläsare, inklusive Safari och iOS. */
  mp4: string;
  /** VP9 — reserv för byggen utan patentbelagda kodekar, t.ex. vissa Linux-
   *  och Chromium-varianter där H.264 saknas helt. */
  webm: string;
  poster: string;
};

const clip = (name: string): VideoAsset => ({
  mp4: `/media/${name}.mp4`,
  webm: `/media/${name}.webm`,
  poster: `/media/${name}-poster.jpg`,
});

export const videos = {
  hero: clip("hero-studio"),
  heroVertical: clip("hero-studio-vertical"),
  ink: clip("ink-bloom"),
  needle: clip("needle-macro"),
} as const;

/* Övriga bilder ligger utanför den här filen:
     · portfolion    → lib/portfolio.ts
     · tatuerarna    → `portrait` på varje person i lib/site.ts
     · loggan        → public/media/logo.png via components/ui/Logo.tsx */
