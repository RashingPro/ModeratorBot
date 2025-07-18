import * as fs from "node:fs";

export default class Logger {
    constructor(outPath: string = "./latest.log") {
        if (!fs.existsSync(outPath)) {
            fs.appendFileSync(outPath, "");
        }
        if (!fs.lstatSync(outPath).isFile()) {
            throw new Error("Invalid log file");
        }
        fs.writeFileSync(outPath, "");
        this.logOutFile = outPath;
    }

    private readonly logOutFile: string;

    private addToFile(content: string) {
        fs.appendFileSync(this.logOutFile, "\n" + content);
    }

    private getPrefix() {
        const time = new Date();
        const values = [
            [time.getDate(), 2],
            [time.getMonth() + 1, 2],
            [time.getFullYear(), 4],
            [time.getHours(), 2],
            [time.getMinutes(), 2],
            [time.getSeconds(), 2],
            [time.getMilliseconds(), 3]
        ];
        const formattedValues = values.map((value) =>
            value[0].toString().padStart(value[1], "0")
        );
        return `\x1b[33m[${formattedValues[0]}.${formattedValues[1]}.${formattedValues[2]} – ${formattedValues[3]}:${formattedValues[4]}:${formattedValues[5]} ${formattedValues[6]}ms]`;
    }

    log(...data: any[]) {
        let result: string = "";
        data.forEach((item) => {
            if (result.length > 0) result += " ";
            if (typeof item === "string") {
                result += item;
            } else {
                try {
                    result += item.toString();
                } catch (e) {
                    result += typeof item;
                    console.warn("Cannot log item:", item);
                }
            }
        });
        result = this.getPrefix() + " \x1b[0m" + result;
        console.log(result);
        this.addToFile(result);
    }
}
