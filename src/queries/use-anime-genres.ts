import animeApi from "@/lib/anime-api/";
import { apiKeys, useApiQuery } from "./use-api-query";

export default function useAnimeGenres() {
  return useApiQuery({
    queryKey: apiKeys.genres(),
    queryFn: ({ signal }) => animeApi.getAnimeGenres({ signal }),
  });
}
