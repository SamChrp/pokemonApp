import React, { useState, useEffect } from 'react';
import TilePokemon from './TilePokemon';
import axios from 'axios';
import { FlatList, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Team = ({ navigation }) => {
    const styles = StyleSheet.create({
        container: {
            margin: 0,
            width: '100%',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
        },
    });

    const [team, setTeam] = useState([]);

    const getIds = async (key) => {
        try {
            const jsonValue = await AsyncStorage.getItem(key);
            return jsonValue ? JSON.parse(jsonValue) : [];
        } catch (error) {
            console.error('Erreur de récupération de données :', error);
            return [];
        }
    };

    const getTeam = async (ids) => {
        try {
            const requests = ids.map(id =>
                axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            );
            const responses = await Promise.all(requests);
            const pokemonDetails = responses.map(response => response.data);
            setTeam(pokemonDetails);
        } catch (error) {
            console.error('Erreur lors de la récupération des Pokémon:', error);
        }
    };

    const cleanUp = () => {
        setTeam([]);
    };

    useEffect(() => {
        getIds('team').then(ids => {
            getTeam(ids);
        });
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            getIds('team').then(ids => {
                getTeam(ids);
            });
            return cleanUp;
        }, [])
    );

    return (
        <FlatList style={styles.container} data={team} keyExtractor={(item) => item.id} numColumns={2} renderItem={({ item }) => (
                <TilePokemon key={item.id} id={item.id} goTo={navigation} scale={0.5} />
            )}
        />
    );
};
export default Team;
