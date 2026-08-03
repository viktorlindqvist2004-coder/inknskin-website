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
    bio: "Tatuerar allt — från millimeterprecis fineline till massiv blackwork.",
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
    bio: "Färg och realism, med rötterna i old school och japanskt.",
    focus: ["Color work", "Realism", "Old school", "Japanese"],
    portrait: "/media/nick.jpg",
    portraitAlt: "Nick, tatuerare på Ink N Skin",
    portraitPosition: "center",
  },
] as const;

export const services = [
  { n: "01", title: "Custom design", body: "Ritat från grunden efter din idé." },
  { n: "02", title: "Fineline", body: "Tunna, exakta linjer." },
  { n: "03", title: "Blackwork", body: "Massiv svärta och grafisk form." },
  { n: "04", title: "Cover-up", body: "Nytt motiv ovanpå det gamla." },
  { n: "05", title: "Lettering", body: "Text som håller." },
  { n: "06", title: "Retusch", body: "Uppfräschning av linjer — även andras jobb." },
  { n: "07", title: "Piercing", body: "Steril utrustning och smycken som håller." },
] as const;

export const faq = [
  {
    q: "Hur bokar jag tid?",
    a: "DM på Instagram @inknskintattoo, eller kom förbi Kungsgatan 3 mån–fre 12:00–16:30.",
  },
  {
    q: "Vad kostar det?",
    a: "Beror på storlek och antal sittningar. Du får pris vid konsultationen, innan du bokar.",
  },
  {
    q: "Finns det åldersgräns?",
    a: "18 år och giltig legitimation. Inga undantag.",
  },
  {
    q: "Hur sköter jag den efteråt?",
    a: "Håll rent, smörj tunt, undvik bad och sol tills den läkt. Full eftervård får du med dig hem.",
  },
] as const;

export const nav = [
  { label: "Studion", href: "#studion" },
  { label: "Arbeten", href: "#arbeten" },
  { label: "Tatuerare", href: "#tatuerare" },
  { label: "Omdömen", href: "#omdomen" },
  { label: "Kontakt", href: "#kontakt" },
] as const;
