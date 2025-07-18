import Bot from "./bot";
import assert from "node:assert";
import "dotenv/config"
import Logger from "./logger";

async function run() {
    assert(process.env.BOT_TOKEN && process.env.GROUP_ID)
    const token = process.env.BOT_TOKEN;
    const groupId = parseInt(process.env.GROUP_ID)
    const bot = new Bot(token, {groupId: groupId, logger: new Logger()})
    await bot.launch()
    console.log("Bot stopped!")
}

run()
