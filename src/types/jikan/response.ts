export interface JikanResponse<T> {
  data: T | null;
}

export interface JikanPaginatedResponse<T> extends JikanResponse<T> {
  pagination: JikanPagination;
}

export interface JikanPagination {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
  items: { count: number; total: number; per_page: number } | null;
}

export interface JikanError {
  status: number;
  type: string;
  message: string;
  error: string | null;
  report_url?: string | null;
}
