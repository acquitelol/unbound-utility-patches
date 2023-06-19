import { Chat, ChatManager, MessageStore, Platform, getChannelId } from '../common/exports';
import { get } from '../common/store';
import { Patch } from '../common/patch';

export default class extends Patch {
    static override key = "usernameMention";
    static override title = "Username Mention";
    static override subtitle = "Matches behavior where tapping a username in chat mentions the person.";
    static override icon = "ic_mention_user";

    private static handler = new Proxy({ unpatch: null }, {
        set(target, prop, value, receiver) {
            Reflect.get(target, prop, receiver)?.();
            return Reflect.set(target, prop, value, receiver);
        }
    })
    
    static override patch(Patcher) {
        Patcher.after(Chat.prototype, "render", (_, __, res) => {
            Platform.OS !== "android"
                && res?.props?.onTapUsername
                && (this.handler.unpatch = Patcher.instead(res?.props, "onTapUsername", (self, args, orig) => {
                    if (!get(`${this.key}.enabled`)) return orig.apply(self, args);

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
