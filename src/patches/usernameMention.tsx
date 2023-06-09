import { Chat } from '../common/modules';
import { get } from '../common/store';

const { metro: { findByProps, findStore } } = window["unbound"];
const ReactNative = window["ReactNative"];

const MessageStore = findStore("Message");
const [
    ChatManager,
    { getChannelId }
] = findByProps(
    { params: ["insertText"], lazy: true },
    { params: ["getLastSelectedChannelId"], lazy: true },
    { bulk: true }
);

const Handler = new Proxy({ unpatch: null }, {
    set(target, prop, value, receiver) {
        Reflect.get(target, prop, receiver)?.();
        return Reflect.set(target, prop, value, receiver);
    }
})


export default {
    key: "usernameMention",
    title: "Username Mention",
    subtitle: "Matches behavior on platforms where tapping a username in chat mentions the person.",
    icon: "ic_mention_user",
    
    patch(Patcher) {
        Patcher.after(Chat.prototype, "render", (_, __, res) => {
            ReactNative.Platform.OS !== "android"
                && res?.props?.onTapUsername
                && (Handler.unpatch = Patcher.instead(res?.props, "onTapUsername", (self, args, orig) => {
                    if (!get(this.key)) return orig.apply(self, args);

                    const { messageId } = args[0].nativeEvent;
        
                    const message = MessageStore.getMessage(
                        getChannelId(),
                        messageId
                    )
        
                    if (!message) return;
                    
                    const { username, discriminator } = message.author;
                    ChatManager.insertText(`@${username}${Boolean(Number(discriminator)) ? `#${discriminator}` : ""}`)
                }))
        });
    }
};
