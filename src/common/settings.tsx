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
    findByProps,
    findByName,
    components: {
        Forms
    }
} = metro;

const SettingSearchBar = findByName("SettingSearchBar");
const { default: Button, ButtonColors, ButtonSizes } = findByProps("ButtonColors", "ButtonLooks", "ButtonSizes", { lazy: true });

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
                            color={ButtonColors.BRAND}
                            text={title}
                            size={ButtonSizes.MEDIUM}
                            onPress={() => {
                                setAll(settings, sections, value);
                                configureNext(create(300, "keyboard"))
                            }}
                            style={{ 
                                marginTop: 16,
                                borderRadius: 12,
                                marginHorizontal: 4,
                                flex: 1/length
                            }}
                        />
                    })}
                </View>
            </View>
        </View>
        <View style={styles.section}>
            {Object.entries(sections).map(([title, { icon, patches }]) => {
                return <ToggleableSection
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
                    }).map(({ key, title, subtitle, icon, render: Render }, index, array) => {
                        return <>
                            <Forms.FormRow 
                                key={key}
                                label={title}
                                subLabel={subtitle}
                                leading={<View style={styles.circle}>
                                    <Forms.FormRow.Icon 
                                        style={{
                                            width: get(`${key}.enabled`) ? 20 : 16,
                                            height: get(`${key}.enabled`) ? 20 : 16,
                                        }}
                                        source={getIDByName(icon)} 
                                    />
                                </View>}
                                trailing={() => <Forms.FormSwitch
                                    value={get(`${key}.enabled`)}
                                    onValueChange={(value) => {
                                        settings.set(`${key}.enabled`, JSON.parse(value))
                                        configureNext(create(100, "keyboard"))
                                    }}
                                />}
                                disabled={!get(`${key}.enabled`)}
                            />
                            {Render ? <Render disabled={!get(`${key}.enabled`)} /> : <></>}
                            {index < (array.length - 1) && <Forms.FormDivider />}
                        </>
                    })}
                </ToggleableSection>
            })}
        </View>
        <View style={styles.space} />
    </ScrollView>
};
