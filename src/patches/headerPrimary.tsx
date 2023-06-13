import { TextModule, metro, utilities } from '../common/exports';
import { get } from '../common/store';
import { Patch } from '../common/patch';

const { findByName, findByProps } = metro;
const { findInReactTree } = utilities;

const { Text } = TextModule;
const SettingsOverviewScreen = findByName("SettingsOverviewScreen", { interop: false });
const FormLabel = findByName("FormLabel", { interop: false });
const { getSettingTitle } = findByProps("getSettingTitle", { lazy: true });

export default class extends Patch {
    static override key = "headerPrimary";
    static override title = "Fix Text Labels";
    static override subtitle = "Forces all Text Labels to use 'text-normal' instead of the default 'header-primary'.";
    static override icon = "ic_add_text";

    static override patch(Patcher) {
        Patcher.after(FormLabel, "default", (_, __, res) => {
            if (!get(`${this.key}.enabled`)) return;

            res.props.color === "header-primary" && (res.props.color = "text-normal");
        })

        const unpatch = Patcher.after(SettingsOverviewScreen, "default", (_, __, res) => {
            unpatch();

            const { sections }: { sections: any[] } = findInReactTree(res, r => r.sections);
            const settings = sections
                .map(section => section.settings)
                .reduce((acc, obj) => [...acc, ...obj], [])
                .map((setting: string) => getSettingTitle(setting));

            Patcher.before(Text, "render", (_, args) => {
                if (!get(`${this.key}.enabled`)) return;

                if (args[0].variant === "text-md/semibold" 
                    && args[0].color === "header-primary"
                    && settings.includes(args[0].children)
                ) args[0].color = "text-normal";
            });
        });
    }
};
