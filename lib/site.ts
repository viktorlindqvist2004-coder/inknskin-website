/**
 * All studio content lives here so copy can be edited without touching components.
 *
 * Gatuadressen kommer från studions egen Instagram-profil och från Nicks
 * (båda anger Kungsgatan 3). Företagsregistren listar fortfarande Kungsgatan
 * 16B — den uppgiften verkar vara inaktuell. Bekräfta med studion.
 *
 * Öppettider kommer från en publik katalog och bör också dubbelkollas.
 */

export const site = {
  name: "Ink N Skin",
  legalName: "Ink n Skin tatuering studio Trollhättan",
  tagline: "Tatueringsstudio i Trollhättan",
  city: "Trollhättan",
  /** Grundningsår, står på studions emblem. */
  est: 2023,
  url: "https://inknskintattoo.se",
  description:
    "Tatueringsstudio mitt i Trollhättan med över 13 års erfarenhet i branschen. Tatueringar i de flesta stilar och piercing, av Arash och Nick på Kungsgatan 3.",
} as const;

type Contact = {
  street: string;
  postal: string;
  city: string;
  country: string;
  mapsUrl: string;
  instagram: string;
  instagramHandle: string;
  tiktok: string;
  tiktokHandle: string;
  /** Lämna tom sträng för att dölja raden på sidan. */
  phone: string;
  email: string;
};

export const contact: Contact = {
  street: "Kungsgatan 3",
  postal: "461 63",
  city: "Trollhättan",
  country: "Sverige",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Ink+N+Skin+Kungsgatan+3+461+63+Trollh%C3%A4ttan",
  instagram: "https://www.instagram.com/inknskintattoo/",
  instagramHandle: "@inknskintattoo",
  tiktok: "https://www.tiktok.com/@inknskintattoo",
  tiktokHandle: "@inknskintattoo",
  /** Fyll i om studion vill visa telefon/e-post publikt. */
  phone: "",
  email: "",
};

export const hours = {
  staffed: [
    { day: "Måndag", time: "12:00 – 16:30" },
    { day: "Tisdag", time: "12:00 – 16:30" },
    { day: "Onsdag", time: "12:00 – 16:30" },
    { day: "Torsdag", time: "12:00 – 16:30" },
    { day: "Fredag", time: "12:00 – 16:30" },
    { day: "Lördag", time: "Bokning" },
    { day: "Söndag", time: "Stängt" },
  ],
  note: "Tider utanför bemannad öppettid bokas via DM eller direkt i studion.",
} as const;

/**
 * Lägg till fler objekt här om studion växer — sektionen byter automatiskt
 * från porträttlayout till rutnät när det finns mer än en tatuerare.
 *
 * `portrait` hör till tatueraren, inte till en separat lista. Tidigare
 * matchades bilder mot personer via listposition, vilket innebar att en tredje
 * tatuerare hade fått Arash ansikte. Saknas porträtt renderas ramen tom i
 * stället för att visa fel person.
 *
 * `portraitPosition` styr beskärningen i den stående ramen — behövs bara när
 * bilden inte redan är 4:5.
 */
export const artists = [
  {
    name: "Arash",
    role: "Tatuerare & grundare",
    handle: "@arash_tattooer",
    handleUrl: "https://www.instagram.com/arash_tattooer/",
    bio: "Startade Ink N Skin på Kungsgatan. Tatuerar allt — från millimeterprecis fineline till massiv blackwork.",
    focus: ["Fineline", "Blackwork", "Lettering", "Cover-up", "Ornamental"],
    portrait: "/media/arash.jpg",
    portraitAlt: "Arash koncentrerad över ett pågående jobb i studion",
    // Nästan kvadratiskt foto i stående ram — dras åt höger så huvudet ryms.
    portraitPosition: "92% center",
  },
  {
    name: "Nick",
    role: "Tatuerare",
    handle: "@nickk_tattooer",
    handleUrl: "https://www.instagram.com/nickk_tattooer/",
    bio: "Bygger i färg och realism, med rötterna i old school och japanskt. Stora motiv som tål att byggas över flera sittningar.",
    focus: ["Color work", "Realism", "Old school", "Japanese"],
    portrait: "/media/nick.jpg",
    portraitAlt: "Nick, tatuerare på Ink N Skin",
    portraitPosition: "center",
  },
] as const;

export const services = [
  {
    n: "01",
    title: "Custom design",
    body: "Ritat från grunden efter din idé. Du ser skissen innan nålen möter hud.",
  },
  {
    n: "02",
    title: "Fineline",
    body: "Tunna, exakta linjer som håller när bläcket lagt sig.",
  },
  {
    n: "03",
    title: "Blackwork",
    body: "Massiv svärta och grafisk form. Enskilda motiv eller hela armar.",
  },
  {
    n: "04",
    title: "Cover-up",
    body: "Nytt motiv ovanpå det gamla. Kom in så säger vi rakt vad som går.",
  },
  {
    n: "05",
    title: "Lettering",
    body: "Text som går att läsa om trettio år.",
  },
  {
    n: "06",
    title: "Retusch",
    body: "Uppfräschning av linjer och kontrast. Även andras jobb.",
  },
  {
    n: "07",
    title: "Piercing",
    body: "Steril utrustning och smycken som håller. Hör av dig för tid.",
  },
] as const;

export const process = [
  {
    n: "01",
    title: "Hör av dig",
    body: "DM med motiv, storlek och placering. Gärna referensbilder.",
  },
  {
    n: "02",
    title: "Konsultation",
    body: "Vi går igenom idén och du får pris innan något bokas.",
  },
  {
    n: "03",
    title: "Skiss",
    body: "Motivet ritas fram och justeras tills du är nöjd.",
  },
  {
    n: "04",
    title: "Sittning",
    body: "Steril utrustning, pauser när du behöver, eftervård med dig hem.",
  },
] as const;

export const faq = [
  {
    q: "Hur bokar jag tid?",
    a: "DM på Instagram @inknskintattoo, eller kom förbi Kungsgatan 3 mån–fre 12:00–16:30. Andra tider går också att boka.",
  },
  {
    q: "Vad kostar det?",
    a: "Beror på storlek, detaljer och antal sittningar. Du får en tydlig uppskattning vid konsultationen, innan du bokar.",
  },
  {
    q: "Finns det åldersgräns?",
    a: "Ja — 18 år och giltig legitimation. Inga undantag, inte heller med målsmans tillstånd.",
  },
  {
    q: "Hur förbereder jag mig?",
    a: "Sov, ät ordentligt och drick vatten. Ingen alkohol dygnet före. Ha kläder som gör området lätt att komma åt.",
  },
  {
    q: "Hur sköter jag den efteråt?",
    a: "Håll rent, smörj tunt, undvik bad, bastu och sol tills den läkt. Full eftervård får du med dig hem.",
  },
  {
    q: "Gör ni cover-ups?",
    a: "Ofta, ja. Hur mycket som går beror på den gamla tatueringen. Kom in för en bedömning.",
  },
] as const;

export const nav = [
  { label: "Studion", href: "#studion" },
  { label: "Arbeten", href: "#arbeten" },
  { label: "Tatuerare", href: "#tatuerare" },
  { label: "Omdömen", href: "#omdomen" },
  { label: "Kontakt", href: "#kontakt" },
] as const;
