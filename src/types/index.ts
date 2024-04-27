import { UseInfiniteQueryResult, UseQueryResult } from "@tanstack/react-query";
import {
  JikanAnimeData,
  JikanAnimeFullData,
  JikanAnimeSearchOrder,
  JikanAnimeSearchParams,
  JikanEpisodeData,
  JikanAnimeSearchType,
  JikanAnimeStatus,
  JikanError,
} from "./jikan";
import { AxiosError } from "axios";

export * from "./helpers";

export type AnimeSearchType = JikanAnimeSearchType;
export type AnimeStatus = JikanAnimeStatus;
export type AnimeSearchOrder = JikanAnimeSearchOrder;
export type AnimeSearchParams = JikanAnimeSearchParams;

export type AnimeData = JikanAnimeData;
export type AnimeFullData = JikanAnimeFullData;
export type MaybeFullData = Partial<AnimeFullData> & AnimeData;

export type EpisodeData = JikanEpisodeData;

export type QueryResult<T> =
  | UseQueryResult<T, AxiosError<JikanError>>
  | UseInfiniteQueryResult<
      {
        pages: T[];
        pageParams: number[];
      },
      AxiosError<JikanError>
    >;
export type AnimeDataQueryResult = QueryResult<AnimeData[]>;
