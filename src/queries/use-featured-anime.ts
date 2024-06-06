import animeApi from "@/lib/anime-api";
import { useQueryClient } from "@tanstack/react-query";
import { useApiQuery } from "./use-api-query";
import { apiKeys } from "./keys";

export default function useFeaturedAnime() {
  const queryClient = useQueryClient();
  const query = useApiQuery({
    queryKey: apiKeys.featured(),
    queryFn: ({ signal }) => animeApi.getFeaturedAnime({ signal }),
  });

  if (query.data) {
    for (const anime of query.data) {
      if (anime.id === null) continue;
      queryClient.setQueryData(
        apiKeys.anime(anime.id),
        animeApi.fakeResponse(anime)
      );
    }
  }

  return query;
}
