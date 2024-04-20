import { jikanKeys, useJikanInfiniteQuery } from "./use-jikan-query";
import jikan from "@/lib/jikan";

export default function useTopAnime() {
  return useJikanInfiniteQuery({
    queryKey: jikanKeys.top(),
    queryFn: ({ pageParam, signal }) =>
      jikan.getTopAnime({ page: pageParam, sfw: true }, { signal }),
  });
}
