import { ApiResponse } from "@/types";
import { NineAnimeProvider } from "./providers";
import ogAxios, { AxiosError, AxiosRequestConfig } from "axios";
import {
  AnimeResult,
  EpisodeResult,
  ServerResult,
  SourceResult,
  StreamApiResponse,
  StreamFindAnimeParams,
} from "@/types/stream";
import { StreamProvider } from "./provider";

type Res<T> = Promise<ApiResponse<T>>;

function convertResponse<T>(data: StreamApiResponse<T>): ApiResponse<T> {
  if (data.success) return { data: data.data, errors: [] };
  else throw data.error;
}

function handleError(e: unknown) {
  if (e instanceof AxiosError) {
    return e.response?.data;
  }
  return e;
}

class StreamingApi {
  private axios = ogAxios.create({
    baseURL: "http://192.168.1.25:4000",
  });

  private providers = {
    "9ANIME": new NineAnimeProvider(this.axios),
  };
  private provider: StreamProvider = this.providers["9ANIME"];

  changeProvider(name: keyof typeof this.providers) {
    this.provider = this.providers[name];
  }

  async getAnime(config?: AxiosRequestConfig): Res<AnimeResult[]> {
    try {
      const { data } = await this.provider.getAnime(config);
      return convertResponse(data);
    } catch (e) {
      throw handleError(e);
    }
  }

  async findAnime(
    params: StreamFindAnimeParams,
    config?: AxiosRequestConfig
  ): Res<AnimeResult | null> {
    try {
      const { data } = await this.provider.findAnime(params, config);
      return convertResponse(data);
    } catch (e) {
      throw handleError(e);
    }
  }

  async getEpisodes(
    animeUrl: string,
    config?: AxiosRequestConfig
  ): Res<EpisodeResult[]> {
    try {
      const { data } = await this.provider.getEpisodes(animeUrl, config);
      return convertResponse(data);
    } catch (e) {
      throw handleError(e);
    }
  }

  async getServers(
    episodeUrl: string,
    config?: AxiosRequestConfig
  ): Res<ServerResult[]> {
    try {
      const { data } = await this.provider.getServers(episodeUrl, config);
      return convertResponse(data);
    } catch (e) {
      throw handleError(e);
    }
  }

  async getSources(
    playerUrl: string,
    config?: AxiosRequestConfig
  ): Res<SourceResult> {
    try {
      const { data } = await this.provider.getSources(playerUrl, config);
      return convertResponse(data);
    } catch (e) {
      throw handleError(e);
    }
  }
}

export const streamingApi = new StreamingApi();

export const streamKeys = {
  all: ["stream"] as const,
  normal: () => ["normal", ...streamKeys.all] as const,
  infinite: () => ["infinite", ...streamKeys.all] as const,

  find: (params: StreamFindAnimeParams) =>
    [...streamKeys.normal(), "find", params] as const,
  episodes: (animeUrl: string) =>
    [...streamKeys.normal(), "episodes", animeUrl] as const,
  servers: (episodeUrl: string) =>
    [...streamKeys.normal(), "servers", episodeUrl] as const,
  sources: (playerUrl: string) =>
    [...streamKeys.normal(), "sources", playerUrl] as const,
};
