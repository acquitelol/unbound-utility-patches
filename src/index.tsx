import manifest from '../dist/manifest.json';
import Settings from './common/settings';
import { patchAll } from './patches';

const React = window["React"];
const { patcher: { createPatcher } } = window["unbound"];

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
