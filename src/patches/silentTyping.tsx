import { metro, utilities } from '../common/exports';
import { Patch } from '../common/patch';

const { findByProps } = metro;
const { noop } = utilities;

const props = ['startTyping', 'stopTyping']
const TypingModule = findByProps(...props, { lazy: true })

export default class extends Patch {
    static override key = 'silentTyping';
    static override title = 'Silent Typing';
    static override subtitle = 'Hides your typing indicator for other users when sending a message in chat.';
    static override icon = 'ic_keyboard_24px';

    static override patch(Patcher) {
        props.forEach(prop => {
            Patcher.instead(TypingModule, prop, (self, args, orig) => {
                return this.enabled ? noop() : orig.apply(self, args);
            })
        })
    }
};
