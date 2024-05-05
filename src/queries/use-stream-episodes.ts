import { streamingApi } from "@/lib/streaming-api";
import { useApiQuery } from "./use-api-query";

export function useStreamEpisodes(animeUrl?: string) {
  return useApiQuery({
    queryKey: ["stream", "episodes", animeUrl],
    queryFn: ({ signal }) =>
      streamingApi.getEpisodes(String(animeUrl), { signal }),
    enabled: !!animeUrl,
  });
}
