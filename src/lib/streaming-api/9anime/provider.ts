import {
  StreamError,
  StreamApiResponse,
  AnimeResult,
  StreamFindAnimeParams,
} from "@/types/stream";
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

type Res<T> = Promise<AxiosResponse<StreamApiResponse<T>, StreamError>>;

export class NineAnimeProvider {
  public PROVIDER_NAME = "9ANIME";
  public BASE_PATH = "/9anime";

  private readonly axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
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
}
