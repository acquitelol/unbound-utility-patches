import { BadgableTabBar, React, View, metro } from '../common/exports';
import { Patch } from '../common/patch';

const { findByProps } = metro;

const { ActionSheet } = findByProps('ActionSheet', { all: true }).find(x => !x.hasOwnProperty('useToken'))

export default class self extends Patch {
    static override key = 'expandableSheet';
    static override title = 'Expandable ActionSheets';

    static override get subtitle() {
        return `Forces any User-Profile Action Sheets to always initially render as ${this.get('expand') ? '' : 'non-'}expanded.`;
    };

    static override get icon() {
        return `ic_chevron_${this.get('expand', false) ? 'up' : 'down' }_24px`;   
    };

    static override patch(Patcher) {
        Patcher.before(ActionSheet, 'render', (_, args) => {
            if (!args[0].startExpanded || !this.enabled) return;

            args[0].startExpanded = this.get('expand', false);
        })
    };

    static override render({ disabled }) {
        const [activeTab, setActiveTab] = React.useState(String(!!self.get('expand', false)));
        const tabs = [
            {
                id: 'false',
                title: 'Non-expanded',
            },
            {
                id: 'true',
                title: 'Expanded',
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
                    self.set('expand', JSON.parse(tab)), 
                    setActiveTab(tab)
                )}
            />
        </View>
    }
};
