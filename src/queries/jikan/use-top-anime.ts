import { useQueryClient } from "@tanstack/react-query";
import { jikanKeys, useJikanInfiniteQuery } from "./use-jikan-query";
import animeApi from "@/lib/anime-api";

export default function useTopAnime() {
  const queryClient = useQueryClient();
  const query = useJikanInfiniteQuery({
    queryKey: jikanKeys.top(),
    queryFn: ({ pageParam, signal }) =>
      animeApi.getTopAnime({ page: pageParam, sfw: true }, { signal }),
  });

  if (query.data) {
    for (const page of query.data.pages) {
      for (const anime of page) {
        queryClient.setQueryData(
          jikanKeys.anime(anime.mal_id),
          animeApi.fakeResponse(anime)
        );
      }
    }
  }

  return query;
}
