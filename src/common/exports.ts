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
    }
} = window["unbound"];

export const { BadgableTabBar } = metro.findByProps("BadgableTabBar", { lazy: true });
export const TextModule = metro.findByProps("TextStyleSheet", "Text", { lazy: true });
export const { GenericHeaderTitle, GenericSubHeaderTitle } = metro.findByProps("GenericHeaderTitle", { lazy: true });
export const Chat = metro.findByName("Chat");
export const MessageStore = metro.findStore("Message");
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
    processColor
} = window["ReactNative"];
export const React = window["React"];