// const { object, inQuotes, current, index, nextChar, previousChar, data } = params;

/**
 *
 * @param params
 */
export function parseDelimiter(params: CSVParseParams<any>) {

    // if we are not in quotes, we can safely ignore the delimiter.
    if(params.inQuotes) {
        return;
    }

    if(params.table[params.row] === undefined) {

    }
}

/**
 * handles the parsing of a backslash character.
 * @param params
 */
export function parseBackslash(params: CSVParseParams<any>) {
    const next = params.nextChar;

    if(params.inQuotes) {
        return;
    }

    if (next === "n") {
        params.row++;
    }

    console.log(params.row);
}

/**
 * handles the parsing of double quotes.
 * @param params
 */
export function parseDoubleQuotes(params: CSVParseParams<any>) {

    if(!params.inQuotes) {
        params.inQuotes = true;
        return;
    }
}

/**
 *
 */
export function parseEmpty(params: CSVParseParams<any>) {

    const { previousChar, current, nextChar } = params;

    if(params.inQuotes) {
        return;
    }
}