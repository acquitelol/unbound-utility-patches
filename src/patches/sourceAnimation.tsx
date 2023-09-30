import { BadgableTabBar, React, View, metro } from '../common/exports';
import { get, set } from '../common/store';
import { Patch } from '../common/patch';

const { findByProps } = metro;

const SourceManager = findByProps('getAnimatableSourceWithFallback', { lazy: true });

export default class self extends Patch {
    static override key = 'sourceAnimation';
    static override title = 'Source Animation';

    static override get subtitle() {
        return `${get(`${this.key}.animate`, true) ? 'Always' : 'Never'} animates any sourceable assets (such as Profile Pictures or Guild Icons).`;
    };
    
    static override get icon() {
        return get(`${this.key}.animate`, true) ? 'play' : 'pause';
    };
    
    static override patch(Patcher) {
        Patcher.before(SourceManager, 'getAnimatableSourceWithFallback', (_, args) => {
            if (!get(`${this.key}.enabled`)) return;

            args[0] = get(`${this.key}.animate`, true);
        });
    };

    static override render({ disabled }) {
        const [activeTab, setActiveTab] = React.useState(String(!!get(`${self.key}.animate`, true)));
        const tabs = [
            {
                id: 'false',
                title: 'Non-animated',
            },
            {
                id: 'true',
                title: 'Animated',
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
                    set(`${self.key}.animate`, JSON.parse(tab)), 
                    setActiveTab(tab)
                )}
            />
        </View>;
    }
};
