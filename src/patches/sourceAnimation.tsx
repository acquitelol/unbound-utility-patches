import { BadgableTabBar, React, View, metro } from '../common/exports';
import { Patch } from '../common/patch';

const { findByProps } = metro;

const SourceManager = findByProps('getAnimatableSourceWithFallback', { lazy: true });

export default class self extends Patch {
    static override key = 'sourceAnimation';
    static override title = 'Source Animation';

    static override get subtitle() {
        return `${this.get('animate', true) ? 'Always' : 'Never'} animates any sourceable assets (such as Profile Pictures or Guild Icons).`;
    };
    
    static override get icon() {
        return this.get('animate', true) ? 'play' : 'pause';
    };
    
    static override patch(Patcher) {
        Patcher.before(SourceManager, 'getAnimatableSourceWithFallback', (_, args) => {
            if (!this.enabled) return;

            args[0] = this.get('animate', true);
        });
    };

    static override render({ disabled }) {
        const [activeTab, setActiveTab] = React.useState(String(!!self.get('animate', true)));
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
                    self.set('animate', JSON.parse(tab)),
                    setActiveTab(tab)
                )}
            />
        </View>;
    }
};
