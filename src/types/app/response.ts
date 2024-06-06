export interface ApiResponse<T> {
  data: T;
  errors?: ApiError[];
}

export interface ApiPaginatedResponse<T> extends ApiResponse<T> {
  pagination: ApiPagination;
}

export interface ApiPagination {
  lastPage: number | null;
  hasNextPage: boolean | null;
  currentPage: number | null;
  items: { count: number | null; total: number | null; perPage: number | null };
}

export interface ApiError {
  status: number;
  type: string;
  message: string;
  error: string | null;
}
