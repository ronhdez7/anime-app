import { useQueryClient } from "@tanstack/react-query";
import animeApi from "@/lib/anime-api";
import { useApiInfiniteQuery } from "./use-api-query";
import { apiKeys } from "./keys";

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
