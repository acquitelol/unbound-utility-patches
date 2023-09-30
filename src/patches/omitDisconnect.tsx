import { metro, utilities } from '../common/exports';
import { get } from '../common/store';
import { Patch } from '../common/patch';

const { findByProps } = metro;
const { noop } = utilities;

const { Timeout } = findByProps('Timeout', { lazy: true });

export default class extends Patch {
    static override key = 'omitDisconnect';
    static override title = 'Omit Disconnect';
    static override subtitle = 'Stops Discord from kicking you out of a voice call after 5 minutes of inactivity in it.';
    static override icon = 'disconnect';

    static override patch(Patcher) {
        Patcher.before(Timeout.prototype, 'start', (_, args) => {
            if (!get(`${this.key}.enabled`)) return;

            args[1].name === 'disconnect' && (args[1] = noop);
        });
    }
};
