import { readFileSync } from "fs";
import {expect, test} from "vitest";
import {csvToJson} from "../utils/converter";

describe("readFile", () => {

    test("reading the file works and exists?", () => {
        const file = readFileSync("src/assets/file-1.csv", "utf-8");
        expect(file).toBeTruthy();
    });

    test("should try to convert csv to json", () => {
        const file = readFileSync("src/assets/file-1.csv", "utf-8");
        const result = csvToJson(file);

        expect(result).toBeTruthy();
        expect(result.length).toBe(5);

        expect(result[0]).toEqual({
            id: "0",
            title: "vitest",
            description: "a library to test your code",
            rating: "5"
        });
    });

    test("should try to convert csv to json with custom delimiter", () => {
        const file = readFileSync("src/assets/file-2.csv", "utf-8");
        const result = csvToJson(file, { delimiter: ";" });

        expect(result).toBeTruthy();
        expect(result.length).toBe(5);

        expect(result[0]).toEqual({
            id: "0",
            title: "vitest",
            description: "a library to test your code",
            rating: "5"
        });
    });


});