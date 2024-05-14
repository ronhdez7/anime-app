import { streamingApi } from "@/lib/streaming-api";
import { useApiQuery } from "./use-api-query";
import { streamKeys } from "./keys";

export function useStreamSources(playerUrl?: string) {
  return useApiQuery({
    queryKey: streamKeys.sources(playerUrl ?? ""),
    queryFn: ({ signal }) =>
      streamingApi.getSources(String(playerUrl), { signal }),
    enabled: !!playerUrl,
  });
}
