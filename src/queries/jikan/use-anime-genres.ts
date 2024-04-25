import animeApi from "@/lib/anime-api/";
import { jikanKeys, useJikanQuery } from "./use-jikan-query";

export default function useAnimeGenres() {
  return useJikanQuery({
    queryKey: jikanKeys.genres(),
    queryFn: ({ signal }) => animeApi.getAnimeGenres({ signal }),
  });
}
