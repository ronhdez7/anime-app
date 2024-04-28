import { MALID } from "@/types/jikan";
import { jikanKeys, useJikanInfiniteQuery } from "./use-jikan-query";
import animeApi from "@/lib/anime-api";

export function useAnimeEpisodes(id?: MALID, params?: { page?: number }) {
  return useJikanInfiniteQuery({
    queryKey: jikanKeys.episodes(Number(id)),
    queryFn: ({ signal }) =>
      animeApi.getAnimeEpisodes(Number(id), params, { signal }),
    enabled: !!id?.toString(),
  });
}
