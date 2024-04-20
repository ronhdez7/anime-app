import jikan from "@/lib/jikan";
import { jikanKeys, useJikanQuery } from "./use-jikan-query";

export default function useFeaturedAnime() {
  return useJikanQuery({
    queryKey: jikanKeys.featured(),
    queryFn: ({ signal }) => jikan.getFeaturedAnime({ signal }),
  });
}
