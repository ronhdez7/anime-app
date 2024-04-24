import {
  InfiniteData,
  QueryKey,
  UndefinedInitialDataInfiniteOptions,
  UndefinedInitialDataOptions,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import {
  JikanError,
  JikanPaginatedResponse,
  JikanResponse,
} from "@/types/jikan";
import { MakeRequired } from "@/types";
import { AnimeSearchParams } from "@/types";

type SuccessRes<T> = AxiosResponse<JikanResponse<T>, JikanError>;
type PaginatedRes<T> = AxiosResponse<JikanPaginatedResponse<T>, JikanError>;

type ErrorRes = AxiosError<JikanError>;

export function useJikanQuery<T, Q extends QueryKey = QueryKey>({
  ...options
}: UndefinedInitialDataOptions<SuccessRes<T>, ErrorRes, T, Q>) {
  const query = useQuery({
    select: (data) => {
      const result = data?.data;
      if (result && "error" in result) throw result;

      return result?.data;
    },
    ...options,
  });

  return query;
}

export function useJikanInfiniteQuery<T, Q extends QueryKey = QueryKey>({
  ...options
}: MakeRequired<
  UndefinedInitialDataInfiniteOptions<
    PaginatedRes<T>,
    ErrorRes,
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
        pages: data.pages.map((page) => page.data.data),
      };
    },
    initialPageParam: 1,
    getNextPageParam: (data, _, lastPageParam) =>
      (data.data.pagination.has_next_page || null) && lastPageParam + 1,
    ...options,
  });

  return query;
}

export const jikanKeys = {
  all: ["jikan", "anime"] as const,
  normal: () => ["normal", ...jikanKeys.all] as const,
  infinite: () => ["infinite", ...jikanKeys.all] as const,
  featured: () => [...jikanKeys.normal(), "featured"] as const,
  top: () => [...jikanKeys.infinite(), "top"] as const,
  search: (params: AnimeSearchParams = {}) =>
    [...jikanKeys.infinite(), "search", params] as const,
  genres: () => [...jikanKeys.normal(), "genres"] as const,
};
