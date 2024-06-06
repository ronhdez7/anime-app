import { AnilistFuzzyDate } from "./misc";

export interface AnilistAnimeData {
  id: number;
  idMal: number | null;
  title: {
    english: string | null;
    romaji: string | null;
    native: string | null;
  } | null;
  type: string | null;
  status: string | null;
  description: string | null;
  startDate: AnilistFuzzyDate | null;
  endDate: AnilistFuzzyDate | null;
  episodes: number | null;
  coverImage: {
    extraLarge: string | null;
    large: string | null;
    medium: string | null;
    color: string | null;
  } | null;
  bannerImage: string | null;
}
