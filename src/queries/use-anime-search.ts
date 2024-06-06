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
          adult: false,
        },
        { signal }
      ),
    placeholderData: keepPreviousData,
  });

  if (query.data) {
    for (const page of query.data.pages) {
      if (!page) continue;
      for (const anime of page) {
        if (anime.id === null) continue;
        queryClient.setQueryData(
          apiKeys.anime(anime.id),
          animeApi.fakeResponse(anime)
        );
      }
    }
  }

  return query;
}
