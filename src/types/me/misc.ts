import {
  JikanAnimeSearchOrder,
  JikanAnimeSearchParams,
  JikanAnimeSearchType,
  JikanAnimeStatus,
} from "@/types/jikan";

export type AnimeSearchType = JikanAnimeSearchType;
export type AnimeStatus = JikanAnimeStatus;
export type AnimeSearchOrder = JikanAnimeSearchOrder;
export type AnimeSearchParams = JikanAnimeSearchParams;

export type AnimeGenreType = "GENRE" | "EXPLICIT" | "THEME" | "DEMOGRAPHIC";
export interface AnimeGenre {
  id: number;
  name: string;
  total: number;
  type: AnimeGenreType;
}
