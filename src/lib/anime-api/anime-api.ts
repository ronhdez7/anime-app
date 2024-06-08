import {
  AnimeData,
  AnimeGenre,
  AnimeSearchParams,
  AnimeTopParams,
  ApiPaginatedResponse,
  ApiResponse,
  EpisodeData,
  ID,
} from "@/types";
import { AxiosRequestConfig } from "axios";

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

  getAnimeFullById(id: ID, config?: AxiosRequestConfig): Res<AnimeData | null>;

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
