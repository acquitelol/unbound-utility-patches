import { NativeModules, processColor, metro, React, View, BadgableTabBar, utilities } from '../common/exports';
import { lowlight } from "lowlight";
import { get, set } from '../common/store';
import { getRandomString } from '../common/constants';
import { Patch } from '../common/patch';

type Node = { text: string | null; color: string | null };

const { DCDChatManager } = NativeModules;
const { common: { Theme: { colors, meta, unsafe_rawColors } }, stores: { Theme } } = metro;

export default class self extends Patch {
    static override key = "codeBlocks";
    static override title = "Code Blocks";
    static override subtitle = "Adds proper syntax highlighting to Code Blocks on iOS because Discord didn't.";
    static override icon = "ic_application_command_24px";

    private static styles = {
        themed: {
            title: unsafe_rawColors.BRAND_260,
            attr: unsafe_rawColors.BLUE_260,
            attribute: unsafe_rawColors.BLUE_260,
            literal: unsafe_rawColors.BLUE_260,
            meta: unsafe_rawColors.BLUE_260,
            number: unsafe_rawColors.BLUE_200,
            operator: unsafe_rawColors.BLUE_260,
            variable: unsafe_rawColors.BLUE_260,
            string: unsafe_rawColors.BLUE_230,
            regexp: unsafe_rawColors.BLUE_230,
            property: unsafe_rawColors.BLUE_230,
            built_in: unsafe_rawColors.ORANGE_330,
            symbol: unsafe_rawColors.ORANGE_330,
            name: unsafe_rawColors.PRIMARY_200,
            quote: unsafe_rawColors.PRIMARY_200,
            function: unsafe_rawColors.BRAND_260,
            default: unsafe_rawColors.WHITE_100,
            embed: meta.resolveSemanticColor(Theme.theme, colors.HEADER_PRIMARY)
        },
        git_hub: {
            title: "#d2a8ff",
            attr: "#79c0ff",
            attribute: "#79c0ff",
            literal: "#79c0ff",
            meta: "#79c0ff",
            number: "#79c0ff",
            operator: "#79c0ff",
            variable: "#79c0ff",
            string: "#a5d6ff",
            regexp: "#a5d6ff",
            property: "#a5d6ff",
            built_in: "#ffa657",
            symbol: "#ffa657",
            name: "#7ee787",
            quote: "#7ee787",
            function: "#d2a8ff",
            default: "#c9d1d9",
            embed: "#a5d6ff"
        },
        monokai: {
            title: "#c0eb6b",
            attr: "#c0eb6b",
            attribute: "#cd96e3",
            literal: "#fc7eac",
            meta: "#bdbaad",
            number: null,
            operator: null,
            variable: "#c0eb6b",
            string: "#c0eb6b",
            regexp: "#cd96e3",
            property: null,
            built_in: "#c0eb6b",
            symbol: "#cd96e3",
            name: "#fc7eac",
            quote: "#bdbaad",
            function: null,
            default: "#66d9ef",
            embed: "#c0eb6b"
        },
        x_code: {
            title: "#b58de2",
            attr: "#d4bc73",
            attribute: "#e677d3",
            literal: "#e677d3",
            meta: "#e93835",
            number: "#c1b8ff",
            operator: null,
            variable: "#acced2",
            string: "#e93835",
            regexp: "#e93835",
            property: "#e93835",
            built_in: "#b58de2",
            symbol: "#a799ff",
            name: "#fbd0f4",
            quote: "#89dc89",
            function: null,
            default: "#c0c0c0",
            embed: "#fbd0f4"
        }
    }

    private static get colors(): typeof self["styles"][keyof typeof self["styles"]] {
        return this.styles[get(`${this.key}.style`, "themed")];
    };

