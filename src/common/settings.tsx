import { get, setAll } from './store';
import { sections } from '../patches';
import {
    GenericHeaderTitle, 
    GenericSubHeaderTitle,
    React,
    ScrollView,
    View,
    Image,
    configureNext, 
    create,
    getIDByName,
    metro,
    useSettingsStore,
    utilities,
    Forms
} from './exports';
import { buttons, useStyles, ToggleableSection } from './constants';
import manifest from '../../dist/manifest.json';

const {
    Components: {
        Redesign: {
            TableSwitchRow,
            TableRowIcon,
            Button
        }
    }
} = metro;

const { Search } = metro.Custom;

export default () => {
    const settings = useSettingsStore(manifest.name);
    const [search, setSearch] = React.useState('');
    const styles = useStyles();

    return <ScrollView>
        <View style={styles.titles}>
            <GenericHeaderTitle title={'Customize your ideal experience.'} />
            <GenericSubHeaderTitle subtitle={manifest.description} />
        </View>
        <View style={styles.navigation}>
            <View style={[styles.shadow, { marginTop: 16 }]}>
                <Search 
                    placeholder={'Search...'}
                    value={search}
                    onChange={(e: any) => setSearch(e)}
                    onClear={() => setSearch('')}
                    isClearable
                    leadingIcon={() => {
                        return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Image
                                source={getIDByName('Search')}
                                style={styles.icon}
                            />
                        </View>;
                    }}
                />
            </View>
            <View style={styles.shadow}>
                <View style={{ flexDirection: 'row' }}>
                    {buttons.map(({ title, value }, _, { length }) => {
                        return <Button
                            text={title}
                            variant={'primary'}
                            size={'md'}
                            onPress={() => {
                                setAll(settings, sections, value);
                                configureNext(create(300, 'keyboard'))
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
                            .some(x => x.toLowerCase().includes(search.toLowerCase()))
                    }).map(({ key, title, subtitle, icon, render: Render }, index, array) => (<>
                        <View style={get(`${key}.enabled`) ? {} : { opacity: 0.5 }}>
                            <TableSwitchRow 
                                label={title}
                                subLabel={subtitle}
                                icon={<TableRowIcon source={getIDByName(icon)} />}
                                value={get(`${key}.enabled`)}
                                onValueChange={(value) => {
                                    settings.set(`${key}.enabled`, JSON.parse(value))
                                    configureNext(create(300, 'keyboard'))
                                }}
                                start={index === 0}
                                end={index === array.length - 1}
                            />
                        </View>

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
