import animeApi from "@/lib/anime-api";
import { useApiInfiniteQuery } from "./use-api-query";
import { apiKeys } from "./keys";
import { ID } from "@/types";

export function useAnimeEpisodes(id: ID | null, params?: { page?: number }) {
  return useApiInfiniteQuery({
    queryKey: apiKeys.episodes(Number(id)),
    queryFn: ({ signal }) =>
      animeApi.getAnimeEpisodes(Number(id), params, { signal }),
    enabled: !!id?.toString(),
  });
}
