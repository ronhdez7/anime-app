import animeApi from "@/lib/anime-api";
import { AnimeSearchParams } from "@/types";
import { keepPreviousData, useQueryClient } from "@tanstack/react-query";
import { useApiInfiniteQuery } from "./use-api-query";
import { apiKeys } from "./keys";

export default function useAnimeSearch(params: AnimeSearchParams = {}) {
  const queryClient = useQueryClient();
  const query = useApiInfiniteQuery({
    queryKey: apiKeys.search(params),
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
          apiKeys.anime(anime.id),
          animeApi.fakeResponse(anime)
        );
      }
    }
  }

  return query;
}
