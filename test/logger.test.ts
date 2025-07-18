import Logger from "../src/logger";
import * as fs from "node:fs";


it("should init logger successfully", () => {
    new Logger();
});
it("should throw an error because of incorrect path", () => {
    expect(() => new Logger("/dist")).toThrow();
});
it("should log successfully", () => {
    const logger = new Logger();
    logger.log("test");
    const content = fs.readFileSync("latest.log").toString();
    expect(content).toContain("test");
});
