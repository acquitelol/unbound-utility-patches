import { Forms, React, TouchableOpacity, View, configureNext, create, getIDByName, metro, useSettingsStore, utilities } from './exports';
import { get } from './store';
import manifest from '../../dist/manifest.json';

const {
    common: {
        StyleSheet,
        Theme
    }
} = metro;

export const useStyles = StyleSheet.createStyles({
    navigation: {
        paddingHorizontal: 16,
        paddingBottom: 16,
        marginBottom: -20,
        backgroundColor: Theme.unsafe_rawColors.PRIMARY_800
    },

    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 1,
            height: 4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 4.65,
        elevation: 8
    },

    titles: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 24,
        marginBottom: 16
    },

    section: {
        marginHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 1,
            height: 4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 4.65,
        elevation: 8
    },

    sectionIcon: {
        width: 16,
        height: 16,
        marginHorizontal: 4
    },

    renderable: {
        backgroundColor: Theme.colors.CARD_PRIMARY_BG ?? Theme.colors.BACKGROUND_PRIMARY
    },

    space: {
        marginBottom: 50
    },

    search: {
		margin: 0,
		marginTop: 5,
		padding: 10,
		borderBottomWidth: 0,
		background: 'none',
		backgroundColor: 'none',
	},

	icon: {
		tintColor: Theme.colors.INTERACTIVE_NORMAL,
		width: 16,
		height: 16
	}
});

export const buttons = [
    { 
        title: 'Disable',
        value: false
    },
    {
        title: 'Enable',
        value: true
    }
]

export const ToggleableSection = ({ title, icon, patches, children, style, ...rest }: any) => {
    const [hidden, setHidden] = React.useState(get(`${title}.hidden`, false));
    const disabled = Object.keys(patches).every(key => !get(`${key}.enabled`));
    const settings = useSettingsStore(manifest.name);
    const styles = useStyles();

    return <Forms.FormSection
        title={title}
        style={utilities.mergeStyles(style, { opacity: disabled ? 0.5 : 1 })}
        icon={<View style={{ flexDirection: 'row' }}>
            {icon}
            <TouchableOpacity
                onPress={() => {
                    Object.keys(patches).forEach(key => settings.set(`${key}.enabled`, disabled));
                    configureNext(create(300, 'keyboard'));
                }}
            >
                <Forms.FormRow.Icon 
                    source={getIDByName(disabled ? 'Small' : 'Check')} 
                    style={styles.sectionIcon}
                />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    setHidden((previous: boolean) => !previous);
                    configureNext({ 
                        duration: 300,
                        create: { type: 'keyboard', property: 'opacity' },
                        update: { type: 'easeInEaseOut' },
                        delete: { type: 'easeInEaseOut', property: 'opacity' }
                    });
                }}
            >
                <Forms.FormRow.Icon 
                    source={getIDByName(`ic_arrow${hidden ? '' : '_down'}`)} 
                    style={styles.sectionIcon}
                />
            </TouchableOpacity>
        </View>}
        {...rest}
    >
        {!hidden && children}
    </Forms.FormSection>
}

export const getRandomColor = () => `#${Math.random().toString(16).slice(2, 8).toUpperCase()}`
export const getRandomString = (strings: string[]) => strings[Math.round(Math.random() * strings.length)]