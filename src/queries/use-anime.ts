import { MALID } from "@/types/jikan";
import animeApi from "@/lib/anime-api";
import { apiKeys, useApiQuery } from "./use-api-query";

export function useAnime(id?: MALID) {
  return useApiQuery({
    queryKey: apiKeys.anime(Number(id)),
    queryFn: ({ signal }) => animeApi.getAnimeFullById(Number(id), { signal }),
    enabled: !!id?.toString(),
  });
}
