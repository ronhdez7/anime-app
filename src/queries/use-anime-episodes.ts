import { MALID } from "@/types/jikan";
import animeApi from "@/lib/anime-api";
import { apiKeys, useApiInfiniteQuery } from "./use-api-query";

export function useAnimeEpisodes(id?: MALID, params?: { page?: number }) {
  return useApiInfiniteQuery({
    queryKey: apiKeys.episodes(Number(id)),
    queryFn: ({ signal }) =>
      animeApi.getAnimeEpisodes(Number(id), params, { signal }),
    enabled: !!id?.toString(),
  });
}
