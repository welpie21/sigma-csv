export const parserRegistry = new Map<string, (params: CSVParseParams<any>) => void>();

export function registerParseProcess<T = any>(character: string, plugin: (params: CSVParseParams<T>) => void) {
    parserRegistry.set(character, plugin);
}

/**
 * initializes the csv parser processors.
 */
export function initialize(extend: () => void): void {

    registerParseProcess(",", (params) => {
        if (params.current === "," && !params.inQuotes) {
            params.object = {};
        } else {
            params.object[params.index] += params.current;
        }
    });

    extend();
}

export {csvToJson} from "./utils/converter";