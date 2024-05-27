export type MakeRequired<T, U extends keyof T> = Partial<T> & Pick<T, U>;

export type ObjectValues<T> = T[keyof T];

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
