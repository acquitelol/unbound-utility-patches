import { metro } from '../common/exports';
import { Patch } from '../common/patch';

const { common: { Dispatcher } } = metro;
const AuthenticationUtilities = metro.findByProps('startSession', { lazy: true });
const AuthenticationStore = metro.findStore('Authentication');

export default class extends Patch {
    static override key = 'fixConnection';
    static override title = 'Fix Connection';
    static override subtitle = 'Fixes a recent Discord bug where you could infinitely be left on Connecting... on startup.';
    static override icon = 'history';

    static override patch(Patcher) {
        Patcher.after(AuthenticationUtilities, 'startSession', () => {
            if (!this.enabled) return;
            
            setTimeout(() => {
                if (!AuthenticationStore.getSessionId()) {
                    Dispatcher.dispatch({
                        type: 'APP_STATE_UPDATE', 
                        state: 'active'
                    })
                }
            }, 300)
        }, true);
    }
};
