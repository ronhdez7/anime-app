import animeApi from "@/lib/anime-api";
import { jikanKeys, useJikanInfiniteQuery } from "./use-jikan-query";
import { AnimeSearchParams } from "@/types";

export default function useAnimeSearch(params?: AnimeSearchParams) {
  return useJikanInfiniteQuery({
    queryKey: jikanKeys.search(params),
    queryFn: ({ queryKey, pageParam, signal }) =>
      animeApi.getAnimeSearch(
        {
          ...queryKey[4],
          page: pageParam,
          sfw: true,
        },
        { signal }
      ),
  });
}
