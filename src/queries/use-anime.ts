import { animeApi, apiKeys } from "@/lib/anime-api";
import { useApiQuery } from "./use-api-query";
import { ID } from "@/types";

export function useAnime(id?: ID) {
  return useApiQuery({
    queryKey: apiKeys.anime(Number(id)),
    queryFn: ({ signal }) => animeApi.getAnimeFullById(Number(id), { signal }),
    enabled: !!id?.toString(),
  });
}
