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
} from "../types/jikan";
import { MakeRequired } from "@/types";

type SuccessRes<T> = AxiosResponse<JikanResponse<T>, JikanError>;
type PaginatedRes<T> = AxiosResponse<JikanPaginatedResponse<T>, JikanError>;

type ErrorRes = AxiosError<JikanError>;

export function useJikanQuery<T>({
  queryKey,
  ...options
}: UndefinedInitialDataOptions<SuccessRes<T>, ErrorRes, T, QueryKey>) {
  const query = useQuery({
    queryKey: ["normal", "jikan", ...queryKey],
    select: (data) => {
      const result = data?.data;
      if (result && "error" in result) throw result;

      return result?.data;
    },
    ...options,
  });

  return query;
}

export function useJikanInfiniteQuery<T>({
  queryKey,
  initialPageParam,
  getNextPageParam,
  ...options
}: MakeRequired<
  UndefinedInitialDataInfiniteOptions<
    PaginatedRes<T>,
    ErrorRes,
    InfiniteData<T, number>,
    QueryKey,
    number
  >,
  "queryKey"
>) {
  const query = useInfiniteQuery({
    queryKey: ["infinite", "jikan", ...queryKey],
    select(data) {
      return {
        ...data,
        pages: data.pages.map((page) => page.data.data),
      };
    },
    initialPageParam: initialPageParam ?? 1,
    getNextPageParam:
      getNextPageParam ??
      ((data, _, lastPageParam) =>
        (data.data.pagination.has_next_page || null) && lastPageParam + 1),
    ...options,
  });

  return query;
}
