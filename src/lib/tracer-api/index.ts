import { TracerSearchOptions } from "@/types/tracer";
import { TracerApi } from "./tracer";

export const tracerApi = new TracerApi();

export const tracerKeys = {
  all: ["tracer"] as const,

  normal: () => ["normal", ...tracerKeys.all] as const,
  infinite: () => ["infinite", ...tracerKeys.all] as const,

  me: () => [...tracerKeys.normal(), "quota"] as const,
  search: (options: TracerSearchOptions) =>
    [...tracerKeys.normal(), "search", options] as const,
};
