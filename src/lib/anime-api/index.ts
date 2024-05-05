import {
  AnimeData,
  AnimeGenre,
  AnimeSearchParams,
  ApiPaginatedResponse,
  ApiResponse,
  EpisodeData,
} from "@/types";
import jikan from "./jikan";
import { AxiosError, AxiosRequestConfig } from "axios";
import { MALID } from "@/types/jikan";
import {
  parseJikanAnime,
  parseJikanAnimeArray,
  parseJikanEpisodeArray,
  parseJikanError,
  parseJikanGenreArray,
} from "./jikan/jikan-parser";

type Res<T> = Promise<ApiResponse<T>>;
type PaginatedRes<T> = Promise<ApiPaginatedResponse<T>>;

class AnimeApi {
  error(...args: any[]) {
    return jikan.error(...args);
  }

  loading(...args: any[]) {
    return jikan.loading(...args);
  }

  fakeResponse<T>(data: T): ApiResponse<T> {
    return jikan.fakeResponse(data).data;
  }

  private getError(e: unknown): any {
    if (e instanceof AxiosError && e.response?.data) return e.response.data;

    throw e;
  }

  getFeaturedAnime(config?: AxiosRequestConfig) {
    return this.getTopAnime({ limit: 5, sfw: true }, config);
  }

  async getTopAnime(
    options: AnimeSearchParams,
    config?: AxiosRequestConfig
  ): PaginatedRes<AnimeData[]> {
    try {
      const { data } = await jikan.getTopAnime(options, config);
      return { ...data, data: parseJikanAnimeArray(data.data) };
    } catch (e) {
      throw parseJikanError(this.getError(e));
    }
  }

  async getAnimeFullById(
    id: MALID,
    config?: AxiosRequestConfig
  ): Res<AnimeData> {
    try {
      const { data } = await jikan.getAnimeFullById(id, config);
      return { data: parseJikanAnime(data.data) };
    } catch (e) {
      throw parseJikanError(this.getError(e));
    }
  }

  async getAnimeSearch(
    options: AnimeSearchParams,
    config?: AxiosRequestConfig
  ): PaginatedRes<AnimeData[]> {
    try {
      const { data } = await jikan.getAnimeSearch(options, config);
      return { ...data, data: parseJikanAnimeArray(data.data) };
    } catch (e) {
      throw parseJikanError(this.getError(e));
    }
  }

  async getAnimeGenres(config?: AxiosRequestConfig): Res<AnimeGenre[]> {
    try {
      const { data } = await jikan.getAnimeGenres(config);
      return { data: parseJikanGenreArray(data.data) };
    } catch (e) {
      throw parseJikanError(this.getError(e));
    }
  }

  async getAnimeEpisodes(
    id: number,
    options?: { page?: number },
    config?: AxiosRequestConfig
  ): PaginatedRes<EpisodeData[]> {
    try {
      const { data } = await jikan.getAnimeEpisodes(id, options, config);
      return { ...data, data: parseJikanEpisodeArray(data.data, id) };
    } catch (e) {
      throw parseJikanError(this.getError(e));
    }
  }
}

const animeApi = new AnimeApi();

export default animeApi;
