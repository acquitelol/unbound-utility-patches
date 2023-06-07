import { get } from '../common/store';

const { metro: { findByProps } } = window["unbound"];

const MediaManager = findByProps("downloadMediaAsset", { lazy: true });

export default {
    key: "tenorFix",
    title: "Save Tenor GIFs",
    subtitle: "Fixes a long-lasting bug of Discord where Tenor GIFs saved as MP4s instead of GIFs.",
    icon: "ic_download_24px",
    
    patch(Patcher) {
        Patcher.before(MediaManager, "downloadMediaAsset", (_, args) => {
            if (!get(this.key)) return;

            const [uri]: [string] = args;
            const prefix = ".tenor.com";

            if (!uri.includes(prefix)) return;

            const path = uri.split("/");
            const startIndex = path.findIndex(item => item.includes(prefix));

            if (startIndex === -1) return;
            
            let [, hostname, tenorID, fileName] = path.slice(startIndex, startIndex + 3);

            tenorID = `${tenorID.slice(0, -2)}AC`
            fileName = fileName.replace(".mp4", ".gif");

            args[0] = `https://${hostname}/${tenorID}/${fileName}`;
            args[1] = args[0].includes(".gif") ? 1 : 2;
        });
    }
};
