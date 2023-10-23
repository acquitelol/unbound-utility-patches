import { get, set } from '../common/store';

export abstract class Patch {
    static key: string;
    static title: string;
    static subtitle: string;
    static icon: string;

    static get(key: string, def?: any) {
        return get(`${this.key}.${key}`) ?? def
    }

    static set(key: string, value: any) {
        return set(`${this.key}.${key}`, value);
    }

    static get enabled() {
        return this.get('enabled');
    }

    static patch(Patcher) { };
    static render({ disabled }) { };
}