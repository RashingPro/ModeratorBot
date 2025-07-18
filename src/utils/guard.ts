import { Message } from "node-telegram-bot-api";

export default function guard(
    checkerFn: (message: Message) => boolean,
    onPass: (message: Message) => void,
    onFail?: (message: Message) => void
) {
    return (message: Message) => {
        const check = checkerFn(message);
        if (!check) {
            if (onFail) {
                onFail(message);
            }
        } else onPass(message);
    };
}
