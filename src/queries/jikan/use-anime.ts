import { MALID } from "@/types/jikan";
import { jikanKeys, useJikanQuery } from "./use-jikan-query";
import animeApi from "@/lib/anime-api";
import { MaybeFullData } from "@/types";

export function useAnime(id?: MALID) {
  return useJikanQuery<MaybeFullData>({
    queryKey: jikanKeys.anime(Number(id)),
    queryFn: ({ signal }) => animeApi.getAnimeFullById(Number(id), { signal }),
    enabled: !!id?.toString(),
  });
}
