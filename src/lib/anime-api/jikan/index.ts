import jikanApi from "./jikan-api";
import { AxiosError, AxiosRequestConfig } from "axios";
import { MALID } from "@/types/jikan";
import {
  parseJikanAnime,
  parseJikanAnimeArray,
  parseJikanEpisodeArray,
  parseJikanError,
  parseJikanGenreArray,
} from "./jikan-parser";
import { AnimeApi } from "..";
import { AnimeSearchParams, AnimeTopParams } from "@/types";

class Jikan implements AnimeApi {
  error(...args: any[]) {
    return jikanApi.error(...args);
  }

  loading(...args: any[]) {
    return jikanApi.loading(...args);
  }

  fakeResponse<T>(data: T) {
    return jikanApi.fakeResponse(data).data;
  }

  private getError(e: unknown) {
    if (e instanceof AxiosError && e.response?.data) return e.response.data;

    throw e;
  }

  getFeaturedAnime(config?: AxiosRequestConfig) {
    return this.getTopAnime({ limit: 5, sfw: true }, config);
  }

  async getTopAnime(options: AnimeTopParams, config?: AxiosRequestConfig) {
    try {
      const { data } = await jikanApi.getTopAnime(options, config);
      return { ...data, data: parseJikanAnimeArray(data.data) };
    } catch (e) {
      throw parseJikanError(this.getError(e));
    }
  }

  async getAnimeFullById(id: MALID, config?: AxiosRequestConfig) {
    try {
      const { data } = await jikanApi.getAnimeFullById(id, config);
      return { data: parseJikanAnime(data.data) };
    } catch (e) {
      throw parseJikanError(this.getError(e));
    }
  }

  async getAnimeSearch(
    options: AnimeSearchParams,
    config?: AxiosRequestConfig
  ) {
    try {
      const { data } = await jikanApi.getAnimeSearch(options, config);
      return { ...data, data: parseJikanAnimeArray(data.data) };
    } catch (e) {
      throw parseJikanError(this.getError(e));
    }
  }

  async getAnimeGenres(config?: AxiosRequestConfig) {
    try {
      const { data } = await jikanApi.getAnimeGenres(config);
      return { data: parseJikanGenreArray(data.data) };
    } catch (e) {
      throw parseJikanError(this.getError(e));
    }
  }

  async getAnimeEpisodes(
    id: number,
    options?: { page?: number },
    config?: AxiosRequestConfig
  ) {
    try {
      const { data } = await jikanApi.getAnimeEpisodes(id, options, config);
      return { ...data, data: parseJikanEpisodeArray(data.data, id) };
    } catch (e) {
      throw parseJikanError(this.getError(e));
    }
  }
}

export const jikan = new Jikan();
