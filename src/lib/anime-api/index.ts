import {
  AnimeData,
  AnimeGenre,
  AnimeSearchParams,
  ApiPaginatedResponse,
  ApiResponse,
  EpisodeData,
} from "@/types";
import { jikan } from "./jikan";
import { AxiosRequestConfig } from "axios";
import { MALID } from "@/types/jikan";

type Res<T> = Promise<ApiResponse<T>>;
type PaginatedRes<T> = Promise<ApiPaginatedResponse<T>>;

export interface AnimeApi {
  error(...args: any[]): void;

  loading(...args: any[]): Promise<any>;

  fakeResponse<T>(data: T): ApiResponse<T>;

  getFeaturedAnime(config?: AxiosRequestConfig): PaginatedRes<AnimeData[]>;

  getTopAnime(
    options: AnimeSearchParams,
    config?: AxiosRequestConfig
  ): PaginatedRes<AnimeData[]>;

  getAnimeFullById(id: MALID, config?: AxiosRequestConfig): Res<AnimeData>;

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

const animeApi: AnimeApi = jikan;

export default animeApi;
