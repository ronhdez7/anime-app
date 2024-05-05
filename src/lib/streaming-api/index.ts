import { ObjectValues } from "@/types";
import { NineAnimeProvider } from "./9anime";
import ogAxios, { AxiosRequestConfig } from "axios";

class StreamingApi {
  private axios = ogAxios.create({
    baseURL: "https://192.168.1.25:4000",
  });

  private providers = {
    "9ANIME": new NineAnimeProvider(this.axios),
  };
  private provider: ObjectValues<typeof this.providers> =
    this.providers["9ANIME"];

  changeProvider(name: keyof typeof this.providers) {
    this.provider = this.providers[name];
  }

  getAnime(config?: AxiosRequestConfig) {
    return this.provider.getAnime(config);
  }
}

export const streamingApi = new StreamingApi();
