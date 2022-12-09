type Nullable<T> = T | null;
type Maybe<T> = T | null | undefined;

/**
 * CSV specific types
 */
interface CSVParseOptions {
    delimiter?: string;
    includeHeaders?: boolean;
}

interface CSVStringifyOptions {
    delimiter?: string;
    withHeaders?: boolean;
}