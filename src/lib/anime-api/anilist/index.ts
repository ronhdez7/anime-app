import { MALID } from "@/types/jikan";
import { anilistApi } from "./anilist-api";
import { AxiosRequestConfig } from "axios";
import {
  parseAnilistAnime,
  parseAnilistAnimeArray,
  parseAnilistPagination,
  parseTopAnimeParams,
} from "./anilist-parser";
import { AnimeTopParams } from "@/types";
import { AnimeApi } from "..";

class Anilist {
  error(...args: any[]): any {
    return anilistApi.error(...args);
  }

  loading(...args: any[]): any {
    return anilistApi.loading(...args);
  }

  fakeResponse<T>(data: T) {
    return anilistApi.fakeResponse(data);
  }

  getFeaturedAnime(config?: AxiosRequestConfig) {
    return this.getTopAnime({ limit: 5, adult: false }, config);
  }

  async getTopAnime(
    options: AnimeTopParams,
    config?: AxiosRequestConfig
  ): ReturnType<AnimeApi["getTopAnime"]> {
    try {
      const { data } = await anilistApi.getTopAnime(
        parseTopAnimeParams(options),
        config
      );
      const animeList = data.data?.Page.media;
      return {
        data: animeList ? parseAnilistAnimeArray(animeList) : [],
        pagination: parseAnilistPagination(data.data?.Page.pageInfo),
      };
    } catch (e) {
      throw e;
    }
  }

  async getAnimeFullById(id: MALID, config?: AxiosRequestConfig) {
    try {
      const { data } = await anilistApi.getAnimeFullById(Number(id), config);
      const media = data.data?.Media;
      return { data: media ? parseAnilistAnime(media) : null };
    } catch (e) {
      throw e;
    }
  }
}

export const anilist = new Anilist();
