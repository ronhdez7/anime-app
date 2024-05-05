export type StreamAnimeType =
  | "MOVIE"
  | "TV"
  | "OVA"
  | "ONA"
  | "SPECIAL"
  | "MUSIC";

export interface StreamFindAnimeParams {
  nineanimeid?: string;
  anicrushid?: string;
  title_en?: string;
  title?: string;
}
