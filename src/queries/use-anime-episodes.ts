import { MALID } from "@/types/jikan";
import animeApi from "@/lib/anime-api";
import { useApiInfiniteQuery } from "./use-api-query";
import { apiKeys } from "./keys";

export function useAnimeEpisodes(id?: MALID, params?: { page?: number }) {
  return useApiInfiniteQuery({
    queryKey: apiKeys.episodes(Number(id)),
    queryFn: ({ signal }) =>
      animeApi.getAnimeEpisodes(Number(id), params, { signal }),
    enabled: !!id?.toString(),
  });
}
