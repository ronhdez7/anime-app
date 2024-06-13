import { animeApi, apiKeys } from "@/lib/anime-api";
import { AnimeSearchParams } from "@/types";
import { keepPreviousData, useQueryClient } from "@tanstack/react-query";
import { useApiInfiniteQuery } from "./use-api-query";
import { fillCacheForAnimeData, prefetchAnimeImage } from "./utils";

export default function useAnimeSearch(params: AnimeSearchParams = {}) {
  const queryClient = useQueryClient();
  const query = useApiInfiniteQuery({
    queryKey: apiKeys.search(params),
    queryFn: ({ queryKey, pageParam, signal }) =>
      animeApi.getAnimeSearch(
        {
          ...params,
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
        fillCacheForAnimeData(anime, queryClient);
        prefetchAnimeImage(anime);
      }
    }
  }

  return query;
}
