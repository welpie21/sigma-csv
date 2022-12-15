/**
 *
 * @param params
 */
export function parseDelimiter(params: CSVParseParams<any>) {

    // if we are not in quotes, we can safely ignore the delimiter.
    if (params.inQuotes) {
        return;
    }

    // check if the passed in delimiter matches the current character.
    if (params.delimiter !== params.current) {
        return;
    }

    if (params.table[params.row] === undefined) {
        params.table[params.row] = [];
    }

    params.table[params.row].push(params.value);
    params.reset(true, false);
}

/**
 * handles the parsing of a backslash character.
 * @param params
 */
export function parseNewline(params: CSVParseParams<any>) {

    if (params.inQuotes) {
        return;
    }

    params.addRow();
    params.reset(true, true);
    params.table.push([]);
}

/**
 * handles the parsing of double quotes.
 * @param params
 */
export function parseDoubleQuotes(params: CSVParseParams<any>) {

    if (!params.inQuotes) {
        params.inQuotes = true;
        return;
    }
}

/**
 *
 */
export function parseEmpty(params: CSVParseParams<any>) {
    params.add(" ");
}