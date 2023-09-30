import { metro } from '../common/exports';
import { get } from '../common/store';
import { Patch } from '../common/patch';

const { findByProps } = metro;

const MediaManager = findByProps('downloadMediaAsset', { lazy: true });

export default class extends Patch {
    static override key = 'tenorFix';
    static override title = 'Save Tenor GIFs';
    static override subtitle = 'Fixes a long-lasting bug of Discord where Tenor GIFs saved as MP4s instead of GIFs.';
    static override icon = 'ic_download_24px';
    
    static override patch(Patcher) {
        Patcher.before(MediaManager, 'downloadMediaAsset', (_, args) => {
            if (!get(`${this.key}.enabled`)) return;

            const [uri]: [string] = args;
            const prefix = '.tenor.com';

            if (!uri.includes(prefix)) return;

            const path = uri.split('/');
            const startIndex = path.findIndex(item => item.includes(prefix));

            if (startIndex === -1) return;
            
            let [hostname, tenorID, fileName] = path.slice(startIndex, startIndex + 3);

            tenorID = `${tenorID.slice(0, -2)}AC`
            fileName = fileName.replace('.mp4', '.gif');

            args[0] = `https://${hostname}/${tenorID}/${fileName}`;
            args[1] = args[0].includes('.gif') ? 1 : 2;
        });
    }
};
