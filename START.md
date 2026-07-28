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

1. Gå till https://vercel.com och logga in **med GitHub**.
2. **Add New → Project**
3. Välj repot du just skapade och klicka **Import**.
4. Rör ingenting i inställningarna. Klicka **Deploy**.

Vercel känner igen projektet av sig självt. Inga miljövariabler, inga
byggkommandon att fylla i.

Efter ett par minuter får du en adress som slutar på `.vercel.app`. Sidan är
live.

> Första bygget hämtar hem fyra filmer och fyra bilder som ligger på en extern
> server och lägger dem på din egen. Det sker automatiskt. Skulle bygget
> misslyckas med ett meddelande om media — klicka **Redeploy**. Nästan alltid
> är det ett tillfälligt nätverksfel.

## 4. Egen domän

I Vercel: **Settings → Domains → Add**. Följ instruktionerna för DNS hos den
som säljer domänen. SSL sköts automatiskt och kostar inget.

---

## Läs det här om sidan är köpt av en kund

Vercels gratisplan (Hobby) är enligt deras villkor **endast för personligt,
icke-kommersiellt bruk**, och de får stänga av projekt som bryter mot det utan
förvarning. En sida åt ett företag räknas som kommersiell användning.

Vill man inte betala för Vercel Pro fungerar sidan lika bra på **Cloudflare
Pages**, som uttryckligen tillåter kundsajter gratis. Samma flöde — logga in
med GitHub, välj repot — men två fält får fyllas i:

| Fält | Värde |
| --- | --- |
| Build command | `npm run build` |
| Build output directory | `out` |

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
