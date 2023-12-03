export const {
    utilities,
    metro,
    components,
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
    }
} = window['unbound'];

export const { BadgableTabBar } = metro.findByProps('BadgableTabBar', { lazy: true });
export const { GenericHeaderTitle, GenericSubHeaderTitle } = metro.findByProps('GenericHeaderTitle', { lazy: true });
export const Handlers = metro.findByProps('MessagesHandlers');
export const MessageStore = metro.findStore('Message');
export const [
    ChatManager,
    { getChannelId }
] = metro.findByProps(
    { params: ['insertText'], lazy: true },
    { params: ['getLastSelectedChannelId'], lazy: true },
    { bulk: true }
);

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