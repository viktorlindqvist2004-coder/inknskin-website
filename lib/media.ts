/**
 * Mediamanifest för stämningsmaterialet — hero, studiosektionen, bakgrunden
 * bakom tatuerarna och videopanelen i kontaktsektionen.
 *
 * `src` pekar **alltid** på egen domän. Filerna hämtas hem automatiskt av
 * `scripts/prepare-media.mjs`, som körs av `npm run build` innan Next startar.
 * Ingen miljövariabel, inget manuellt steg, ingenting att komma ihåg — den som
 * bara laddar upp filerna till GitHub och kopplar Vercel får ändå en sida som
 * serverar allt själv.
 *
 * `remote` är bara en nedladdningskälla för det skriptet, inte något sidan
 * länkar till. Ligger filen redan i public/media/ rörs den inte.
 *
 * Byta ut material: lägg din egen fil i public/media/ med samma namn som står
 * i `local`. Skriptet hoppar då över nedladdningen och din fil används.
 */

const REMOTE_BASE =
  "https://d8j0ntlcm91z4.cloudfront.net/user_3Gp8ZSPuuM6vEtGDVPzKDrG4V4O/";

export type Asset = {
  src: string;
  local: string;
  remote: string;
  width: number;
  height: number;
  alt: string;
};

export function asset(
  remoteFile: string,
  localFile: string,
  width: number,
  height: number,
  alt: string,
): Asset {
  const local = `/media/${localFile}`;
  return { src: local, local, remote: REMOTE_BASE + remoteFile, width, height, alt };
}

export type VideoAsset = {
  src: string;
  local: string;
  remote: string;
  poster: string;
};

function video(remoteFile: string, localFile: string, poster: Asset): VideoAsset {
  const local = `/media/${localFile}`;
  return { src: local, local, remote: REMOTE_BASE + remoteFile, poster: poster.src };
}

export const images = {
  studio: asset(
    "hf_20260727_234115_32511c8f-bead-45a8-8345-3f992cc817e7.png",
    "studio-wide.png",
    2752,
    1536,
    "Tatueringsstudion i mörker med en upplyst stol i ljuskäglan",
  ),
  needle: asset(
    "hf_20260727_234119_104831b9-433c-4555-8c37-c0a166afe741.png",
    "needle-macro.png",
    1856,
    2304,
    "Närbild på tatueringsmaskin som drar en fin svart linje på hud",
  ),
  ink: asset(
    "hf_20260727_234121_5e82909b-4767-49e5-a0b5-cadea18ebfa1.png",
    "ink-water.png",
    2752,
    1536,
    "Svart bläck som sprider sig i vatten mot svart bakgrund",
  ),
  corridor: asset(
    "hf_20260727_234133_33ecb011-c2af-41be-beb8-897cccc18fdc.png",
    "studio-vertical.png",
    1536,
    2752,
    "Mörk studiokorridor med varmt ljus över tatueringsstolen",
  ),
} as const;

/** 5-sekunders loopar. Varje film har sin startbild som poster, så första rutan
 *  ligger på plats direkt medan videon buffrar. */
export const videos = {
  hero: video(
    "hf_20260727_234328_7ef396b8-2bc9-48c4-8546-c4a0e633a691.mp4",
    "hero-studio.mp4",
    images.studio,
  ),
  heroVertical: video(
    "hf_20260727_234345_b464244d-675b-40b9-8933-911bb02a317d.mp4",
    "hero-studio-vertical.mp4",
    images.corridor,
  ),
  ink: video(
    "hf_20260727_234332_0b150431-adb9-4695-9b7e-011b97945863.mp4",
    "ink-bloom.mp4",
    images.ink,
  ),
  needle: video(
    "hf_20260727_234342_dcbcce99-abb5-42a2-9e6c-4537ed3d1f6a.mp4",
    "needle-macro.mp4",
    images.needle,
  ),
} as const;

/* Övriga bilder ligger utanför den här filen, eftersom de alltid finns i repot
   och aldrig behöver hämtas:
     · portfolion    → lib/portfolio.ts
     · tatuerarna    → `portrait` på varje person i lib/site.ts
     · loggan        → public/media/logo.png via components/ui/Logo.tsx */
