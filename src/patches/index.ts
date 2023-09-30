import headerPrimary from './headerPrimary';
import tenorFix from './tenorFix';
import fixConnection from './fixConnection';
import safeBanner from './safeBanner';

import chatGestures from './chatGestures';
import codeBlocks from './codeBlocks';
import removeCall from './removeCall';

import silentTyping from './silentTyping';
import omitDisconnect from './omitDisconnect';
import bypassNsfwGate from './bypassNsfwGate';
import gifPaste from './gifPaste';

import roleDots from './roleDots';
import mediaItems from './mediaItems';
import sourceAnimation from './sourceAnimation';
import expandableSheet from './expandableSheet';

export const sections = {
    recommended: {
        icon: 'img_nitro_star',
        patches: {
            headerPrimary,
            tenorFix,
            fixConnection,
            safeBanner
        }
    },
    utilities: {
        icon: 'debug',
        patches: {
            chatGestures,
            codeBlocks,
            removeCall
        }
    },
    omittable: {
        icon: 'settings',
        patches: {
            silentTyping,
            omitDisconnect,
            bypassNsfwGate,
            gifPaste
        }
    },
    preferences: {
        icon: 'ic_pencil_24px',
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
        Object.values(section.patches).forEach(value => {
            try {
                value.patch(Patcher);
            } catch (e) {
                console.error(`Patch '${value.title}' (${value.key}) errored with '${e.message ?? e}'.`);
            };
        });
    });
