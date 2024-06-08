import jikanApi from "./jikan-api";
import { AxiosError, AxiosRequestConfig } from "axios";
import {
  parseAnimeSearchParams,
  parseJikanAnime,
  parseJikanAnimeArray,
  parseJikanEpisodeArray,
  parseJikanError,
  parseJikanGenreArray,
  parseJikanPagination,
  parseTopAnimeParams,
} from "./jikan-parser";
import { AnimeSearchParams, AnimeTopParams, ID } from "@/types";
import { AnimeApi } from "../anime-api";

function getError(e: unknown) {
  if (e instanceof AxiosError && e.response?.data) return e.response.data;

  throw e;
}

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

  getFeaturedAnime(config?: AxiosRequestConfig) {
    return this.getTopAnime({ limit: 5, adult: false }, config);
  }

  async getTopAnime(
    options: AnimeTopParams,
    config?: AxiosRequestConfig
  ): ReturnType<AnimeApi["getTopAnime"]> {
    try {
      const { data } = await jikanApi.getTopAnime(
        parseTopAnimeParams(options),
        config
      );
      return {
        data: parseJikanAnimeArray(data.data ?? []),
        pagination: parseJikanPagination(data.pagination),
      };
    } catch (e) {
      throw parseJikanError(getError(e));
    }
  }

  async getAnimeFullById(id: ID, config?: AxiosRequestConfig) {
    try {
      const { data } = await jikanApi.getAnimeFullById(Number(id), config);
      return { data: data.data && parseJikanAnime(data.data) };
    } catch (e) {
      throw parseJikanError(getError(e));
    }
  }

  async getAnimeSearch(
    options: AnimeSearchParams,
    config?: AxiosRequestConfig
  ) {
    try {
      const params = parseAnimeSearchParams(options);
      const { data } = await jikanApi.getAnimeSearch(params, config);
      return {
        data: parseJikanAnimeArray(data.data ?? []),
        pagination: parseJikanPagination(data.pagination),
      };
    } catch (e) {
      throw parseJikanError(getError(e));
    }
  }

  async getAnimeGenres(config?: AxiosRequestConfig) {
    try {
      const { data } = await jikanApi.getAnimeGenres(config);
      return { data: parseJikanGenreArray(data.data ?? []) };
    } catch (e) {
      throw parseJikanError(getError(e));
    }
  }

  async getAnimeEpisodes(
    id: number,
    options?: { page?: number },
    config?: AxiosRequestConfig
  ) {
    try {
      const { data } = await jikanApi.getAnimeEpisodes(id, options, config);
      return {
        data: parseJikanEpisodeArray(data.data ?? [], id),
        pagination: parseJikanPagination(data.pagination),
      };
    } catch (e) {
      throw parseJikanError(getError(e));
    }
  }
}

export const jikan = new Jikan();
