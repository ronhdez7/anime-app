import jikan from "@/lib/jikan";
import { jikanKeys, useJikanQuery } from "./use-jikan-query";

export default function useAnimeGenres() {
  return useJikanQuery({
    queryKey: jikanKeys.genres(),
    queryFn: ({ signal }) => jikan.getAnimeGenres({ signal }),
  });
}
