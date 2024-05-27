import {
  AnilistAnimeData,
  AnilistGenre,
  AnilistPaginatedResponse,
  AnilistResponse,
  AnilistId,
} from "@/types/anilist";
import ogAxios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { getAnimeDataQuery } from "./gql/get-anime-data";

type Res<T> = Promise<AxiosResponse<AnilistResponse<T>>>;
type PaginatedRes<T> = Promise<AxiosResponse<AnilistPaginatedResponse<T>>>;

class Anilist {
  readonly BASE_URL = "https://graphql.anilist.co";
  readonly axios = ogAxios.create({
    baseURL: this.BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  error(..._: any[]): any {
    throw new Error("error thrown intentionally");
    return;
  }

  loading(..._: any[]): any {
    return new Promise((_, reject) => setTimeout(reject, 10000));
  }

  fakeResponse<T>(data: T): AxiosResponse<AnilistResponse<T>> {
    return { data: { data: data } } as any;
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

  getAnimeFullById(
    id: AnilistId,
    config?: AxiosRequestConfig
  ): Res<{ Media: AnilistAnimeData }> {
    console.log(getAnimeDataQuery({ animeId: id }));
    return this.axios.post("", getAnimeDataQuery({ animeId: id }), config);
  }

  // getAnimeSearch(
  //   options: AnilistAnimeSearchParams,
  //   config?: AxiosRequestConfig
  // ): PaginatedRes<AnilistAnimeData[]> {
  //   const params = new URLSearchParams(options as any).toString();
  //   return this.axios.get(`/anime?${params}`, config);
  // }

  getAnimeGenres(config?: AxiosRequestConfig): Res<AnilistGenre[]> {
    return this.axios.get("/genres/anime", config);
  }

  // getAnimeEpisodes(
  //   id: AnilistId,
  //   options?: { page?: number },
  //   config?: AxiosRequestConfig
  // ): PaginatedRes<AnilistEpisodeData[]> {
  //   const params = new URLSearchParams(options as any).toString();
  //   return this.axios.get(`/anime/${id}/episodes?${params}`, config);
  // }
}

export const anilistApi = new Anilist();
