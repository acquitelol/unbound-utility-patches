export abstract class Patch {
    static key: string;
    static title: string;
    static subtitle: string;
    static icon: string;

    static patch(Patcher) {};
    static render({ disabled }) {};
}