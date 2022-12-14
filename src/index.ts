import {parseDelimiter} from "./plugin/parser/delimiter";

export const parserRegistry = new Map<string, (params: CSVParseParams<any>) => void>();

export function registerParseProcess<T = any>(character: string, plugin: (params: CSVParseParams<T>) => void) {
    parserRegistry.set(character, plugin);
}

/**
 * initializes the csv parser processors.
 */
export function initialize(extend?: () => void): void {

    registerParseProcess(",", parseDelimiter);
    extend?.();
}

export {csvToJson} from "./utils/converter";