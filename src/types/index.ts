import {
  JikanAnimeData,
  JikanAnimeFullData,
  JikanAnimeSearchOrder,
  JikanAnimeSearchParams,
  JikanEpisodeData,
  JikanAnimeSearchType,
  JikanAnimeStatus,
} from "./jikan";

export * from "./helpers";

export type AnimeSearchType = JikanAnimeSearchType;
export type AnimeStatus = JikanAnimeStatus;
export type AnimeSearchOrder = JikanAnimeSearchOrder;
export type AnimeSearchParams = JikanAnimeSearchParams;

export type AnimeData = JikanAnimeData;
export type AnimeFullData = JikanAnimeFullData;

export type EpisodeData = JikanEpisodeData;
