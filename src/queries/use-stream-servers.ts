import { streamingApi, streamKeys } from "@/lib/streaming-api";
import { useApiQuery } from "./use-api-query";

export function useStreamServers(episodeUrl?: string) {
  return useApiQuery({
    queryKey: streamKeys.servers(episodeUrl ?? ""),
    queryFn: ({ signal }) =>
      streamingApi.getServers(String(episodeUrl), { signal }),
    enabled: !!episodeUrl,
  });
}
