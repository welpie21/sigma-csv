import {ReadOptions} from "../constants/options";

export function csvToJson<T>(csv: string, options: CSVParseOptions<any> = ReadOptions): CSVParseResult<T> {

    const {delimiter, asJSON, includeHeaders, headers} = options;
    const result: T[] | Tuple<Tuple<any, number>, number> = [];

    const regex = new RegExp(`\\r\\n|\\n|\\r`, "g");

    const rows = regex.exec(csv);

    if (!includeHeaders) {
        rows.splice(0, 1);
    }

    let object: Partial<T> = {};
    let inQuotes: boolean = false;

    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        for (let j = 0; j < row.length; j++) {
            const character = row[j];
        }
    }

    return result;
}