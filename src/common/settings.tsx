import { get, setAll } from "./store";
import { sections } from "../patches";
import {
    GenericHeaderTitle, 
    GenericSubHeaderTitle,
    React,
    ScrollView,
    View,
    configureNext, 
    create,
    getIDByName,
    metro,
    useSettingsStore,
    utilities
} from "./exports";
import { ToggleableSection, buttons, styles } from "./constants";
import manifest from '../../dist/manifest.json';

const {
    findByName,
    components: {
        Forms,
        Redesign: {
            TableSwitchRow,
            TableRowIcon
        },
        Button
    }
} = metro;

const SettingSearchBar = findByName("SettingSearchBar");

export default () => {
    const settings = useSettingsStore(manifest.name);
    const [query, setQuery] = React.useState("");

    return <ScrollView>
        <View style={styles.titles}>
            <GenericHeaderTitle title={"Customize your ideal experience."} />
            <GenericSubHeaderTitle subtitle={manifest.description} />
        </View>
        <View style={styles.navigation}>
            <View style={styles.shadow}>
                <SettingSearchBar
                    text={query}
                    onChangeText={(text: string) => setQuery(text)}
                    clearText={() => setQuery("")}
                />
            </View>
            <View style={styles.shadow}>
                <View style={{ flexDirection: "row" }}>
                    {buttons.map(({ title, value }, _, { length }) => {
                        return <Button
                            color={Button.Colors.BRAND}
                            text={title}
                            size={Button.Sizes.MEDIUM}
                            onPress={() => {
                                setAll(settings, sections, value);
                                configureNext(create(300, "keyboard"))
                            }}
                            style={{ 
                                marginTop: 16,
                                borderRadius: 12,
                                marginHorizontal: 4,
                                flex: 1 / length
                            }}
                        />
                    })}
                </View>
            </View>
        </View>
        <View style={styles.section}>
            {Object.entries(sections).map(([title, { icon, patches }]) => (
                <ToggleableSection
                    key={title}
                    title={utilities.capitalize(title)}
                    icon={<Forms.FormRow.Icon style={styles.sectionIcon} source={getIDByName(icon)} />}
                    inset
                    sectionBodyStyle={{ borderRadius: 24 }}
                    uppercaseTitle={false}
                    patches={patches}
                >
                    {Object.values(patches).filter(({ title, subtitle }) => {
                        return [title, subtitle]
                            .some(x => x.toLowerCase()
                            .includes(query.toLowerCase()))
                    }).map(({ key, title, subtitle, icon, render: Render }, index, array) => (<>
                        <TableSwitchRow 
                            label={title}
                            subLabel={subtitle}
                            icon={<TableRowIcon source={getIDByName(icon)} />}
                            value={get(`${key}.enabled`)}
                            onValueChange={(value) => {
                                settings.set(`${key}.enabled`, JSON.parse(value))
                                configureNext(create(300, "keyboard"))
                            }}
                            disabled={!get(`${key}.enabled`)}
                            start={index === 0}
                            end={index === array.length - 1}
                        />
                        
                        {Render && <View style={styles.renderable}>
                            <Render disabled={!get(`${key}.enabled`)} />
                        </View>}
                    </>))}
                </ToggleableSection>
            ))}
        </View>
        <View style={styles.space} />
    </ScrollView>
};
