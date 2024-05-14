import { streamingApi } from "@/lib/streaming-api";
import { useApiQuery } from "./use-api-query";
import { streamKeys } from "./keys";

export function useStreamServers(episodeUrl?: string) {
  return useApiQuery({
    queryKey: streamKeys.servers(episodeUrl ?? ""),
    queryFn: ({ signal }) =>
      streamingApi.getServers(String(episodeUrl), { signal }),
    enabled: !!episodeUrl,
  });
}
