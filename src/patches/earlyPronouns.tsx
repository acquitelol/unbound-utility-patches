import { metro, React } from "../common/exports";
import { get, set } from "../common/store";
import { Patch } from "../common/patch";

const { findByProps, components: { Forms }, stores: { Users } } = metro;

const Profile = findByProps("getUserProfile", { lazy: true });

export default class self extends Patch {
    static override key = "earlyPronouns";
    static override title = "Early Pronouns";

    static override get subtitle() {
        return `Set your pronouns to ${get(`${this.key}.pronouns`, "")} early. Keep in mind others will not be able to see this.`;
    };

    static override icon = "ic_accessibility_24px";

    static override patch(Patcher) {
        Patcher.after(Profile, "getUserProfile", (_, args, res) => {
            if (args[0] !== Users.getCurrentUser().id || !res
            || !get(`${this.key}.enabled`) || !get(`${this.key}.pronouns`, ""))  return;

            res.pronouns ||= get(`${this.key}.pronouns`, "");
        });
    };

    static override render({ disabled }) {
        return <Forms.FormInput 
            placeholder="Your pronouns go here"
            title="Pronouns"
            value={get(`${self.key}.pronouns`, "")}
            onChange={(value: string) => set(`${self.key}.pronouns`, value)}
            disabled={disabled}
            style={{ marginTop: -16 }}
        />;
    }
};
