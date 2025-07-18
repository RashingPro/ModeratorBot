export class InvalidCommandArgsError extends Error {
    constructor() {
        super();
    }
}

/**
 * @throws InvalidCommandArgs
 */
export default function parseArgs(text: string) {
    if (!text.startsWith("/")) throw new InvalidCommandArgsError();

    const split = [""];
    let inString = false;
    for (let i = 1; i < text.length; i++) {
        const char = text.charAt(i);
        if (char == "\\" && i < text.length - 1) {
            split[split.length - 1] += text.charAt(i + 1);
            i += 1;
        } else if (char == '"') {
            inString = !inString;
        } else if (char == " ") {
            if (inString) {
                split[split.length - 1] += char;
            } else {
                split.push("");
            }
        } else {
            split[split.length - 1] += char;
        }
    }
    if (inString) throw new InvalidCommandArgsError();
    return split.map((value) => {
        const num = parseInt(value);
        return isNaN(num) ? value : num;
    });
}
