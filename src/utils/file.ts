/**
 * Reads a file from the file system.
 * this is a util function for the test coverage.
 * @param file
 */
export function readFile(file: File): string|Error {

    const reader = new FileReader();
    reader.readAsText(file);

    if(reader.result === null) {
        throw new Error('File is empty');
    }

    return reader.result as string;
}