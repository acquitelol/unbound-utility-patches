import headerPrimary from "./headerPrimary";
import jsonFix from "./jsonFix";
import tenorFix from './tenorFix';
import omitDisconnect from './omitDisconnect';
import bypassNsfwGate from './bypassNsfwGate';

import earlyPronouns from "./earlyPronouns";
import doubleTap from './doubleTap';
import usernameMention from './usernameMention';
import silentTyping from './silentTyping';
import codeBlocks from './codeBlocks';

import roleDots from "./roleDots";
import mediaItems from "./mediaItems";
import sourceAnimation from './sourceAnimation';
import expandableSheet from "./expandableSheet";

export const sections = {
    recommended: {
        icon: "img_nitro_star",
        patches: {
            headerPrimary,
            jsonFix,
            tenorFix,
            omitDisconnect,
            bypassNsfwGate
        }
    },
    utilities: {
        icon: "debug",
        patches: {
            earlyPronouns,
            doubleTap,
            usernameMention,
            silentTyping,
            codeBlocks
        }
    },
    preferences: {
        icon: "ic_pencil_24px",
        patches: {
            roleDots,
            mediaItems,
            sourceAnimation,
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
