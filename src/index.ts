import {parseNewline, parseDelimiter, parseDoubleQuotes, parseEmpty} from "./plugin/delimiter";

export const parserRegistry = new Map<string, (params: CSVParseParams<any>) => void>();

export function registerParseProcess<T = any>(character: string, plugin: (params: CSVParseParams<T>) => void) {
    parserRegistry.set(character, plugin);
}

/**
 * initializes the csv parser processors.
 * @param override - override the default processors.
 */
export function initialize(override?: (registry: Map<string, (params: CSVParseParams<any>) => void>) => void): void {

    /** supporting custom delimiter */
    registerParseProcess(",", parseDelimiter);
    registerParseProcess(";", parseDelimiter);

    /** supporting custom escape character */
    registerParseProcess("\n", parseNewline);

    /** supporting custom quote character */
    registerParseProcess(" ", parseEmpty);

    /** supporting custom quote character */
    registerParseProcess("\"", parseDoubleQuotes);

    override?.(parserRegistry);
}

export {csvToJson} from "./utils/converter";