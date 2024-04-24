import jikan from "@/lib/jikan";
import { jikanKeys, useJikanInfiniteQuery } from "./use-jikan-query";
import { AnimeSearchParams } from "@/types";

export default function useAnimeSearch(params?: AnimeSearchParams) {
  return useJikanInfiniteQuery({
    queryKey: jikanKeys.search(params),
    queryFn: ({ queryKey, pageParam, signal }) =>
      jikan.getAnimeSearch(
        {
          ...queryKey[4],
          page: pageParam,
          sfw: true,
        },
        { signal }
      ),
  });
}
