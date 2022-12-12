export const ReadOptions: CSVParseOptions<boolean> = {
    delimiter: ",",
    includeHeaders: true,
    headers: undefined,
    asJSON: false
};

export const WriteOptions: CSVStringifyOptions = {
    delimiter: ","
};