const { metro } = window["unbound"];

export const { BadgableTabBar } = metro.findByProps("BadgableTabBar");
export const TextModule = metro.findByProps("TextStyleSheet", "Text");
export const { GenericHeaderTitle, GenericSubHeaderTitle } = metro.findByProps("GenericHeaderTitle");
export const { LayoutAnimation: { configureNext } } = window["ReactNative"];
export const Chat = metro.findByName("Chat");