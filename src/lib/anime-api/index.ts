import {
  AnimeData,
  AnimeSearchParams,
  ApiPaginatedResponse,
  ApiResponse,
} from "@/types";
import jikan from "./jikan";
import { AxiosError, AxiosRequestConfig } from "axios";
import { MALID } from "@/types/jikan";
import {
  parseJikanAnime,
  parseJikanAnimeArray,
  parseJikanError,
} from "./jikan-parser";

type Res<T> = Promise<ApiResponse<T>>;
type PaginatedRes<T> = Promise<ApiPaginatedResponse<T>>;

class AnimeApi {
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
}

const animeApi = new AnimeApi();

export default animeApi;