    static parse(content) {
        const embeds: any[] = [];

        content = content.filter((item) => {
            if (typeof item.content === "object") {
                item.content = this.parse(item.content).content
            };

            if (item.type === "codeBlock") {
                embeds.push({
                    type: "rich",
                    title: [
                        {
                            type: "text",
                            content: "Language: "
                        },
                        {
                            type: "inlineCode",
                            content: item.lang
                        },
                        {
                            type: "strong",
                            content: [{
                                type: "text",
                                content: " | "
                            }]
                        },
                        {
                            type: "text",
                            content: "Lines: "
                        },
                        {
                            type: "inlineCode",
                            content: item.content.split("\n").length.toString()
                        },
                        {
                            type: "strong",
                            content: [{
                                type: "text",
                                content: " | "
                            }]
                        },
                        {
                            type: "text",
                            content: "Chars: "
                        },
                        {
                            type: "inlineCode",
                            content: item.content.length.toString()
                        }
                    ],
                    description: this.highlight(item.content, item.lang),
                    borderLeftColor: processColor(this.colors.embed),
                    providerColor: processColor(this.colors[getRandomString(Object.keys(this.colors))] ?? this.colors.default),
                    headerTextColor: processColor(this.colors.name),
                    bodyTextColor: processColor(this.colors.string)
                })

                return false;
            }

            return true;
        })

        return { content, embeds };
    };

    static format(tree) {
        const results: Node[] = []
     
        if (tree.type === "text") {
            results.push({
                text: tree.value,
                color: null
            })
        
            return results;
        }
     
        if (tree.type === "element") {
            tree.children.forEach(child => {
                if (child.type === "element") return results.push(...this.format(child))
                results.push({
                    text: child.value,
                    color: tree.properties.className[0]?.replace(/hljs-/g, "")
                })
            })
        }
     
        return results;
    };

    static highlight(text: string, language: string) {
        text = text.split("\n").map((item, i) => `${(i + 1).toString().padStart(2)}  ${item}`).join("\n");

        const highlighted = lowlight.highlight(language, text);
        const formatted: Node[] = highlighted.children
            .map((child) => this.format(child))
            .reduce((prev, cur) => [...prev, ...cur], []);
            
        const final = formatted.map(item => {
            return {
                type: "link",
                content: [{
                    type: "text",
                    content: item.text
                }],
                target: 'usernameOnClick',
                messageFont: "SourceCodePro-Semibold",
                font: "SourceCodePro-Semibold",
                context: {
                    username: 1,
                    usernameOnClick: {
                        font: "SourceCodePro-Semibold",
                        messageFont: "SourceCodePro-Semibold",
                        linkColor: processColor(this.colors[item.color ?? "default"]),
                    },
                    medium: true,
                    font: "SourceCodePro-Semibold",
                    messageFont: "SourceCodePro-Semibold"
                },
            }
        });
        
        return final;
    };
    
    static override patch(Patcher) {
        Patcher.before(DCDChatManager, "updateRows", (_, args, __) => {
            if (!get(`${this.key}.enabled`)) return;

            const rows = JSON.parse(args[1]);

            for (const row of rows) {
                try {
                    if (row?.message?.content) {
                        if (!row?.message?.embeds) row.message.embeds = [];
                        const { content, embeds } = this.parse(row?.message?.content);

                        row.message.embeds.push(...embeds);
                        row.message.content = content;
                    }
                } catch(e) {
                    console.error(e)
                }
            }

            args[1] = JSON.stringify(rows);
        })
    };

    static override render({ disabled }) {
        const [activeTab, setActiveTab] = React.useState(get(`${self.key}.style`, "themed"));
        const tabs = Object.keys(self.styles).map(style => ({
            id: style,
            title: style
                .split("_")
                .map(word => utilities.capitalize(word))
                .join("")
        }))

        return <View 
            style={{
                opacity: disabled ? 0.5 : 1,
                marginHorizontal: 16,
                marginBottom: 12
            }}
        >
            <BadgableTabBar
                tabs={tabs}
                activeTab={activeTab}
                onTabSelected={(tab: string) => !disabled && (
                    set(`${self.key}.style`, tab), 
                    setActiveTab(tab)
                )}
            />
        </View>;
    }
};
