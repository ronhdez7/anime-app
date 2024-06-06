import {
  InfiniteData,
  QueryKey,
  UndefinedInitialDataInfiniteOptions,
  UndefinedInitialDataOptions,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import {
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
      (data.pagination.hasNextPage || null) && lastPageParam + 1,
    ...options,
  });

  return query;
}
