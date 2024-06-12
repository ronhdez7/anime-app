import { tracerApi } from "@/lib/tracer-api";
import { useApiQuery } from "./use-api-query";

export function useTracerQuota() {
  const query = useApiQuery({
    queryKey: ["normal", "tracer", "quota"],
    queryFn: () => tracerApi.me(),
    gcTime: 0,
  });

  return query;
}
