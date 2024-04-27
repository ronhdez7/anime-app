import animeApi from "@/lib/anime-api";
import { jikanKeys, useJikanQuery } from "./use-jikan-query";
import { useQueryClient } from "@tanstack/react-query";

export default function useFeaturedAnime() {
  const queryClient = useQueryClient();
  const query = useJikanQuery({
    queryKey: jikanKeys.featured(),
    queryFn: ({ signal }) => animeApi.getFeaturedAnime({ signal }),
  });

  if (query.data) {
    for (const anime of query.data) {
      queryClient.setQueryData(
        jikanKeys.anime(anime.mal_id),
        animeApi.fakeResponse(anime)
      );
    }
  }

  return query;
}
