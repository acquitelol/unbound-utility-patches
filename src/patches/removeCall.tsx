import { findInReactTree, getIDByName, metro } from '../common/exports';
import { Patch } from '../common/patch';

const { findByName } = metro;

const UserProfileActions = findByName("UserProfileActions", { interop: false });

export default class extends Patch {
    static override key = 'removeCall';
    static override title = 'Remove Call';
    static override subtitle = 'Removes the call and video buttons from inside of user profiles to prevent mistaps.';
    static override get icon() {
        return `ic_${this.enabled ? 'hide' : 'show'}_password`
    }

    private static removeButtons(buttons) {
        if (!buttons || !this.enabled) return;
        
        delete buttons[1];
        delete buttons[2];
    }

    static override patch(Patcher) {
        Patcher.after(UserProfileActions, "default", (_, __, res) => {
            if(!this.enabled) return;

            const videoCallAsset = getIDByName("ic_video");
            const buttons = findInReactTree(res, r => r.find(x => x?.props?.icon === videoCallAsset))
                
            this.removeButtons(buttons);
        })
    }
};