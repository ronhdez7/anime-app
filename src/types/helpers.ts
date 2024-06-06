export type MakeRequired<T, U extends keyof T> = Partial<T> & Pick<T, U>;

export type ObjectValues<T> = T[keyof T];

export type ID = number | string;
