import { ChatManager, Handlers, MessageStore, Platform, getChannelId, metro } from '../common/exports';
import { get } from '../common/store';
import { Patch } from '../common/patch';

const { findByProps, stores: { Users } } = metro;

const Messages = findByProps('sendMessage', 'startEditMessage', { lazy: true });

export default class extends Patch {
    static override key = 'chatGestures';
    static override title = 'Chat Gestures';
    static override subtitle = 'Adds more gestures in the chat (such as double tap to edit and username mention).';
    static override icon = 'ChatIcon';

    private static taps = 0;
    private static handler = new Proxy(
        { 
            unpatchTapMessage: null,
            unpatchTapUsername: null 
        }, 
        {
            set(target, prop, value, receiver) {
                Reflect.get(target, prop, receiver)?.();
                return Reflect.set(target, prop, value, receiver);
            }
        }
    );

    private static patchTapMessage(Patcher, res) {
        if (res?.handleTapMessage) {
            this.handler.unpatchTapMessage = Patcher.after(res, 'handleTapMessage', (_, [{ nativeEvent }]) => {
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
            })
        }
    }

    private static patchTapUsername(Patcher, res) {
        if (res?.handleTapUsername && Platform.OS !== 'android') {
            this.handler.unpatchTapUsername = Patcher.instead(res, 'handleTapUsername', (self, args, orig) => {
                if (!get(`${this.key}.enabled`)) return orig.apply(self, args);

                const { messageId } = args[0].nativeEvent;
                const channelId = getChannelId();
    
                const message = MessageStore.getMessage(
                    channelId,
                    messageId
                )
    
                if (!message) return;
                
                const { username, discriminator } = message.author;
                ChatManager.insertText(channelId, `@${username}${Boolean(Number(discriminator)) ? `#${discriminator}` : ''}`)
            })
        }
    }

    static override patch(Patcher) {
        Patcher.after(Handlers, 'MessagesHandlers', (_, __, res) => {
            this.patchTapMessage(Patcher, res);
            this.patchTapUsername(Patcher, res);
        }, true);
    }
};
