# Ink N Skin — tatueringsstudio i Trollhättan

Enkelsidig, animationstung webbplats för Ink N Skin Tatuering Studio,
Kungsgatan 3, Trollhättan. Byggs som en statisk sida — se HANDOVER.md.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 ·
Motion (Framer Motion) · Lenis · självhostade variabla typsnitt via Fontsource.

---

## Omdömen

`lib/reviews.generated.json` innehåller **tio riktiga Google-omdömen**,
avskrivna ordagrant. Texterna får inte redigeras — Googles villkor kräver att
omdömen återges som de publicerats.

Sidan växlar automatiskt: så fort den filen har omdömen används de, annars
faller den tillbaka på exempeltexterna i `lib/reviews.ts`. Ingen flagga att
sätta, ingen kod att ändra.

Uppdatera dem automatiskt när det kommit nya:

```bash
export GOOGLE_MAPS_API_KEY=...   # Places API (New) måste vara aktiverat
npm run fetch-reviews
```

> `userRatingCount` (90) och `rating` (5) är satta för hand och går ut i
> strukturerad data. Kontrollera dem mot studions Google-profil — Google kräver
> att strukturerad data speglar verkligheten. Hämtar du via API:et sätts båda
> exakt av sig självt.

## ⚠️ Kvar innan sidan går live

### Åtta filer hämtas från ett CDN vi inte äger

Portfolion, porträtten och loggan ligger i repot. Men **stämningsmaterialet**
— hero-videon, bläckvideon, bakgrunden bakom tatuerarna och videopanelen i
kontaktsektionen, plus deras posterbilder — pekar fortfarande på ett CDN som
hör till verktyget de genererades med. Försvinner det blir hero-videon svart
utan att någon rört koden.

Kolla när som helst:

```bash
npm run build && npm run check-media
```

Hämta hem dem så sidan blir självförsörjande:

```bash
npm run fetch-media
echo "NEXT_PUBLIC_MEDIA_SOURCE=local" >> .env.local
npm run build && npm run check-media    # ska nu säga att inget hämtas utifrån
```

Sätt samma miljövariabel i värdens projektinställningar. **Gör det här innan
lansering** — det är den enda kvarvarande externa beroendet.

### Portfolio och porträtt

Båda innehåller riktiga foton, beskurna ur studions Instagram. Originalfilerna
är skarpare — byt när de finns.

- **Portfolion** redigeras i `lib/portfolio.ts`. Lägg filen i
  `public/media/portfolio/` och lägg till en rad. Rutnätet går från två till
  tre kolumner av sig självt vid sex jobb.
- **Porträtten** hör till respektive person i `lib/site.ts` (`portrait`).
  Saknas ett porträtt renderas ramen tom i stället för att visa fel person.

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

Sätt samma miljövariabel i värdens projektinställningar.

## Deploy

Sidan byggs som en **helt statisk export** — `npm run build` lägger färdig
HTML, CSS och JS i `out/`. Ingen server behövs, så den kan ligga på vilken
statisk värd som helst.

| Fält | Värde |
| --- | --- |
| Build command | `npm run build` |
| Output directory | `out` |

**Se [HANDOVER.md](./HANDOVER.md)** för hela överlämningen till studion,
inklusive varför Vercels gratisplan inte får användas för en kundsajt och
vilken värd som rekommenderas i stället.

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

## Underhåll

```bash
npm run lint          # tsc --noEmit
npm run build         # måste vara grön innan push
npm run check-media   # varnar om sidan hämtar filer utifrån
npm audit
```

### Om `npm audit`

`npm audit` rapporterar tre allvarliga sårbarheter i `postcss` och `sharp`.
Båda ligger **inuti Next.js egna beroenden**, inte bland våra — vår egen
postcss är redan patchad, och vi kör senaste Next. Den föreslagna åtgärden
(`npm audit fix --force`) skulle nedgradera Next till version 9 och förstöra
projektet. Kör den inte.

De är inte heller exploaterbara här: sidan byggs som statisk export, så
**ingen server kör i produktion**. Både postcss och sharp är byggverktyg som
bara bearbetar våra egna filer, och sharp anropas aldrig eftersom
bildoptimeringen är avstängd. De försvinner när Next uppdaterar sina inbakade
beroenden.

### TypeScript

Låst till version 6. Next.js 16 avvisar TypeScript 7 med
`does not provide the compiler API required by Next.js`. Uppgradera först när
Next har stöd för det.

## Kod

```
app/          layout, sida, globals.css, favicon, robots, sitemap, og.jpg
components/   en fil per sektion + ui/ med animationsprimitiver
lib/          innehåll, omdömen, portfolio, mediamanifest
scripts/      fetch-media, check-media, fetch-google-reviews
```

`components/ui/SplitText.tsx` innehåller en viktig detalj: det maskade barnet
ligger helt utanför sin egen `overflow-hidden`-box, så en IntersectionObserver
på barnet skulle mäta noll och aldrig utlösas. Alla reveals observerar därför
det *omaskade* omslaget och driver barnet via varianter.
