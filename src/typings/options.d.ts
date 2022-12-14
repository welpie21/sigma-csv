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