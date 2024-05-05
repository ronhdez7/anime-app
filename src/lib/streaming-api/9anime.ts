import { AxiosInstance, AxiosRequestConfig } from "axios";

export class NineAnimeProvider {
  public PROVIDER_NAME = "9ANIME";
  public BASE_PATH = "/9anime";

  private readonly axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  getAnime(config?: AxiosRequestConfig) {
    return this.axios.get(this.BASE_PATH, config);
  }
}
