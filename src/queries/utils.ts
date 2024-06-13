import {animeApi, apiKeys} from "@/lib/anime-api";
import { AnimeData } from "@/types";
import { QueryClient } from "@tanstack/react-query";
import { Image } from "expo-image";

export function fillCacheForAnimeData(
  anime: AnimeData,
  queryClient: QueryClient
) {
  if (anime.id === null) return;

  queryClient.setQueryData(
    apiKeys.anime(anime.id),
    animeApi.fakeResponse(anime)
  );
}

export function prefetchAnimeImage(
  anime: AnimeData,
  size: keyof AnimeData["images"] = "large"
) {
  if (anime.images[size]) {
    Image.prefetch(anime.images[size]!);
  }
}
