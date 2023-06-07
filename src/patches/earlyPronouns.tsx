import { get, set } from "../common/store";

const { 
    metro: { 
        findByProps, 
        findStore,
        components: {
            Forms
        }
    } 
} = window["unbound"];
const React = window["React"];

const UserStore = findStore("User");
const Profile = findByProps("getUserProfile", { lazy: true });

export default {
    key: "earlyPronouns",
    title: "Early Pronouns",
    subtitle: () => `Set your own pronouns to ${get("pronouns", "")} early. Keep in mind others will not be able to see this.`,
    icon: "ic_accessibility_24px",

    patch(Patcher) {
        Patcher.after(Profile, "getUserProfile", (_, args, res) => {
            if (args[0] !== UserStore.getCurrentUser().id || !res
            || !get(this.key) || !get("pronouns", ""))  return;

            res.pronouns ||= get("pronouns", "");
        });
    },

    render(disabled: boolean) {
        return <Forms.FormInput 
            placeholder="Your pronouns go here"
            title="Pronouns"
            value={get("pronouns", "")}
            onChange={(value: string) => set("pronouns", value)}
            disabled={disabled}
            style={{ marginTop: -16 }}
        />;
    }
};
