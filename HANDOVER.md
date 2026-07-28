# Överlämning till kund

Så här lämnar du över sidan till Ink N Skin så att **studion äger allt** och
**ingenting kostar pengar**.

---

## ⚠️ Läs det här först: Vercel Hobby får inte användas

Vercels gratisplan (Hobby) är enligt deras villkor **endast för personligt,
icke-kommersiellt bruk**. En kundsajt för ett företag som betalat för den
räknas som kommersiell användning.

Vercel skriver själva att de får stänga av eller ta bort projekt på
Hobby-planen "med eller utan förvarning". Att lägga studions sida där är alltså
en risk: den kan släckas utan varning, och för att göra det korrekt krävs
Pro-planen på 20 USD/månad.

Därför ligger rekommendationen nedan **inte** på Vercel.

---

## Rekommendation: Cloudflare Pages

Gratis, tillåter uttryckligen kommersiell användning och kundsajter, obegränsad
bandbredd, gratis SSL och eget domännamn. Inget kreditkort.

Sidan byggs som en **helt statisk export** (se `next.config.ts`), så den är
bara HTML, CSS och JS. Det betyder att den fungerar på i princip vilken värd
som helst — du är aldrig låst till någon.

### Ordningen spelar roll — börja inte på ditt eget konto

Du behöver **inget Cloudflare-konto**. Allt sätts upp direkt på kundens.

Frestelsen är att lägga upp sidan på sitt eget konto först och flytta den sen.
Gör inte det: **Cloudflare Pages har ingen funktion för att flytta ett projekt
mellan konton.** Till skillnad från GitHub, som har en färdig
"Transfer ownership"-knapp, måste ett Pages-projekt raderas och byggas upp på
nytt på det andra kontot — inklusive domänkoppling och miljövariabler.

Rätt ordning:

1. Kunden skapar kontona
2. Du överför GitHub-repot till dem
3. Kunden (eller du, inloggad på deras konto) kopplar Cloudflare Pages

Är kunden inte teknisk: sitt bredvid eller dela skärm. De skapar kontona med
sin egen e-post och sitt eget lösenord, du klickar. Då står allt på dem från
dag ett, utan att du någonsin äger något som måste flyttas senare.

### Steg för steg

**1. Kunden skapar två konton (gratis, 5 min)**

- GitHub → https://github.com/signup
- Cloudflare → https://dash.cloudflare.com/sign-up

**2. Flytta över koden till kundens GitHub**

I ditt repo: **Settings → General → längst ner → Transfer ownership**.
Skriv in kundens GitHub-användarnamn. Repot byter ägare med hela historiken —
gratis, och du kan be om att stå kvar som collaborator om du ska sköta
underhållet.

> Vill du behålla koden själv? Lägg i stället till kunden som collaborator
> under **Settings → Collaborators**. Men då äger de inte sidan, och det blir
> ditt konto som är i vägen den dag ni skiljs åt. Överföring är renare.

**3. Koppla Cloudflare Pages**

I Cloudflare: **Workers & Pages → Create → Pages → Connect to Git** → välj repot.

Byggkonfiguration:

| Fält | Värde |
| --- | --- |
| Framework preset | `Next.js (Static HTML Export)` |
| Build command | `npm run build` |
| Build output directory | `out` |

Klart. Varje push till `main` bygger och publicerar automatiskt.

**4. Domänen**

Domänen är det enda som kostar pengar, och den ska stå på **kunden**, inte på
dig — annars sitter de fast hos dig den dagen ni skiljs åt.

I Cloudflare Pages: **Custom domains → Set up a domain**. Cloudflare ger
instruktioner för DNS. SSL-certifikat sköts automatiskt och kostar inget.

> `inknskintattoo.se` svarade inte med studions innehåll när sidan byggdes —
> den verkar ha tappats och pekar nu någon annanstans. Kontrollera vem som
> äger den innan ni kopplar in den. Är den förlorad får studion registrera en
> ny domän (ca 100–150 kr/år hos t.ex. Loopia eller Namecheap).

---

## Alternativ

Alla tillåter kommersiell användning, till skillnad från Vercel Hobby.

| Värd | Gratis? | Kommentar |
| --- | --- | --- |
| **Cloudflare Pages** | Ja | Obegränsad bandbredd. Rekommenderas. |
| Netlify | Ja | 100 GB/månad. Lika enkelt, samma inställningar. |
| GitHub Pages | Ja | Enklast om kunden ändå har GitHub. Kräver en liten workflow-fil. |
| Vercel Pro | Nej, 20 USD/mån | Bara om kunden vill ha just Vercel. |

Eftersom bygget är statiskt går det också att ladda upp mappen `out/` med FTP
till ett vanligt webbhotell, om studion redan betalar för ett.

---

## Checklista: vad kunden ska ha

- [ ] Äger GitHub-repot (överfört, inte delat)
- [ ] Äger Cloudflare-kontot som sidan ligger på
- [ ] Äger domänregistreringen
- [ ] Har fått inloggningarna, inte du som mellanhand
- [ ] Vet att `lib/site.ts` styr adress, öppettider och texter

---

## Kvar att göra innan lansering

Inget blockerar längre en lansering. Punkterna nedan står kvar som historik och
en kvarvarande kvalitetshöjning. Allt finns också i README.

1. ~~Omdömena är platshållare~~ — **klart.** Tio riktiga Google-omdömen ligger
   nu i `lib/reviews.generated.json`, avskrivna ordagrant. Kontrollera att
   `userRatingCount` (90) och `rating` (5) stämmer mot studions Google-profil;
   de siffrorna går ut i strukturerad data och ska spegla verkligheten. Kör
   `npm run fetch-reviews` med en Places API-nyckel för att uppdatera dem
   automatiskt i framtiden.

2. ~~Portfoliobilderna är AI-genererat material~~ — **klart.** Portfolion,
   porträtten och loggan är studions egna. Bilderna är beskurna ur Instagram
   och därför något mjukare än originalen; be om originalfilerna när tillfälle
   ges och byt dem i `lib/portfolio.ts`.

3. ~~Åtta filer hämtas från en server ni inte äger~~ — **löst automatiskt.**
   De fyra filmerna och deras posterbilder hämtas hem av `npm run build`, som
   värden kör vid varje publicering, och serveras sedan från er egen domän.
   Ingenting att komma ihåg och inget manuellt steg.

   Vill ni kapa beroendet helt: committa `public/media/` efter första bygget,
   så hämtas ingenting alls i framtiden. `npm run check-media` bekräftar läget
   när som helst.

---

## Bygga lokalt

```bash
npm install
npm run dev      # utvecklingsserver på http://localhost:3000
npm run build    # bygger den statiska sidan till out/
npm start        # förhandsgranskar out/ lokalt
```
