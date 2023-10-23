import { View } from '../common/exports';
import { Patch } from '../common/patch';

export default class extends Patch {
    static override key = 'safeBanner';
    static override title = 'Safe Banner';
    static override subtitle = 'Adds significant top margin to the YouScreen to push it out of the Status Bar.';
    static override icon = 'ic_gridview';

    static override patch(Patcher) {
        Patcher.before(View, 'render', (_, args) => {
            if (!this.enabled || args[0]?.nativeID !== 'you-screen-native-id') return;

            args[0].style = [args[0].style, { marginTop: 48 }]
        });
    }
};
