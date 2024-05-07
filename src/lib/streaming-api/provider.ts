import {
  StreamError,
  StreamApiResponse,
  AnimeResult,
  StreamFindAnimeParams,
  EpisodeResult,
} from "@/types/stream";
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

type Res<T> = Promise<AxiosResponse<StreamApiResponse<T>, StreamError>>;

export class StreamProvider {
  public BASE_PATH: string;

  public readonly axios: AxiosInstance;

  constructor(axios: AxiosInstance, path: string) {
    this.axios = axios;
    this.BASE_PATH = path;
  }

  getAnime(config?: AxiosRequestConfig): Res<AnimeResult[]> {
    return this.axios.get(this.BASE_PATH, config);
  }

  findAnime(
    by: StreamFindAnimeParams,
    config?: AxiosRequestConfig
  ): Res<AnimeResult | null> {
    const params = new URLSearchParams(by as any).toString();
    return this.axios.get(`${this.BASE_PATH}/find?${params}`, config);
  }

  getEpisodes(
    animeUrl: string,
    config?: AxiosRequestConfig
  ): Res<EpisodeResult[]> {
    return this.axios.get(`${this.BASE_PATH}/episodes?url=${animeUrl}`, config);
  }
}
