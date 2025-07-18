import Logger from "../logger";
import guard from "../utils/guard";
import commands from "./commands";
import TelegramBot, { ConstructorOptions, Message } from "node-telegram-bot-api";

export interface BotOptions {
    token: string;
    logger: Logger;
    groupId: number;
}

export default class Bot extends TelegramBot {
    constructor(options: BotOptions & ConstructorOptions) {
        super(options.token, { polling: true });
        this.logger = options.logger;
        this.on(
            "message",
            guard(
                (msg) => {
                    const chatId = msg.chat.id;
                    return chatId == options.groupId;
                },
                (...args) => this.handleMessage(...args),
                (msg) =>
                    this.logger.warn(
                        `${msg.from?.username} (${msg.from?.id}) tried to use bot in channel \x1b[33m${msg.chat.title}\x1b[0m (${msg.chat.id}, type - ${msg.chat.type})`
                    )
            )
        );
    }

    public readonly logger: Logger;

    async handleMessage(message: Message) {
        try {
            if (message.text?.startsWith("/")) await this.handleCommand(message);
        } catch (err) {
            console.error(err);
        }
    }

    async handleCommand(message: Message) {
        const commandName = message.text?.split(" ")[0].slice(1);
        if (!commandName) return;
        const command = commands.find((value) => value.name === commandName);
        if (!command) return;
        await command.handler(this, message);
    }
}
