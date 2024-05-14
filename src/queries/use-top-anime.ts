import { useQueryClient } from "@tanstack/react-query";
import animeApi from "@/lib/anime-api";
import { useApiInfiniteQuery } from "./use-api-query";
import { apiKeys } from "./keys";

export default function useTopAnime() {
  const queryClient = useQueryClient();
  const query = useApiInfiniteQuery({
    queryKey: apiKeys.top(),
    queryFn: ({ pageParam, signal }) =>
      animeApi.getTopAnime({ page: pageParam, sfw: true }, { signal }),
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
