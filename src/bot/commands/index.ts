import Bot from "../index";
import { muteCommand } from "./mute";
import { Message } from "node-telegram-bot-api";

export interface CommandDefinition {
    name: string;
    handler: (bot: Bot, message: Message) => Promise<void>;
}

export default [muteCommand];
