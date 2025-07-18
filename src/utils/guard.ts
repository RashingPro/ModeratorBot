import { Message } from "node-telegram-bot-api";

export default function guard(checkerFn: (message: Message) => boolean, callbackFn: (message: Message) => void) {
    return (message: Message) => {
        const check = checkerFn(message);
        if (!check) return;
        callbackFn(message);
    };
}
