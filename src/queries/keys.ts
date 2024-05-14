import { AnimeSearchParams } from "@/types";
import { StreamFindAnimeParams } from "@/types/stream";

export const apiKeys = {
  all: ["api"] as const,
  normal: () => ["normal", ...apiKeys.all] as const,
  infinite: () => ["infinite", ...apiKeys.all] as const,

  featured: () => [...apiKeys.normal(), "featured"] as const,
  top: () => [...apiKeys.infinite(), "top"] as const,
  search: (params: AnimeSearchParams) =>
    [...apiKeys.infinite(), "search", params] as const,
  genres: () => [...apiKeys.normal(), "genres"] as const,
  anime: (id: number) => [...apiKeys.normal(), "anime", id] as const,

  episodes: (id: number) => [...apiKeys.anime(id), "episodes"] as const,
};

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
