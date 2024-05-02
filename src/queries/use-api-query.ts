import {
  InfiniteData,
  QueryKey,
  UndefinedInitialDataInfiniteOptions,
  UndefinedInitialDataOptions,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import {
  AnimeSearchParams,
  ApiError,
  ApiPaginatedResponse,
  ApiResponse,
  MakeRequired,
} from "@/types";

export function useApiQuery<T, Q extends QueryKey = QueryKey>({
  ...options
}: UndefinedInitialDataOptions<ApiResponse<T>, ApiError, T, Q>) {
  const query = useQuery({
    select: (res) => res.data,
    ...options,
  });

  return query;
}

export function useApiInfiniteQuery<T, Q extends QueryKey = QueryKey>({
  ...options
}: MakeRequired<
  UndefinedInitialDataInfiniteOptions<
    ApiPaginatedResponse<T>,
    ApiError,
    InfiniteData<T, number>,
    Q,
    number
  >,
  "queryKey"
>) {
  const query = useInfiniteQuery({
    select(data) {
      return {
        ...data,
        pages: data.pages.map((page) => page.data),
      };
    },
    initialPageParam: 1,
    getNextPageParam: (data, _, lastPageParam) =>
      (data.pagination.has_next_page || null) && lastPageParam + 1,
    ...options,
  });

  return query;
}

export const apiKeys = {
  all: ["api"] as const,
  normal: () => ["normal", ...apiKeys.all] as const,
  infinite: () => ["infinite", ...apiKeys.all] as const,

  featured: () => [...apiKeys.normal(), "featured"] as const,
  top: () => [...apiKeys.infinite(), "top"] as const,
  search: (params: AnimeSearchParams = {}) =>
    [...apiKeys.infinite(), "search", params] as const,
  genres: () => [...apiKeys.normal(), "genres"] as const,
  anime: (id: number) => [...apiKeys.normal(), "anime", id] as const,

  episodes: (id: number) => [...apiKeys.anime(id), "episodes"] as const,
};
