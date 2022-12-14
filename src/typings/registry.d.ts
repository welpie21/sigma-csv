interface CSVParseParams<T> {

    /**
     * The results of the parsing operating(s) are being stored in here.
     */
    table: Tuple<Tuple<any, number>, number>;

    /**
     * The value of the current character the parser is currently on.
     */
    current: string;

    /**
     * The index of the current row being parsed.
     */
    row: number;

    /**
     * Checks if the current character is wrapped inside quotes.
     */
    inQuotes: boolean;

    /**
     * Gives the next character where the parser is currently on.
     */
    nextChar: string;

    /**
     * Gives the previous character where the parser is currently on.
     */
    previousChar: string;
}

/**
 * The result of a parse operation. Contains the parsed data and information in a JSON format or an array of objects.
 */
type CSVParseResult<T> = Tuple<Tuple<any, number>, number> | string;
