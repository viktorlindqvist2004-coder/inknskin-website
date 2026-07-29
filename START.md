# Börja här

Det här är hela webbplatsen för Ink N Skin. Du behöver **inte** installera
något, inte öppna en terminal och inte kunna programmera. Packa upp mappen,
ladda upp den på GitHub, koppla en värd. Räkna med tjugo minuter.

---

## 1. Packa upp

Packa upp `inknskin-website.zip`. Du får en mapp som heter `inknskin-website`
med ett sextiotal filer i.

Öppna den inte i något program — den ska bara laddas upp som den är.

## 2. Lägg upp den på GitHub

1. Skapa ett konto på https://github.com/signup om du inte har ett.
2. Gå till https://github.com/new
3. Ge projektet ett namn, t.ex. `inknskin`.
4. Välj **Private** om du inte vill att koden ska vara offentlig.
5. Skapa **inte** README, .gitignore eller licens — de rutorna ska vara tomma.
6. Klicka **Create repository**.

På nästa sida, klicka **uploading an existing file**.

Dra in **innehållet** i mappen `inknskin-website` — alltså filerna och
undermapparna, inte den yttre mappen. Vänta tills allt laddats upp, skriv en
rad i rutan längst ner och klicka **Commit changes**.

> Ser det fel ut efteråt? `package.json` ska ligga direkt i roten på repot, inte
> i en undermapp. Ligger den fel drogs den yttre mappen in i stället för
> innehållet — radera repot och gör om steget.

## 3. Publicera

Sidan är förberedd för både Cloudflare och Vercel. Är den köpt av en kund,
välj Cloudflare — se rutan längre ner.

### Cloudflare

1. Gå till https://dash.cloudflare.com och logga in.
2. **Compute (Workers) → Create → Import a repository**
3. Välj repot och godkänn åtkomsten till GitHub.
4. Rör ingenting i inställningarna — `npm run build` och `npx wrangler deploy`
   är redan ifyllda och är precis rätt. Klicka **Deploy**.

Repot innehåller en `wrangler.jsonc` som talar om att det är en statisk sida i
mappen `out`. Inga fält att fylla i, inga miljövariabler.

### Vercel

1. Gå till https://vercel.com och logga in **med GitHub**.
2. **Add New → Project** → välj repot → **Import**
3. Rör ingenting. Klicka **Deploy**.

Efter ett par minuter får du en adress som slutar på `.workers.dev` respektive
`.vercel.app`. Sidan är live.

> Första bygget hämtar hem fyra filmer och fyra bilder som ligger på en extern
> server och lägger dem på din egen. Det sker automatiskt. Skulle bygget
> misslyckas med ett meddelande om media — klicka **Redeploy**. Nästan alltid
> är det ett tillfälligt nätverksfel.

> **Fastnar Cloudflares formulär med ett rött fel som `null is not an object`?**
> Det är ett fel i Cloudflares egen webbsida, inte i projektet — det dyker upp
> innan något bygge ens startat, så ingenting i koden kan orsaka det. Det
> händer oftast i mobilwebbläsare. Gör om steget på en dator, så brukar det
> gå igenom.

## 4. Egen domän

Cloudflare: **Settings → Domains & Routes → Add**.
Vercel: **Settings → Domains → Add**.

Följ instruktionerna för DNS hos den som säljer domänen. SSL sköts automatiskt
och kostar inget.

---

## Läs det här om sidan är köpt av en kund

Vercels gratisplan (Hobby) är enligt deras villkor **endast för personligt,
icke-kommersiellt bruk**, och de får stänga av projekt som bryter mot det utan
förvarning. En sida åt ett företag räknas som kommersiell användning.

Vill man inte betala för Vercel Pro fungerar sidan lika bra på **Cloudflare**,
som uttryckligen tillåter kundsajter gratis och har obegränsad bandbredd.

`HANDOVER.md` går igenom valet, och vem som bör äga vilket konto.

---

## Ändra innehåll sedan

Allt går att ändra direkt på github.com: klicka på filen, klicka på pennan,
spara. Värden bygger om automatiskt.

| Fil | Vad den styr |
| --- | --- |
| `lib/site.ts` | Adress, öppettider, tatuerare, tjänster, texter |
| `lib/portfolio.ts` | Bilderna i portfolion |
| `lib/reviews.generated.json` | Omdömena |

## Två saker att stämma av med studion

Uppgifterna är hämtade från publika listningar och bör bekräftas innan sidan
blir publik:

- **Adressen.** Sidan säger Kungsgatan 3. Bolagsregistret säger Kungsgatan 16B.
- **Betyget.** Sidan säger 5,0 och "Över 90 recensioner". De siffrorna går ut i
  strukturerad data till Google och ska spegla verkligheten.
