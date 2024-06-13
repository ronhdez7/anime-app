import { streamingApi, streamKeys } from "@/lib/streaming-api";
import { useApiQuery } from "./use-api-query";

export function useStreamSources(playerUrl?: string) {
  return useApiQuery({
    queryKey: streamKeys.sources(playerUrl ?? ""),
    queryFn: ({ signal }) =>
      streamingApi.getSources(String(playerUrl), { signal }),
    enabled: !!playerUrl,
  });
}
