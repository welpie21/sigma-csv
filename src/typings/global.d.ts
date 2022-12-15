type Nullable<T> = T | null;
type Maybe<T> = T | null | undefined;
type Tuple<T, L extends number> = [...T[]] & { length: L };

/**
 * Support of escape characters types for the CSV parser.
 */
type EscapeCharacterType = "n" | "t";