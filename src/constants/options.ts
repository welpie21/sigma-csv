export const ReadOptions: CSVParseOptions<true> = {
    delimiter: ",",
    includeHeaders: true,
    headers: undefined,
    asJSON: false
};

export const WriteOptions: CSVStringifyOptions = {
    delimiter: ","
};