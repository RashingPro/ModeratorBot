import {Message} from "node-telegram-bot-api";

export interface CommandDefinition {
    name: string,
    handler: (bot: Bot, message: Message) => Promise<void>
}

import { muteCommand } from "./mute";
import Bot from "../index";

export default [muteCommand]
