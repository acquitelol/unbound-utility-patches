import { metro } from '../common/exports';
import { Patch } from '../common/patch';

const { findByProps, stores: { Users } } = metro;

const NSFWManager = findByProps('isNSFWInvite', { lazy: true });

export default class extends Patch {
    static override key = 'bypassNsfwGate';
    static override title = 'Bypass NSFW Gate';
    static override subtitle = 'Allows you to bypass Discord\'s restrictions (regarding NSFW invites, guilds, etc) on iOS.';
    static override icon = 'ic_shield_24px';

    static override patch(Patcher) {
        ['handleNSFWGuildInvite', 'isNSFWInvite', 'shouldNSFWGateGuild']
            .forEach(prop => {
                Patcher.instead(NSFWManager, prop, (self, args, orig) => {
                    return this.enabled ? false : orig.apply(self, args)
                })
            })

        Patcher.after(Users, 'getCurrentUser', (_, __, res) => {
            if (!this.enabled) return;

            res?.hasOwnProperty('nsfwAllowed') && (res.nsfwAllowed = true)
        });
    }
};
