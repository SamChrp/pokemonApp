import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, FlatList, Text, StyleSheet, Button } from 'react-native';

import TilePokemon from './TilePokemon';

const Home = ({ navigation }) => {

    const [data, setData] = useState([]);
    const [nextPage, setNextPage] = useState('');
    const [pokemonList, setPokemonList] = useState([]);


    const getLists = async (url) => {
        try {
            // debugger;
            const response = await axios.get(url ? url : 'https://pokeapi.co/api/v2/pokemon');
            setData(response.data);
            setPokemonList(response.data.results);
            setNextPage(response.data.next);
        } catch (error) {
            console.error(error);
        }
    }
    const getNextLists = async () => {
        const response = await axios.get(nextPage);
        setData(response.data);
        setPokemonList([...pokemonList, ...response.data.results]);
        setNextPage(response.data.next);
    };

    useEffect(() => {
        getLists();
    }, []);

    return (
        <View>
            <FlatList
                onEndReached={getNextLists}
                data={pokemonList}
                numColumns={1}
                renderItem={({ index }) => <TilePokemon id={index + 1} goTo={navigation} />}
            />
        </View>
    );
};

export default Home;
