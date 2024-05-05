import { ApiResponse, ObjectValues } from "@/types";
import { NineAnimeProvider } from "./9anime";
import ogAxios, { AxiosRequestConfig } from "axios";
import {
  AnimeResult,
  StreamApiResponse,
  StreamFindAnimeParams,
} from "@/types/stream";

type Res<T> = Promise<ApiResponse<T>>;

function convertResponse<T>(data: StreamApiResponse<T>) {
  if (data.success) return { data: data.data };
  else throw data.error;
}

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

  async getAnime(config?: AxiosRequestConfig): Res<AnimeResult[]> {
    const { data } = await this.provider.getAnime(config);
    return convertResponse(data);
  }

  async findAnime(params: StreamFindAnimeParams, config?: AxiosRequestConfig) {
    const { data } = await this.provider.findAnime(params, config);
    return convertResponse(data);
  }

  async getEpisodes(animeUrl: string, config: AxiosRequestConfig) {
    const { data } = await this.provider.getEpisodes(animeUrl, config);
    return convertResponse(data);
  }
}

export const streamingApi = new StreamingApi();
