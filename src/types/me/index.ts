import { UseInfiniteQueryResult, UseQueryResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ApiError } from "./response";
import { AnimeData } from "./anime";

export type QueryResult<T> =
  | UseQueryResult<T, AxiosError<ApiError>>
  | UseInfiniteQueryResult<
      {
        pages: T[];
        pageParams: number[];
      },
      AxiosError<ApiError>
    >;
export type AnimeDataQueryResult = QueryResult<AnimeData[]>;

export * from "./response";

export * from "./anime";
// export * from "./episode";

export * from "./misc";
