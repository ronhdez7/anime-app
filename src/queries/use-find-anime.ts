import { StreamFindAnimeParams } from "@/types/stream";
import { useApiQuery } from "./use-api-query";
import { streamingApi } from "@/lib/streaming-api";
import { streamKeys } from "./keys";

export function useFindAnime(params: StreamFindAnimeParams, enabled?: boolean) {
  return useApiQuery({
    queryKey: streamKeys.find(params),
    queryFn: ({ signal }) => streamingApi.findAnime(params, { signal }),
    enabled,
  });
}
