import {
  InfiniteData,
  UseInfiniteQueryResult,
  UseQueryResult,
} from "@tanstack/react-query";
import { ApiError } from "./response";
import { AnimeData } from "./anime";

export type QueryResult<T> =
  | UseQueryResult<T, ApiError>
  | UseInfiniteQueryResult<InfiniteData<T>, ApiError>;

export type AnimeDataQueryResult = QueryResult<AnimeData[]>;

export * from "./response";

export * from "./anime";
export * from "./episode";

export * from "./misc";
