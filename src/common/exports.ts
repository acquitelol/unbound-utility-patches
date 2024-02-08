export const {
    utilities,
    metro,
    assets: {
        getIDByName
    },
    storage: {
        useSettingsStore,
        get: _get,
        set: _set
    },
    patcher: {
        createPatcher
    },
    utilities: {
        findInReactTree
    }
} = window['unbound'];

export const { BadgableTabBar } = metro.findByProps('BadgableTabBar', { lazy: true });
export const { GenericHeaderTitle, GenericSubHeaderTitle } = metro.findByProps('GenericHeaderTitle', { lazy: true });
export const Handlers = metro.findByProps('MessagesHandlers', { lazy: true });
export const MessageStore = metro.findStore('Message', { lazy: true });
export const ChatManager = metro.findByProps('insertText', { lazy: true });
export const { getChannelId } = metro.findByProps('getLastSelectedChannelId', { lazy: true })
export const Forms = metro.findByProps('FormRow', 'FormSection');

export const {
    NativeModules,
    ScrollView,
    TouchableOpacity,
    View,
    Platform,
    LayoutAnimation: {
        create,
        configureNext
    },
    processColor,
    Image
} = window['ReactNative'];
export const React = window['React'];