import { GraphqlError } from "../helpers";

export interface AnilistResponse<T> {
  data: T;
  errors?: GraphqlError[];
}

export interface AnilistPaginatedResponse<T>
  extends AnilistResponse<AnilistPagination<T>> {}

export type AnilistPagination<T> = {
  Page: {
    pageInfo: AnilistPageInfo;
  } & T;
};

export interface AnilistPageInfo {
  total?: number;
  perPage?: number;
  currentPage?: number;
  lastPage?: number;
  hasNextPage?: boolean;
}
