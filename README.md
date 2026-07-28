# Ink N Skin — tatueringsstudio i Trollhättan

Enkelsidig, animationstung webbplats för Ink N Skin Tatuering Studio,
Kungsgatan 16B, Trollhättan. Byggd för deploy på Vercel.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 ·
Motion (Framer Motion) · Lenis · självhostade variabla typsnitt via Fontsource.

---

## ⚠️ Två saker MÅSTE göras innan sidan går live

### 1. Omdömena är platshållare

Texterna i `lib/reviews.ts` är **exempel** — de är inte riktiga kundomdömen.
Att publicera påhittade omdömen som äkta är vilseledande marknadsföring och
bryter mot Googles villkor.

Hämta de riktiga:

```bash
export GOOGLE_MAPS_API_KEY=...        # Places API (New) måste vara aktiverat
node scripts/fetch-google-reviews.mjs # skriver lib/reviews.generated.json
```

Lägg sedan in dem i `lib/reviews.ts` och sätt `REVIEWS_VERIFIED = true`.
Först då skickas `aggregateRating` ut i den strukturerade datan — sidan
påstår aldrig något om betyg som inte är verifierat.

### 2. Bilderna och filmerna är AI-genererat stämningsmaterial

Allt media är genererat, inte fotograferat i studion. Det föreställer ingen
verklig person och inga verkliga tatueringar gjorda av studion.

**Portfoliobilderna** byts i `lib/portfolio.ts` — filen är byggd för just det.
Lägg studions foton i `public/media/portfolio/` och peka om varje rad:

```ts
{ src: "/media/portfolio/01.jpg", width: 1600, height: 2000,
  alt: "Kort beskrivning", style: "Fineline", placement: "Underarm" },
```

Rutnätet, parallaxen och bildtexterna anpassar sig automatiskt efter hur många
jobb som ligger i listan. Sätt `PORTFOLIO_IS_REAL_WORK = true` när det är gjort.

**Stämningsmaterialet** (hero, studiosektionen, bakgrunden bakom tatueraren)
byts i `lib/media.ts` — behåll filnamnen i `local`-fälten.

---

## Kom igång

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # produktionsbygge
npm run lint         # tsc --noEmit
```

## Media: CDN eller egen domän

Som standard laddas bilder och filmer från ett CDN. Inför lansering, hämta hem
dem så att sidan är självförsörjande:

```bash
node scripts/fetch-media.mjs          # → public/media/
echo "NEXT_PUBLIC_MEDIA_SOURCE=local" >> .env.local
```

Sätt samma miljövariabel i Vercels projektinställningar.

## Deploy till Vercel

1. **New Project** i Vercel → välj det här repot.
2. Framework preset upptäcks automatiskt (Next.js). Root Directory lämnas som
   den är — projektet ligger i repots rot. Inga byggkommandon behöver ändras.
3. Lägg till miljövariabeln `NEXT_PUBLIC_MEDIA_SOURCE` (`local` eller `remote`).
4. Peka domänen mot projektet och uppdatera `site.url` i `lib/site.ts` om
   domänen blir en annan än `inknskintattoo.se`.

> Notera: `inknskintattoo.se` svarade inte med studions innehåll när den här
> sidan byggdes — domänen verkar ha tappats och pekar nu någon annanstans.
> Kontrollera vem som äger den innan den kopplas till projektet.

## Redigera innehåll

Nästan all text ligger i två filer:

| Fil               | Innehåll                                                     |
| ----------------- | ------------------------------------------------------------ |
| `lib/site.ts`     | Adress, öppettider, tatuerare, tjänster, process, FAQ, meny   |
| `lib/reviews.ts`  | Omdömen                                                       |
| `lib/media.ts`    | Bild- och filmmanifest                                        |

Uppgifterna om studion (adress, tatuerare, bemannade tider) är hämtade från
publika företagslistningar — **dubbelkolla dem med studion** innan lansering.
Telefon och e-post är tomma i `lib/site.ts`; fylls de i dyker de upp
automatiskt i kontaktsektionen och i den strukturerade datan.

## Animationerna

| Var                | Vad                                                                        |
| ------------------ | -------------------------------------------------------------------------- |
| Hela sidan         | Lenis smooth scroll som driver samma rAF-loop som alla scrollanimationer     |
| Intro              | Preloader med räknare, ordmärke som staplas in, panel som delar sig uppåt    |
| Hero               | Filmisk bakgrundsloop med parallax + zoom, rubrik som lyfter och suddas ut   |
| Band under hero    | Marquee vars fart och riktning styrs av scrollhastigheten                    |
| Studion            | Text som tänds ord för ord i takt med scrollen + siffror som räknar upp      |
| Arbetet            | Radhover med ember-svep och förhandsbild som följer muspekaren               |
| Portfolio          | Tre kolumner i olika parallaxhastighet, bilder som öppnas med clip-path      |
| Tatueraren         | Gråskala → färg, namn som breddas via Archivos width-axel                    |
| Omdömen            | Två marquee-rader åt olika håll, betyg som räknas upp                        |
| Process            | Sticky kolumn med skena som fylls i takt med scrollen                        |
| FAQ                | Höjdanimerad dragspelsöppning                                                |
| Genomgående        | Egen markör, filmkorn, scrollprogress, magnetiska knappar                     |

Allt respekterar `prefers-reduced-motion`: smooth scroll och preloader stängs
av, och animationer kortas ned till noll.

## Kod

```
app/          layout, sida, globals.css, favicon, robots, sitemap
components/   en fil per sektion + ui/ med animationsprimitiver
lib/          innehåll, omdömen, mediamanifest
scripts/      fetch-media.mjs, fetch-google-reviews.mjs
```

`components/ui/SplitText.tsx` innehåller en viktig detalj: det maskade barnet
ligger helt utanför sin egen `overflow-hidden`-box, så en IntersectionObserver
på barnet skulle mäta noll och aldrig utlösas. Alla reveals observerar därför
det *omaskade* omslaget och driver barnet via varianter.
