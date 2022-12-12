type Nullable<T> = T | null;
type Maybe<T> = T | null | undefined;
type Tuple<T, L extends number> = [T, ...T[]] & { length: L };

/**
 * The result of a parse operation. Contains the parsed data and information in a JSON format or an array of objects.
 */
type CSVParseResult<T> = T[] | Tuple<Tuple<any, number>, number>;

/**
 * CSV specific types
 */
interface CSVParseOptions<I extends boolean> {

    /**
     * The delimiter used to separate columns in the CSV file. Defaults to ','.
     */
    delimiter?: string;

    /**
     * parse the result as a json string.
     * @default false
     */
    asJSON?: boolean;

    /**
     * Define object keys for each column in the CSV file.
     */
    includeHeaders?: I;

    /**
     * Override the headers. Recommended when you have set "includeHeaders" to false.
     * else result will be an array of arrays.
     */
    headers?: string[];
}

interface CSVStringifyOptions {
    delimiter?: string;
}

interface CSVParseParams<T> {

    /**
     * The results of the parsing operating(s) are being stored in here.
     */
    data: Tuple<Tuple<any, number>, number>;

    /**
     * The value of the current character the parser is currently on.
     */
    current: string;

    /**
     * Object containing the current row being parsed.
     */
    object: T;

    /**
     * The index of the current row being parsed.
     */
    index: number;

    /**
     * Checks if the current character is wrapped inside quotes.
     */
    inQuotes: boolean;
}