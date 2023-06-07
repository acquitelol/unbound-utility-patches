import { Section } from '../common/store';

import headerPrimary from "./headerPrimary";
import jsonFix from "./jsonFix";
import tenorFix from './tenorFix';
import doubleTap from './doubleTap';
import usernameMention from './usernameMention';

import roleDots from "./roleDots";
import mediaItems from "./mediaItems";
import earlyPronouns from "./earlyPronouns";
import expandableSheet from "./expandableSheet";

export const sections: Record<string, Section> = {
    recommended: {
        icon: "img_nitro_star",
        patches: {
            headerPrimary,
            jsonFix,
            tenorFix,
            doubleTap,
            usernameMention
        }
    },
    preferences: {
        icon: "ic_pencil_24px",
        patches: {
            roleDots,
            mediaItems,
            earlyPronouns,
            expandableSheet
        }
    }
};

export const patchAll = (Patcher) => Object.values(sections)
    .forEach(section => {
        Object.values(section.patches)
            .forEach(value => {
                try {
                    value.patch(Patcher);
                } catch (e) {
                    console.error(`Patch '${value.title}' (${value.key}) errored with '${e.message ?? e}'.`);
                };
            });
    });
