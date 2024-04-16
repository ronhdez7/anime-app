import {
  JikanAnimeData,
  JikanError,
  JikanFullAnimeData,
  JikanPaginatedResponse,
  JikanRating,
  JikanResponse,
  MALID,
} from "@/types/jikan";
import ogAxios, { AxiosRequestConfig, AxiosResponse } from "axios";

type Res<T> = Promise<AxiosResponse<JikanResponse<T>, JikanError>>;
type PaginatedRes<T> = Promise<
  AxiosResponse<JikanPaginatedResponse<T>, JikanError>
>;

interface TopAnimeOptions {
  // prettier-ignore
  type?: "tv" | "movie" | "ova" | "special" | "ona" | "music" | "cm" | "pv" | "tv_special";
  filter?: "airing" | "upcoming" | "bypopularity" | "favorite";
  rating?: JikanRating;
  sfw?: boolean;
  page?: number;
  limit?: number;
}

interface AnimeSearchOptions extends Omit<TopAnimeOptions, "filter"> {
  unapproved?: boolean;
  q?: string;
  score?: number;
  min_score?: number;
  max_score?: number;
  status?: "airing" | "complete" | "upcoming";
  genres?: number[];
  generes_exclude?: number[];
  // prettier-ignore
  order_by?: "mal_id" | "title" | "start_date" | "end_date" | "episodes" | "score" | "scored_by" | "rank" | "popularity" | "members" | "favorites"
  sort?: "desc" | "asc";
  letter?: string;
  producers?: number[];
  start_date?: string;
  end_date?: string;
}

class Jikan {
  readonly BASE_URL = "https://api.jikan.moe/v4";
  readonly axios = ogAxios.create({
    baseURL: this.BASE_URL,
  });

  getTopAnime(
    options: TopAnimeOptions = {},
    config?: AxiosRequestConfig
  ): PaginatedRes<JikanAnimeData[]> {
    const params = new URLSearchParams(options as any).toString();
    return this.axios.get(`/top/anime?${params}`, config);
  }

  getAnimeFullById(
    id: MALID,
    config?: AxiosRequestConfig
  ): Res<JikanFullAnimeData> {
    return this.axios.get(`/anime/${id}/full`, config);
  }

  getAnimeSearch(
    options: AnimeSearchOptions = {},
    config?: AxiosRequestConfig
  ): PaginatedRes<JikanAnimeData[]> {
    const params = new URLSearchParams(options as any).toString();
    return this.axios.get(`/anime?${params}`, config);
  }
}

const jikan = new Jikan();

export default jikan;
