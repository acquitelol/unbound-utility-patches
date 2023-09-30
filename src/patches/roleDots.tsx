import { NativeModules } from '../common/exports';
import { get } from '../common/store';
import { Patch } from '../common/patch';

const { DCDChatManager } = NativeModules;

export default class extends Patch {
    static override key = 'roleDots';
    static override title = 'Add Role Dots';
    static override subtitle = 'Force-enables role-dots aswell as role-colors disregarding your accessibility settings.';
    static override icon = 'ic_members';

    static override patch(Patcher) {
        Patcher.before(DCDChatManager, 'updateRows', (_, args) => {
            if (!get(`${this.key}.enabled`)) return;
            
            const rows = JSON.parse(args[1]);

            for (const row of rows) {
                if (row.type === 1) {
                    row.message.shouldShowRoleDot = true;
                    row.message.shouldShowRoleOnName = true;
                };
            };

            args[1] = JSON.stringify(rows);
        });
    }
};
