import { ReadOptions } from "../constants/options";

export function csvToJson<T>(csv: string, options: CSVParseOptions = ReadOptions): T[] {

    const { delimiter } = options;
    const result: T[] = [];

    // Split the csv into rows
    const rows = csv.split("\n");

    // Get the headers
    const headers: (keyof T)[] = rows[0].split(delimiter || ",") as (keyof T)[];

    // Remove the headers from the rows
    rows.splice(0, 1);

    // Loop through the rows
    for (const row of rows) {

            // Split the row into columns
            const columns = row.split(delimiter || ",");

            // Create a new object
            const obj: Record<keyof T, any> = {} as any;

            // Loop through the columns
            for (let i = 0; i < columns.length; i++) {
                obj[headers[i] as keyof T] = columns[i];
            }

            // Add the object to the result
            result.push(obj);
    }

    // Return the result
    return result;
}