import {
  JikanAnimeData,
  JikanError,
  JikanFullAnimeData,
  JikanResponse,
  MALID,
} from "@/types/jikan";
import ogAxios, { AxiosRequestConfig, AxiosResponse } from "axios";

type Res<T> = Promise<AxiosResponse<JikanResponse<T>, JikanError>>;

class Jikan {
  readonly BASE_URL = "https://api.jikan.moe/v4";
  private readonly axios = ogAxios.create({
    baseURL: this.BASE_URL,
  });

  getTopAnime(config?: AxiosRequestConfig): Res<JikanAnimeData[]> {
    return this.axios.get("/top/anime", config);
  }

  getAnimeFullById(
    id: MALID,
    config?: AxiosRequestConfig
  ): Res<JikanFullAnimeData> {
    return this.axios.get(`/anime/${id}/full`, config);
  }

  getAnimeByGenre(
    genre: number | string,
    config?: AxiosRequestConfig
  ): Res<JikanAnimeData[]> {
    return this.axios.get(`/anime?genres=${genre}`, config);
  }
}

const jikan = new Jikan();

export default jikan;
