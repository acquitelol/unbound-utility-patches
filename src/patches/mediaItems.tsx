import { React, View, metro } from "../common/exports";
import { get, set } from "../common/store";
import { Patch } from "../common/patch";

const { 
    findByProps, 
    components: { 
        Forms, 
        Slider 
    }, 
    common: { 
        Theme: { 
            meta, 
            colors 
        } 
    },
    stores: {
        Theme
    }
} = metro;

const MediaItemManager = findByProps("getNumMediaItemsPerRow");
const renderLabel = (text: number | string, disabled: boolean) => (
    <Forms.FormLabel 
        text={text}
        color={"text-normal"}
        style={{ 
            marginHorizontal: 24,
            opacity: disabled ? 0.5 : 1
        }}
    />
);

export default class self extends Patch {
    static override key = "mediaItems";
    static override title = "Media Items";

    static override get subtitle() {
        return `Changes the amount of items per row in media picker to '${get(`${this.key}.number`, 2)}' instead of the default '3'.`;
    };

    static override icon = "ic_image";

    static override patch(Patcher) {
        Patcher.instead(MediaItemManager, "getNumMediaItemsPerRow", (self, args, orig) => {
            if (!get(`${this.key}.enabled`)) return orig.apply(self, args);

            return get(`${this.key}.number`, 2);
        });
    };
    
    static override render({ disabled }) {
        const minimum = 1;
        const maximum = 8;

        return <View 
            style={{ 
                alignItems: "center", 
                flexDirection: "row" 
            }}
        >
            {renderLabel(minimum, disabled)}
            <Slider
                value={get(`${self.key}.number`, 2)}
                minimumValue={minimum}
                maximumValue={maximum}
                style={{ flex: 1 }}
                minimumTrackTintColor={meta.resolveSemanticColor(Theme.theme, colors.HEADER_PRIMARY)}
                maximumTrackTintColor={meta.resolveSemanticColor(Theme.theme, colors.BACKGROUND_PRIMARY)}
                step={1}
                onValueChange={(value: number) => set(`${self.key}.number`, value)}
                disabled={disabled}
                tapToSeek
            />
            {renderLabel(maximum, disabled)}
        </View>;
    }
};
