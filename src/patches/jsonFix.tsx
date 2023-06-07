import { get } from '../common/store';

const { metro: { findByProps } } = window["unbound"];

const FilesManager = findByProps("addFiles", "popFirstFile", { lazy: true });

export default {
    key: "jsonFix",
    title: "Upload JSON Files",
    subtitle: "Fixes a long-lasting bug of Discord where JSON files couldn't be sent properly.",
    icon: "icon-qs-files",
    
    patch(Patcher) {
        Patcher.after(FilesManager, "addFiles", (_, args) => {
            if (!get(this.key)) return;

            args[0].files.forEach((file) => {
                file.mimeType === "application/json" && (file.mimeType = "text/plain");
            });
        });
    }
};
