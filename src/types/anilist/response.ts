import { GraphqlError } from "../helpers";

export interface AnilistResponse<T> {
  data?: T;
  errors?: GraphqlError[];
}

export interface AnilistPaginatedResponse<T>
  extends AnilistResponse<AnilistPagination<T>> {}

export type AnilistPagination<T> = {
  pageInfo: {
    total?: number;
    perPage?: number;
    currentPage?: number;
    lastPage?: number;
    hasNextPage?: boolean;
  };
} & T;
