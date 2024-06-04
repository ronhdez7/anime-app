import {
  AnimeData,
  AnimeGenre,
  AnimeSearchParams,
  AnimeTopParams,
  ApiPaginatedResponse,
  ApiResponse,
  EpisodeData,
} from "@/types";
import { jikan } from "./jikan";
import { AxiosRequestConfig } from "axios";
import { MALID } from "@/types/jikan";
import { anilist } from "./anilist";

type Res<T> = Promise<ApiResponse<T>>;
type PaginatedRes<T> = Promise<ApiPaginatedResponse<T>>;

export interface AnimeApi {
  error(...args: any[]): void;

  loading(...args: any[]): Promise<any>;

  fakeResponse<T>(data: T): ApiResponse<T>;

  getFeaturedAnime(config?: AxiosRequestConfig): PaginatedRes<AnimeData[]>;

  getTopAnime(
    options: AnimeTopParams,
    config?: AxiosRequestConfig
  ): PaginatedRes<AnimeData[]>;

  getAnimeFullById(
    id: MALID,
    config?: AxiosRequestConfig
  ): Res<AnimeData | null>;

  getAnimeSearch(
    options: AnimeSearchParams,
    config?: AxiosRequestConfig
  ): PaginatedRes<AnimeData[]>;

  getAnimeGenres(config?: AxiosRequestConfig): Res<AnimeGenre[]>;

  getAnimeEpisodes(
    id: number,
    options?: { page?: number },
    config?: AxiosRequestConfig
  ): PaginatedRes<EpisodeData[]>;
}

const animeApi: AnimeApi = {
  error: jikan.error.bind(jikan),
  loading: jikan.loading.bind(jikan),
  fakeResponse: jikan.fakeResponse.bind(jikan),
  getAnimeEpisodes: jikan.getAnimeEpisodes.bind(jikan),
  getAnimeFullById: anilist.getAnimeFullById.bind(anilist),
  getAnimeGenres: jikan.getAnimeGenres.bind(jikan),
  getAnimeSearch: anilist.getAnimeSearch.bind(anilist),
  getFeaturedAnime: anilist.getFeaturedAnime.bind(anilist),
  getTopAnime: anilist.getTopAnime.bind(anilist),
};

export default animeApi;
