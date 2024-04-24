export interface JikanResponse<T> {
  data: T;
}

export interface JikanPaginatedResponse<T> extends JikanResponse<T> {
  pagination: JikanPagination;
}

export interface JikanPagination {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
  items: { count: number; total: number; per_page: number };
}

export interface JikanError {
  status: number;
  type: string;
  message: string;
  error: string;
  report_url?: string;
}
