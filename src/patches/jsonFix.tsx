import { metro } from '../common/exports';
import { get } from '../common/store';
import { Patch } from '../common/patch';

const { findByProps } = metro;

const FilesManager = findByProps("addFiles", "popFirstFile", { lazy: true });

export default class extends Patch {
    static override key = "jsonFix";
    static override title = "Upload JSON Files";
    static override subtitle = "Fixes a long-lasting bug of Discord where JSON files couldn't be sent properly.";
    static override icon = "icon-qs-files";

    static override patch(Patcher) {
        Patcher.after(FilesManager, "addFiles", (_, args) => {
            if (!get(`${this.key}.enabled`)) return;

            args[0].files.forEach((file) => {
                file.mimeType === "application/json" && (file.mimeType = "text/plain");
            });
        });
    }
};
