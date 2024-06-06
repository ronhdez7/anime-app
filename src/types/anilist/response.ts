import { GraphqlResponse } from "../graphql";

export type AnilistResponse<T> = GraphqlResponse<T>;

export interface AnilistPaginatedResponse<T>
  extends AnilistResponse<AnilistPagination<T>> {}

export type AnilistPagination<T> = {
  Page: {
    pageInfo: AnilistPageInfo | null;
  } & T;
};

export interface AnilistPageInfo {
  total: number | null;
  perPage: number | null;
  currentPage: number | null;
  lastPage: number | null;
  hasNextPage: boolean | null;
}
