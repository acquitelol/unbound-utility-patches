import manifest from '../dist/manifest.json';
import Settings from './common/settings';
import { patchAll } from './patches';
import { React, createPatcher } from './common/exports';

const Patcher = createPatcher(manifest.name);

class Plugin {
    start() {
        patchAll(Patcher);
    }

    stop() {
        Patcher.unpatchAll();
    }

    settings() {
        return <Settings />
    }
};

export default new Plugin();
