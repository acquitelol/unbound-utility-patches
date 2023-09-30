import { metro, utilities } from '../common/exports';
import { get } from '../common/store';
import { Patch } from '../common/patch';

const { findByName, findByProps } = metro;
const { findInReactTree } = utilities;

const FormLabel = findByName('FormLabel', { interop: false });
const CardModule = findByProps('Card', { all: true, lazy: true }).find(x => !('TableRowIcon' in x)) 

export default class extends Patch {
    static override key = 'headerPrimary';
    static override title = 'Fix Text Labels';
    static override subtitle = 'Forces all Text Labels to use \'text-normal\' instead of the default \'header-primary\'.';
    static override icon = 'ic_add_text';

    static override patch(Patcher) {
        Patcher.after(FormLabel, 'default', (_, __, res) => {
            if (!get(`${this.key}.enabled`)) return;

            res.props.color === 'header-primary' && (res.props.color = 'text-normal');
        })

        Patcher.after(CardModule, 'Card', (_, __, res) => {
            if (!get(`${this.key}.enabled`)) return;

            const text = findInReactTree(res, x => 
                typeof x.props?.children === 'string'
                && typeof x.props?.variant === 'string'
            )

            if (!text) return;
            if (text.props.color === 'header-primary') text.props.color = 'text-normal';
        });
    }
};
