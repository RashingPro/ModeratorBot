import parseArgs from "../src/utils/commandArgs";

describe('commandArgs module', () => {
    it('should parse successfully', () => {
        expect(parseArgs("/start foo bar \"string foo bar\" foo bar \\\"escaped and number 14")).toStrictEqual([
            "start",
            "foo",
            "bar",
            "string foo bar",
            "foo",
            "bar",
            "\"escaped",
            "and",
            "number",
            14
        ])
    });

    it('should parse with error', () => {
        expect(() => parseArgs("/start foo bar \"string foo bar\" foo bar \" unexpected quote")).toThrow()
    });
});
