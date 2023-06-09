import { get } from '../common/store';

const { metro: { findByProps, stores: { Users } } } = window["unbound"];

const NSFWManager = findByProps("isNSFWInvite", { lazy: true });

export default {
    key: "bypassNsfwGate",
    title: "Bypass NSFW Gate",
    subtitle: "Allows you to bypass Discord's restrictions (regarding NSFW invites, guilds, etc) on iOS.",
    icon: "ic_shield_24px",
    
    patch(Patcher) {
        ["handleNSFWGuildInvite", "isNSFWInvite", "shouldNSFWGateGuild"]
            .forEach(prop => Patcher.instead(NSFWManager, prop, (self, args, orig) => {
                return get(this.key) ? false : orig.apply(self, args)
            }))

        Patcher.after(Users, "getCurrentUser", (_, __, res) => {
            res?.hasOwnProperty("nsfwAllowed") && (res.nsfwAllowed = true)
        });
    }
};
