import { metro } from '../common/exports';
import { get } from '../common/store';
import { Patch } from '../common/patch';

const { common: { Dispatcher } } = metro;

export default class extends Patch {
    static override key = "fixConnection";
    static override title = "Fix Connection";
    static override subtitle = "Fixes a recent Discord bug where you could infinitely be left on Connecting... on startup.";
    static override icon = "history";

    static override patch(Patcher) {
        Patcher.after(Dispatcher, "dispatch", (_, args) => {
            if (!get(`${this.key}.enabled`) || args[0].type !== "LOAD_MESSAGES_SUCCESS") return;

            Dispatcher.dispatch({
                type: "APP_STATE_UPDATE",
                state: "active"
            })
        });
    }
};
