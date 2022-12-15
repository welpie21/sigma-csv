/**
 * A helper function to try and parse the number. If
 * the parse fails, it will return the original value.
 * @param value
 */
export function tryParseNumber(value: string): number | string {
    const parsed = Number(value);
    return Number.isNaN(parsed) ? value : parsed;
}