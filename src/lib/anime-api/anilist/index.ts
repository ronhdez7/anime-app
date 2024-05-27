import { MALID } from "@/types/jikan";
import { anilistApi } from "./anilist-api";
import { AxiosRequestConfig } from "axios";
import { parseAnilistAnime } from "./anilist-parser";

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

  // getFeaturedAnime(config?: AxiosRequestConfig) {
  //   return this.getTopAnime({ limit: 5, sfw: true }, config);
  // }

  // getTopAnime(
  //   options: AnilistTopAnimeParams,
  //   config?: AxiosRequestConfig
  // ): PaginatedRes<AnilistAnimeData[]> {
  //   const params = new URLSearchParams(options as any).toString();
  //   return this.axios.get(`/top/anime?${params}`, config);
  // }

  async getAnimeFullById(id: MALID, config?: AxiosRequestConfig) {
    try {
      const { data } = await anilistApi.getAnimeFullById(Number(id), config);
      return { data: parseAnilistAnime(data.data?.Media!) };
    } catch (e) {
      throw e;
    }
  }
}

export const anilist = new Anilist();
