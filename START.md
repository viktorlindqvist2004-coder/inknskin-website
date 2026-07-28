# Börja här

Det här är hela webbplatsen för Ink N Skin, som källkod. Packa upp, kör ett
kommando, lägg upp på GitHub. Räkna med tjugo minuter.

Du behöver **Node.js 20 eller senare** (https://nodejs.org) och **internet**.

---

## 1. Installera

```bash
cd inknskin-website
npm install
```

## 2. Gör paketet självförsörjande

```bash
npm run handover
```

**Det här steget är inte valfritt.** Fyra av filmerna och fyra bilder ligger
ännu på en server som varken du eller studion äger. Kommandot hämtar hem dem,
ställer om koden till att använda de lokala kopiorna, bygger sidan och
kontrollerar att ingenting längre hämtas utifrån.

Gör du inte det här ligger sidan och hänger på någon annans server, och den
dagen den servern släcks blir hero-videon svart utan att någon rört koden.

> Går det inte att köra? Kommandot avbryter utan att ha ändrat någonting, så
> det är riskfritt att försöka igen. Vanligaste orsaken är blockerad utgående
> trafik — prova en annan uppkoppling. Svarar servern inte alls längre måste
> materialet ersättas; se avsnittet **Media** i `README.md`.

## 3. Titta på den

```bash
npm run dev
```

Öppna http://localhost:3000.

## 4. Lägg upp den på GitHub

Skapa ett tomt repo på GitHub — **utan** README, .gitignore eller licens.
Sedan:

```bash
git init
git add -A
git commit -m "Ink N Skin"
git branch -M main
git remote add origin https://github.com/ANVÄNDARE/REPO.git
git push -u origin main
```

## 5. Publicera

Cloudflare Pages, gratis och tillåter kundsajter:

**Workers & Pages → Create → Pages → Connect to Git** → välj repot.

| Fält | Värde |
| --- | --- |
| Framework preset | `Next.js (Static HTML Export)` |
| Build command | `npm run build` |
| Build output directory | `out` |

Inga miljövariabler behövs. Varje push till `main` bygger och publicerar om.

---

## Sedan då?

| Fil | Vad den svarar på |
| --- | --- |
| `HANDOVER.md` | Vem ska äga vad, och varför inte Vercel |
| `README.md` | Hur sidan fungerar, hur man ändrar innehåll |
| `lib/site.ts` | Adress, öppettider, tatuerare, tjänster, texter |

## Två saker att stämma av med studion

Uppgifterna är hämtade från publika listningar och bör bekräftas innan sidan
blir publik:

- **Adressen.** Sidan säger Kungsgatan 3. Bolagsregistret säger Kungsgatan 16B.
- **Betyget.** Sidan säger 5,0 och "Över 90 recensioner". De siffrorna går ut i
  strukturerad data till Google och ska spegla verkligheten.
