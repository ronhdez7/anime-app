export interface GraphqlError {
  message: string;
  locations?: GraphqlErrorLocation[];
  path?: (string | number)[];
  extensions?: Record<string, any>;
}

interface GraphqlErrorLocation {
  line: number;
  column: number;
}

export interface GraphqlResponse<T> {
  data: T | null;
  errors?: GraphqlError[];
}
