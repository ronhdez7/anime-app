import { animeApi, apiKeys } from "@/lib/anime-api";
import { useQueryClient } from "@tanstack/react-query";
import { useApiQuery } from "./use-api-query";
import { fillCacheForAnimeData, prefetchAnimeImage } from "./utils";

export default function useFeaturedAnime() {
  const queryClient = useQueryClient();
  const query = useApiQuery({
    queryKey: apiKeys.featured(),
    queryFn: ({ signal }) => animeApi.getFeaturedAnime({ signal }),
  });

  if (query.data) {
    for (const anime of query.data) {
      fillCacheForAnimeData(anime, queryClient);
      prefetchAnimeImage(anime);
    }
  }

  return query;
}
