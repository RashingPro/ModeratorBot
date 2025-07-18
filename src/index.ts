import Bot from "./bot";
import Logger from "./logger";
import "dotenv/config";
import assert from "node:assert";

async function run() {
    assert(process.env.BOT_TOKEN && process.env.GROUP_ID);
    const token = process.env.BOT_TOKEN;
    const groupId = parseInt(process.env.GROUP_ID);
    const bot = new Bot(token, { groupId: groupId, logger: new Logger() });
    await bot.launch();
    console.log("Bot stopped!");
}

run();
