import { BadgableTabBar } from '../common/modules';
import { get, set } from '../common/store';

const { metro: { findByProps } } = window["unbound"];
const { View } = window["ReactNative"];
const React = window["React"];

const SourceManager = findByProps("getAnimatableSourceWithFallback", { lazy: true });

export default {
    key: "sourceAnimation",
    title: "Source Animation",
    subtitle: () => `${get("shouldAnimate", true) ? "Always" : "Never"} animates any sourceable assets (such as Profile Pictures or Guild Icons).`,
    icon: () => get("shouldAnimate", true) ? "play" : "pause",
    
    patch(Patcher) {
        Patcher.before(SourceManager, "getAnimatableSourceWithFallback", (_, args) => {
            if (!get(this.key)) return;

            args[0] = get("shouldAnimate", true);
        });
    },

    render(disabled: boolean) {
        const [activeTab, setActiveTab] = React.useState(String(!!get("shouldAnimate", true)));
        const tabs = [
            {
                id: "false",
                title: "Non-animated",
            },
            {
                id: "true",
                title: "Animated",
            }
        ]

        return <View 
            style={{
                opacity: disabled ? 0.5 : 1,
                marginHorizontal: 16,
                marginBottom: 12
            }}
        >
            <BadgableTabBar
                tabs={tabs}
                activeTab={activeTab}
                onTabSelected={(tab: string) => !disabled && (
                    set("shouldAnimate", JSON.parse(tab)), 
                    setActiveTab(tab)
                )}
            />
        </View>;
    }
};
