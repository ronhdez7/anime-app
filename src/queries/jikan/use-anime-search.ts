import jikan, { AnimeSearchOptions } from "@/lib/jikan";
import { jikanKeys, useJikanInfiniteQuery } from "./use-jikan-query";

export default function useAnimeSearch(params: AnimeSearchOptions = {}) {
  return useJikanInfiniteQuery({
    queryKey: jikanKeys.search(params),
    queryFn: ({ queryKey, pageParam, signal }) =>
      jikan.getAnimeSearch(
        {
          page: pageParam,
          sfw: true,
          ...queryKey[4],
        },
        { signal }
      ),
  });
}
