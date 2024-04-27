import animeApi from "@/lib/anime-api";
import { jikanKeys, useJikanInfiniteQuery } from "./use-jikan-query";
import { AnimeSearchParams } from "@/types";
import { keepPreviousData, useQueryClient } from "@tanstack/react-query";

export default function useAnimeSearch(params?: AnimeSearchParams) {
  const queryClient = useQueryClient();
  const query = useJikanInfiniteQuery({
    queryKey: jikanKeys.search(params),
    queryFn: ({ queryKey, pageParam, signal }) =>
      animeApi.getAnimeSearch(
        {
          ...queryKey[3],
          page: pageParam,
          sfw: true,
        },
        { signal }
      ),
    placeholderData: keepPreviousData,
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
