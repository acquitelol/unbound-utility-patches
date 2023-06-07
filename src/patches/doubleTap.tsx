import { Chat } from '../common/modules';
import { get } from '../common/store';

const { metro: { findByProps, findStore, stores: { Users } } } = window["unbound"];

const MessageStore = findStore("Message");
const Messages = findByProps("sendMessage", "startEditMessage", { lazy: true });

export default {
    key: "doubleTap",
    title: "Double Tap",
    subtitle: "Allows you to double tap on any of your own messages to start an edit event on them.",
    icon: "ic_edit_24px",
    tapIndex: 0,
    
    patch(Patcher) {
        Patcher.after(Chat.prototype, "render", (_, __, res) => {
            Patcher.after(res.props, "onTapMessage", (_, [{ nativeEvent }]) => {
                if (!get(this.key)) return;
                
                const ChannelID = nativeEvent.channelId;
                const MessageID = nativeEvent.messageId;

                this.tapIndex++;
    
                let timeoutTap = setTimeout(() => this.tapIndex = 0, 300);

                if (this.tapIndex !== 2) return;
                clearTimeout(timeoutTap);

                const { author: { id }, content } = MessageStore.getMessage(ChannelID, MessageID);

                Users.getCurrentUser()?.id === id 
                    && Messages.startEditMessage(
                        ChannelID,
                        MessageID,
                        content
                    );

                this.tapIndex = 0;
            })
        });
    }
};
