import {ReadOptions} from "../constants/options";
import {parserRegistry} from "../index";

export function csvToJson<T, I extends boolean>(csv: string, options: CSVParseOptions<I> = ReadOptions as any): T[] | string | Tuple<Tuple<number, any>, any> {

    const {delimiter, asJSON, includeHeaders, headers, parseNumbers} = options;
    let table: Tuple<Tuple<any, number>, number> = [];
    let result: T[] = [];

    let value: string = "";
    let row: number = 0;
    let isQuoted: boolean = false;
    let column: number = 0;

    // add a new character to the value.
    const add = (str: string) => {
        value += str;
    };

    const reset = (current: boolean, quoted: boolean) => {
        if (current) {
            value = "";
        }
        if (quoted) {
            isQuoted = false;
        }
    };

    const addRow = () => {
        row++;
        if (table[row] === undefined) {
            table[row] = [];
        }
    }

    /**
     * pre-define options for the parameters.
     * we do not want to re-apply / re-calculate each loop.
     */
    const preParams: Partial<CSVParseParams<T>> = {
        add,
        reset,
        addRow,
        csv,
        delimiter: delimiter || ",",
        parseNumber: parseNumbers || false,
    };

    for (let i = 0; i < csv.length; i++) {

        const char = csv[i];
        const next = csv[i + 1];
        const prev = csv[i - 1];

        const skip = (amount: number) => {
            i += amount;
        }

        const params: Partial<CSVParseParams<T>> = {
            current: char,
            inQuotes: isQuoted,
            table: table,
            previousChar: prev,
            nextChar: next,
            value,
            column,
            index: i,
            row,
            skip
        };

        parserRegistry.has(char) ?
            parserRegistry.get(char)!(Object.assign(params, preParams) as CSVParseParams<T>) :
            add(char);
    }

    // when the parser is done parsing, we need to add the last value to the table.
    if (value !== "") {
        table[row].push(value);
    }

    // delete the last row if it is empty.
    if (table[table.length - 1].length === 0) {
        table.pop();
    }

    // remove first row if we do not want to include the headers.
    if (!includeHeaders && headers !== undefined) {
        table[0] = headers;
    }

    const keys = table[0].slice();
    table.shift();

    // constructing the table object.
    if ((!includeHeaders && headers !== undefined) || includeHeaders) {

        for (let i = 0; i < table.length; i++) {
            const row = table[i];
            const obj: any = {};
            for (let j = 0; j < row.length; j++) {
                obj[keys[j]] = row[j];
            }
            result.push(obj);
        }
    }

    return asJSON ? JSON.stringify(result) : result.length > 0 ? result : table;
}