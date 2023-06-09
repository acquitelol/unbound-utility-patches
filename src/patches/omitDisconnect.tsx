import { get } from '../common/store';

const { metro: { findByProps }, utilities: { noop } } = window["unbound"];

const { Timeout } = findByProps("Timeout", { lazy: true });

export default {
    key: "omitDisconnect",
    title: "Omit Disconnect",
    subtitle: "Stops Discord from kicking you out of a voice call after 5 minutes of inactivity in it.",
    icon: "disconnect",
    
    patch(Patcher) {
        Patcher.before(Timeout.prototype, "start", (_, args) => {
            if (!get(this.key)) return;

            args[1].name === "disconnect" && (args[1] = noop);
        });
    }
};
