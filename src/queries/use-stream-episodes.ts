import { streamingApi } from "@/lib/streaming-api";
import { useApiQuery } from "./use-api-query";
import { streamKeys } from "./keys";

export function useStreamEpisodes(animeUrl?: string) {
  return useApiQuery({
    queryKey: streamKeys.episodes(animeUrl ?? ""),
    queryFn: ({ signal }) =>
      streamingApi.getEpisodes(String(animeUrl), { signal }),
    enabled: !!animeUrl,
  });
}
