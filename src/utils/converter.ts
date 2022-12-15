import {ReadOptions} from "../constants/options";
import {parserRegistry} from "../index";

export function csvToJson<T, I extends boolean>(csv: string, options: CSVParseOptions<I> = ReadOptions as any): T[] | string | Tuple<Tuple<number, any>, any> {

    const {delimiter, asJSON, includeHeaders, headers} = options;
    let result: Tuple<Tuple<any, number>, number> = [];

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
        if (result[row] === undefined) {
            result[row] = [];
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
        delimiter: delimiter || ","
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
            table: result,
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
        result[row].push(value);
    }

    // delete the last row if it is empty.
    if (result[result.length - 1].length === 0) {
        result.pop();
    }

    // remove first row if we do not want to include the headers.
    if (!includeHeaders && headers !== undefined) {
        result[0] = headers;
    }

    const keys = result[0].slice();
    result.shift();

    // constructing the result object.
    if ((!includeHeaders && headers !== undefined) || includeHeaders) {
        result = Object.freeze<any>(result.map((row) => {
            return row.reduce((acc, value, j) => {
                acc[keys[j]] = value;
                return acc;
            }, {});
        }));
    }

    return asJSON ? JSON.stringify(result) : result;
}