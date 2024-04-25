import { jikanKeys, useJikanInfiniteQuery } from "./use-jikan-query";
import animeApi from "@/lib/anime-api";

export default function useTopAnime() {
  return useJikanInfiniteQuery({
    queryKey: jikanKeys.top(),
    queryFn: ({ pageParam, signal }) =>
      animeApi.getTopAnime({ page: pageParam, sfw: true }, { signal }),
  });
}
