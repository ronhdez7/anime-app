import { UndefinedInitialDataOptions, useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { JikanError, JikanResponse } from "../types/jikan";

export function useJikanQuery<T>({
  queryKey,
  ...options
}: UndefinedInitialDataOptions<
  AxiosResponse<JikanResponse<T>, JikanError>,
  AxiosError<JikanError>,
  T
>) {
  const result = useQuery<
    AxiosResponse<JikanResponse<T>, JikanError>,
    AxiosError<JikanError>,
    T
  >({
    queryKey: ["jikan", ...queryKey],
    select: (data) => {
      const result = data?.data;
      if (result && "error" in result) throw result;

      return result?.data;
    },
    retry: 3,
    ...options,
  });

  return result;
}
