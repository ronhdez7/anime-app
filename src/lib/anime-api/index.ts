import {
  AnimeData,
  AnimeSearchParams,
  ApiPaginatedResponse,
  ApiResponse,
  EpisodeData,
} from "@/types";
import jikan from "./jikan";
import { AxiosError, AxiosRequestConfig } from "axios";
import { JikanGenre, MALID } from "@/types/jikan";
import {
  parseJikanAnime,
  parseJikanAnimeArray,
  parseJikanError,
} from "./jikan-parser";

type Res<T> = Promise<ApiResponse<T>>;
type PaginatedRes<T> = Promise<ApiPaginatedResponse<T>>;

class AnimeApi {
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

  async getAnimeGenres(config?: AxiosRequestConfig): Res<JikanGenre[]> {
    try {
      const { data } = await jikan.getAnimeGenres(config);
      return { data: data.data };
    } catch (e) {
      throw parseJikanError(this.getError(e));
    }
  }

  async getAnimeEpisodes(
    id: MALID,
    options?: { page?: number },
    config?: AxiosRequestConfig
  ): PaginatedRes<EpisodeData> {
    try {
      const { data } = await jikan.getAnimeEpisodes(id, options, config);
      return { ...data, data: data.data };
    } catch (e) {
      throw parseJikanError(this.getError(e));
    }
  }
}

const animeApi = new AnimeApi();

export default animeApi;
