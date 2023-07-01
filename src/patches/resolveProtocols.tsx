import { NativeModules, metro } from '../common/exports';
import { get } from '../common/store';
import { Patch } from '../common/patch';

const { DCDChatManager } = NativeModules;

export default class extends Patch {
    static override key = "resolveProtocols";
    static override title = "Resolve Protocols";
    static override subtitle = "Allows custom protocols (such as spotify:// and youtube://) to be pressable again.";
    static override icon = "icon-qs-links";

    private static resolveProtocols(content) {
        return content.map(item => {
            typeof item.content === "object" 
                && (item.content = this.resolveProtocols(item.content))

            if (typeof item?.content === "string"
                && !["codeBlock", "inlineCode"].includes(item?.type)
                && item?.content?.match(/[a-zA-Z]+\:\/\//g) 
            ) return {
                type: "link",
                target: item.content,
                content: [{ type: "text", content: item.content }]
            }

            return item;
        })
    }

    static override patch(Patcher) {
        Patcher.before(DCDChatManager, "updateRows", (_, args) => {
            if (!get(`${this.key}.enabled`)) return;

            const rows = JSON.parse(args[1]);

            for (const row of rows) {
                if (row && row?.message && row?.type === 1 && row.message?.content) {
                    row.message.content = this.resolveProtocols(row.message.content);
                }
            }

            args[1] = JSON.stringify(rows);
        })

    }
};
