import { metro } from '../common/exports';
import { get } from '../common/store';
import { Patch } from '../common/patch';

const { findByProps } = metro;

const RemixingManager = findByProps("useIsRemixEnabledForMedia", { lazy: true });
const FileManager = findByProps("uploadLocalFiles", { lazy: true });

export default class extends Patch {
    static override key = "enableRemix";
    static override title = "Enable remixing";
    static override subtitle = "Allows you to remix media even if you aren't eligible or don't have nitro.";
    static override icon = "ic_sticker_icon_tilted";

    static override patch(Patcher) {
        Patcher.after(FileManager, "uploadLocalFiles", (_, args) => {
            if (!get(`${this.key}.enabled`)) return;

            args.forEach((arg) => {
                arg.items.forEach(item => {
                    item.isRemix = false;
                    item.item.isRemix = false;
                });
            })
        });

        ["useIsRemixEnabled",  "useIsRemixEnabledForMedia", "useIsCurrentUserEligibleForRemix"]
            .forEach(prop => Patcher.instead(RemixingManager, prop, () => true))
    }
};
