import { ChatManager } from '../common/exports';
import { Patch } from '../common/patch';

export default class extends Patch {
    static override key = 'gifPaste';
    static override title = 'Gif Paste';
    static override subtitle = 'Inserts any selected GIF link into the Chat Input first instead of instantly sending it.';
    static override icon = 'ic_share_ios';

    static override patch(Patcher) {
        Patcher.instead(ChatManager, 'selectGIF', (self, args, orig) => {
            if (!this.enabled) return orig.apply(self, args);

            ChatManager.insertText(args[0], args[1]?.url ?? '');
        });
    }
};
