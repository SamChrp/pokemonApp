import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Pressable, Keyboard, ActivityIndicator } from 'react-native';
import axios from 'axios';
import TilePokemon from './TilePokemon';

const Search = ({ navigation }) => {
    const [search, setSearch] = useState('');
    const [resultId, setResultId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const searchPokemon = async () => {
        setResultId(null);
        setIsLoading(true);
        setIsError(false);
        Keyboard.dismiss();
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`);
            setResultId(response.data.id);
        } catch (error) {
            console.error(error);
            setResultId(null);
            setIsError(true);
        } finally {
            setSearch('');
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            setResultId(null);
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Entrez le nom du Pokémon..."
                value={search}
                onChangeText={(text) => setSearch(text)}
            />
            <Pressable onPress={searchPokemon} style={styles.button}>
                <Text style={styles.buttonText}>RECHERCHER</Text>
            </Pressable>
            {resultId ? <TilePokemon id={resultId} goTo={navigation} scale={0.8} /> : null}
            {!isLoading && !resultId && isError && (
                <View style={styles.errorContainer}>
                    <Text style={styles.error}>Le Pokémon que vous avez recherché n'existe pas.</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#888',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    button: {
        width: '100%',
        height: 40,
        backgroundColor: '#f44336',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    errorContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    error: {
        color: 'red',
    },
});

export default Search;
