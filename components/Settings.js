import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    setting: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    settingLabel: {
        fontSize: 18,
    },
    lang: {
        fontSize: 18,
        color: 'black',
    },
    line: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginVertical: 10,
    },
});

const Settings = () => {
    const [vibrationActivated, setVibrationActivated] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('en');
    const [notificationsActivated, setNotificationsActivated] = useState(false);
    const [darkModeActivated, setDarkModeActivated] = useState(false);

    const toggleNotifications = () => {
        setNotificationsActivated(previousState => !previousState);
    };

    const toggleDarkMode = () => {
        setDarkModeActivated(previousState => !previousState);
    };

    const toggleVibration = () => {
        setVibrationActivated(previousState => !previousState);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Paramètres de l'application</Text>

            <View style={styles.setting}>
                <Text style={styles.settingLabel}>Mode Sombre</Text>
                <Switch
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleDarkMode}
                    trackColor={{ false: "#767577", true: "#f44336" }}
                    thumbColor={darkModeActivated ? "#f44336" : "#f4f3f4"}
                    value={darkModeActivated}
                />
            </View>

            <View style={styles.line} />

            <View style={styles.setting}>
                <Text style={styles.settingLabel}>Notifications Push</Text>
                <Switch
                    onValueChange={toggleNotifications}
                    value={notificationsActivated}
                    trackColor={{ false: "#767577", true: "#f44336" }}
                    thumbColor={notificationsActivated ? "#f44336" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                />
            </View>

            <View style={styles.line} />

            <View style={styles.setting}>
                <Text style={styles.settingLabel}>Vibration au clique</Text>
                <Switch
                    ios_backgroundColor="#3e3e3e"
                    value={vibrationActivated}
                    trackColor={{ false: "#767577", true: "#f44336" }}
                    thumbColor={vibrationActivated ? "#f44336" : "#f4f3f4"}
                    onValueChange={toggleVibration}
                />
            </View>

            <View style={styles.line} />

            <View style={styles.setting}>
                <Text style={styles.settingLabel}>Langue</Text>
                <Picker selectedValue={selectedLanguage} style={{ height: 50, width: 150 }}
                        onValueChange={(itemValue, itemIndex) =>
                        setSelectedLanguage(itemValue)
                    }
                >
                    <Picker.Item style={styles.lang} label="Anglais" value="en" />
                    <Picker.Item style={styles.lang} label="Allemand" value="de" />
                    <Picker.Item style={styles.lang} label="Français" value="fr" />
                    <Picker.Item style={styles.lang} label="Espagnol" value="es" />
                </Picker>
            </View>
        </View>
    );
};

export default Settings;
