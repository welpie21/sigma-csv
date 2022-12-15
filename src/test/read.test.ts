import {readFileSync} from "fs";
import {expect, test} from "vitest";
import {csvToJson} from "../utils/converter";
import {initialize} from "../index";

initialize();

describe("read and convert to json", () => {

    test("file exists", () => {
        const file = readFileSync("src/assets/file-1.csv", "utf-8");
        expect(file).toBeTruthy();
    });

    test("convert csv to array of objects", () => {
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

    test("convert to array of objects with custom delimiter and headers", () => {

        const file = readFileSync("src/assets/file-2.csv", "utf-8");
        const result = csvToJson(file, {
            delimiter: ";",
            headers: ["id", "title", "description", "rating"]
        });

        expect(result).toBeTruthy();
        expect(result.length).toBe(6);

        expect(result[0]).toEqual({
            id: "0",
            title: "vitest",
            description: "a library to test your code",
            rating: "5"
        });
    });

    test("convert csv to json string", () => {

        const file = readFileSync("src/assets/file-2.csv", "utf-8");
        const result = csvToJson(file, {
            delimiter: ";",
            headers: ["id", "title", "description", "rating"],
            asJSON: true
        });

        expect(result).toBeTruthy();

        const jsonRegex = /^(\[)(\{)(.*)(\})(\])$/;
        expect(jsonRegex.test(result as string)).toBeTruthy();
    });

    test("convert csv to tuple", () => {

        const file = readFileSync("src/assets/file-2.csv", "utf-8");

        const result = csvToJson(file, {
            delimiter: ";",
            includeHeaders: false
        });

        expect(result).toBeTruthy();
        expect(result.length).toBe(6);
        expect(result[0]).toEqual(["0", "vitest", "a library to test your code", "5"]);
    });
});