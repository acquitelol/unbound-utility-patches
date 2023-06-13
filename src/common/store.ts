import manifest from '../../dist/manifest.json';
import { _get, _set } from './exports';
type Serializable = string | number | boolean | null | {
    [key: string | number]: Serializable;
} | Serializable[];

export const get = (prop: string, defaultValue: Serializable = false) => _get(manifest.name, prop, defaultValue)
export const set = (prop: string, value: Serializable) => _set(manifest.name, prop, value);   
export const setAll = (settings, sections: Record<string, Section>, value) => Object.values(sections)
    .map(({ patches }) => {
        Object.values(patches)
            .forEach(({ key }) => settings.set(`${key}.enabled`, value))
    });

export type Section = {
    icon: string;
    patches: Record<string, Patch>;
}

export type Patch = {
    key: string;
    title: string;
    subtitle: string;
    icon: string;
    patch: (Patcher: any) => any;
    render?({ disabled }): any;
};