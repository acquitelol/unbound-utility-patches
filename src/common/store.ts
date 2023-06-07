import manifest from '../../dist/manifest.json';
type Serializable = string | number | boolean | null | {
    [key: string | number]: Serializable;
} | Serializable[];

const {
    storage: {
        get: _get,
        set: _set
    }
} = window["unbound"];

export const get = (prop: string, defaultValue: Serializable = true) => _get(manifest.name, prop, defaultValue)
export const set = (prop: string, value: Serializable) => _set(manifest.name, prop, value);

export type Section = {
    icon: string;
    patches: Record<string, Patch>;
}

export type Patch = {
    key: string;
    title: (() => string) | string;
    subtitle: (() => string) | string;
    icon?: (() => string) | string;
    patch: (Patcher: any) => any;
    render?(disabled: boolean): any;
};