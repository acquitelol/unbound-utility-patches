import { ChatManager } from '../common/exports';
import { get } from '../common/store';
import { Patch } from '../common/patch';

export default class extends Patch {
    static override key = "gifPaste";
    static override title = "Gif Paste";
    static override subtitle = "Inserts a GIF link into the Chat instead of instantly sending it.";
    static override icon = "ic_share_ios";

    static override patch(Patcher) {
        Patcher.instead(ChatManager, "selectGIF", (self, args, orig) => {
            if (!get(`${this.key}.enabled`)) return orig.apply(self, args);

            ChatManager.insertText(args[0]?.url ?? "");
        });
    }
};
