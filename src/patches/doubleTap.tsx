import { Chat, MessageStore, metro } from '../common/exports';
import { get } from '../common/store';
import { Patch } from '../common/patch';

const { findByProps, stores: { Users } } = metro;

const Messages = findByProps("sendMessage", "startEditMessage", { lazy: true });

export default class extends Patch {
    static override key = "doubleTap";
    static override title = "Double Tap";
    static override subtitle = "Allows you to double tap on any of your own messages to start an edit event on them.";
    static override icon = "ic_edit_24px";

    private static taps = 0;
    private static handler = new Proxy({ unpatch: null }, {
        set(target, prop, value, receiver) {
            Reflect.get(target, prop, receiver)?.();
            return Reflect.set(target, prop, value, receiver);
        }
    });

    static override patch(Patcher) {
        Patcher.after(Chat.prototype, "render", (_, __, res) => {
            res?.props?.onTapMessage
                && (this.handler.unpatch = Patcher.after(res.props, "onTapMessage", (_, [{ nativeEvent }]) => {
                    if (!get(`${this.key}.enabled`)) return;
                    
                    const ChannelID = nativeEvent.channelId;
                    const MessageID = nativeEvent.messageId;

                    this.taps++;
        
                    let timeoutTap = setTimeout(() => this.taps = 0, 300);

                    if (this.taps !== 2) return;
                    clearTimeout(timeoutTap);

                    const { author: { id }, content } = MessageStore.getMessage(ChannelID, MessageID);

                    Users.getCurrentUser()?.id === id 
                        && Messages.startEditMessage(
                            ChannelID,
                            MessageID,
                            content
                        );

                    this.taps = 0;
                }))
        });
    }
};
