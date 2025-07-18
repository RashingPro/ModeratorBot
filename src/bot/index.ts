import {Context, Telegraf} from "telegraf";
import Logger from "../logger";

export interface BotOptions {
    groupId: number,
    logger: Logger
}

export default class Bot extends Telegraf {
    constructor(token: string, options: Partial<Telegraf.Options<Context>> & BotOptions) {
        super(token, options);

        this.on("message", async (ctx, next) => {
            const channel_id = ctx.chat.id
            if (channel_id !== options.groupId) {
                options.logger.log(`Tried to run in forbidden channel: ${channel_id}`)
                return;
            }
            await next()
        })
    }
}
