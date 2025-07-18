import { type Config } from "prettier";

const config: Config = {
    trailingComma: "none",
    endOfLine: "crlf",
    tabWidth: 4,
    plugins: ["@trivago/prettier-plugin-sort-imports"]
};
export default config;
