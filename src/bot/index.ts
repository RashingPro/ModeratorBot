import TelegramBot, {ConstructorOptions, Message} from "node-telegram-bot-api";
import guard from "../utils/guard";
import Logger from "../logger";

export interface BotOptions {
    token: string,
    logger: Logger,
    groupId: number
}

export default class Bot extends TelegramBot {
    constructor(options: BotOptions & ConstructorOptions) {
        super(options.token, { polling: true });
        this.on("message", guard((msg) => true, this.handleCommand));
    }

    handleCommand(message: Message) {

    }
}
