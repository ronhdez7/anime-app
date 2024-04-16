import {
  InfiniteData,
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
}: UndefinedInitialDataOptions<SuccessRes<T>, ErrorRes, T, string[]>) {
  const query = useQuery({
    queryKey: ["jikan", ...queryKey],
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
    string[],
    number
  >,
  "queryKey"
>) {
  const query = useInfiniteQuery({
    queryKey: ["jikan", ...queryKey],
    select(data) {
      return {
        ...data,
        pages: data.pages.map((page) => page.data.data),
      };
    },
    initialPageParam: initialPageParam ?? 1,
    getNextPageParam:
      getNextPageParam ??
      ((data, pages) =>
        (data.data.pagination.has_next_page || null) && pages.length + 1),
    ...options,
  });

  return query;
}
