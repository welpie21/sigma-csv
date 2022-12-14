import {ReadOptions} from "../constants/options";
import {parserRegistry} from "../index";

export function csvToJson<T, I extends boolean>(csv: string, options: CSVParseOptions<I> = ReadOptions as any): I extends true ? CSVParseResult<T> : string {

    const {delimiter, asJSON, includeHeaders, headers} = options;
    let result: Tuple<Tuple<any, number>, number> = [];

    let val: string = "";
    let row: number = 0;
    let isQuoted: boolean = false;

    for (let i = 0; i < csv.length; i++) {
        const char = csv[i];
        const next = csv[i + 1];
        const prev = csv[i - 1];

        const params: CSVParseParams<T> = {
            current: char,
            object: {} as T,
            index: row,
            inQuotes: isQuoted,
            data: result
        };

        const parse = parserRegistry.get(char);
        parse?.(params);
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

type Object = {
    id: string;
}