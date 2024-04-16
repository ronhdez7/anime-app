export type MakeRequired<T, U extends keyof T> = Partial<T> & Pick<T, U>;
