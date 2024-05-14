import animeApi from "@/lib/anime-api/";
import { useApiQuery } from "./use-api-query";
import { parseJikanGenreArray } from "@/lib/anime-api/jikan/jikan-parser";
import { genres } from "@/lib/anime-api/jikan/jikan-data";
import { apiKeys } from "./keys";

export default function useAnimeGenres() {
  return useApiQuery({
    queryKey: apiKeys.genres(),
    queryFn: ({ signal }) => animeApi.getAnimeGenres({ signal }),
    placeholderData: animeApi.fakeResponse(parseJikanGenreArray(genres)),
  });
}
