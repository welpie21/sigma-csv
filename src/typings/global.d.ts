type Nullable<T> = T | null;
type Maybe<T> = T | null | undefined;
type Tuple<T, L extends number> = [T, ...T[]] & { length: L };