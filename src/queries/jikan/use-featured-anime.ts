import animeApi from "@/lib/anime-api";
import { jikanKeys, useJikanQuery } from "./use-jikan-query";

export default function useFeaturedAnime() {
  return useJikanQuery({
    queryKey: jikanKeys.featured(),
    queryFn: ({ signal }) => animeApi.getFeaturedAnime({ signal }),
  });
}
