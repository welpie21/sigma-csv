import {ReadOptions} from "../constants/options";
import {parserRegistry} from "../index";

export function csvToJson<T, I extends boolean>(csv: string, options: CSVParseOptions<I> = ReadOptions as any): I extends true ? CSVParseResult<T> : string {

    const {delimiter, asJSON, includeHeaders, headers} = options;
    let result: Tuple<Tuple<any, number>, number> = [];

    let val: string = "";
    let row: number = 0;
    let isQuoted: boolean = false;

    for (let i = 0; i < csv.length; i++) {

        // reset the value if the current character is a new line.
        val = "";

        const char = csv[i];
        const next = csv[i + 1];
        const prev = csv[i - 1];

        if(parserRegistry.has(char)) {
            const parse = parserRegistry.get(char);
            parse?.({
                current: char,
                row,
                inQuotes: isQuoted,
                table: result,
                previousChar: prev,
                nextChar: next
            } as CSVParseParams<T>);
        } else {
            val += char;
        }
    }

    console.log(result);

    if (!includeHeaders) {
        result.shift();
    }

    if (asJSON) {
        return JSON.stringify(result);
    }

    return result;
}