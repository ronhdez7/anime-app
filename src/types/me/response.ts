export interface ApiResponse<T> {
  data: T;
}

export interface ApiPaginatedResponse<T> extends ApiResponse<T> {
  pagination: ApiPagination;
}

export interface ApiPagination {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
  items: { count: number; total: number; per_page: number };
}

export interface ApiError {
  status: number;
  type: string;
  message: string;
  error: string;
  report_url?: string;
}
