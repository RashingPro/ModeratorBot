import {CommandDefinition} from "../index";

export const muteCommand: CommandDefinition = {
    name: "mute",
    handler: async (bot, message) => {
        await bot.sendMessage(message.chat.id, "Ok", {reply_to_message_id: message.message_id})
    }
}
