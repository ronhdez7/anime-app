import { tracerApi, tracerKeys } from "@/lib/tracer-api";
import { useApiQuery } from "./use-api-query";

export function useTracerQuota() {
  const query = useApiQuery({
    queryKey: tracerKeys.me(),
    queryFn: () => tracerApi.me(),
    gcTime: 0,
  });

  return query;
}
