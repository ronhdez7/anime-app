import { useQueryClient } from "@tanstack/react-query";
import { animeApi, apiKeys } from "@/lib/anime-api";
import { useApiInfiniteQuery } from "./use-api-query";
import { fillCacheForAnimeData, prefetchAnimeImage } from "./utils";

export default function useTopAnime() {
  const queryClient = useQueryClient();
  const query = useApiInfiniteQuery({
    queryKey: apiKeys.top(),
    queryFn: ({ pageParam, signal }) =>
      animeApi.getTopAnime({ page: pageParam, adult: false }, { signal }),
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
