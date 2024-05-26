import {
  JikanAnimeFullData,
  JikanAnimeData,
  JikanError,
  JikanGenre,
  JikanPaginatedResponse,
  JikanResponse,
  JikanAnimeSearchParams,
  JikanTopAnimeParams,
  MALID,
  JikanEpisodeData,
} from "@/types/jikan";
import ogAxios, { AxiosRequestConfig, AxiosResponse } from "axios";

type Res<T> = Promise<AxiosResponse<JikanResponse<T>, JikanError>>;
type PaginatedRes<T> = Promise<
  AxiosResponse<JikanPaginatedResponse<T>, JikanError>
>;

class Jikan {
  readonly BASE_URL = "https://api.jikan.moe/v4";
  readonly axios = ogAxios.create({
    baseURL: this.BASE_URL,
  });

  error(..._: any[]): any {
    throw new Error("error thrown intentionally");
    return;
  }

  loading(..._: any[]): any {
    return new Promise((_, reject) => setTimeout(reject, 10000));
  }

  fakeResponse<T>(data: T): AxiosResponse<JikanResponse<T>> {
    return { data: { data: data } } as any;
  }

  getFeaturedAnime(config?: AxiosRequestConfig) {
    return this.getTopAnime({ limit: 5, sfw: true }, config);
  }

  getTopAnime(
    options: JikanTopAnimeParams,
    config?: AxiosRequestConfig
  ): PaginatedRes<JikanAnimeData[]> {
    const params = new URLSearchParams(options as any).toString();
    return this.axios.get(`/top/anime?${params}`, config);
  }

  getAnimeFullById(
    id: MALID,
    config?: AxiosRequestConfig
  ): Res<JikanAnimeFullData> {
    return this.axios.get(`/anime/${id}/full`, config);
  }

  getAnimeSearch(
    options: JikanAnimeSearchParams,
    config?: AxiosRequestConfig
  ): PaginatedRes<JikanAnimeData[]> {
    const params = new URLSearchParams(options as any).toString();
    return this.axios.get(`/anime?${params}`, config);
  }

  getAnimeGenres(config?: AxiosRequestConfig): Res<JikanGenre[]> {
    return this.axios.get("/genres/anime", config);
  }

  getAnimeEpisodes(
    id: MALID,
    options?: { page?: number },
    config?: AxiosRequestConfig
  ): PaginatedRes<JikanEpisodeData[]> {
    const params = new URLSearchParams(options as any).toString();
    return this.axios.get(`/anime/${id}/episodes?${params}`, config);
  }
}

const jikan = new Jikan();

export default jikan;
