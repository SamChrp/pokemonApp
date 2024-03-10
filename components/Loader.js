import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

const Loader = () => {
    const styles = StyleSheet.create({
        box: {
            flex: 1,
            justifyContent: "center",
            marginTop: 150,
        },
        alignement: {
            flexDirection: "row",
            justifyContent: "space-around",
            padding: 10
        }
    });
    return (
        <View style={[styles.box, styles.alignement]}>
            <ActivityIndicator size="large" color="#f44336" />
        </View>
    );
};

export default Loader;