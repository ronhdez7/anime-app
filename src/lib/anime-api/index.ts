import { jikan } from "./jikan";
import { AnimeApi } from "./anime-api";
import { AnimeSearchParams } from "@/types";

export const animeApi: AnimeApi = {
  error: jikan.error.bind(jikan),
  loading: jikan.loading.bind(jikan),
  fakeResponse: jikan.fakeResponse.bind(jikan),
  getAnimeEpisodes: jikan.getAnimeEpisodes.bind(jikan),
  getAnimeFullById: jikan.getAnimeFullById.bind(jikan),
  getAnimeGenres: jikan.getAnimeGenres.bind(jikan),
  getAnimeSearch: jikan.getAnimeSearch.bind(jikan),
  getFeaturedAnime: jikan.getFeaturedAnime.bind(jikan),
  getTopAnime: jikan.getTopAnime.bind(jikan),
};

export const apiKeys = {
  all: ["anime-api", "jikan"] as const,
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
