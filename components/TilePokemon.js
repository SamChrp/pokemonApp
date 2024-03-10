import axios from 'axios';
import {StyleSheet, View, Image, TouchableWithoutFeedback, Text} from 'react-native';
import React, { useState, useEffect } from 'react';

const TilePokemon = ({id, goTo, scale}) => {

    const styles = StyleSheet.create({
        grass: {
            backgroundColor: '#4bff02',
        },
        fire: {
            backgroundColor: '#ff8700',
        },
        water: {
            backgroundColor: '#73b9fc',
        },
        ice: {
            backgroundColor: '#c4efe3',
        },
        bug: {
            backgroundColor: '#e7c800',
        },
        dragon: {
            backgroundColor: '#6e00e3',
        },
        dark: {
            backgroundColor: '#605148',
        },
        steel: {
            backgroundColor: '#777777',
        },
        flying: {
            backgroundColor: '#6a5485',
        },
        electric: {
            backgroundColor: '#ffd500',
        },
        ground: {
            backgroundColor: '#ccb369',
        },
        ghost: {
            backgroundColor: '#584279',
        },
        fairy: {
            backgroundColor: '#f897a6',
        },
        fighting: {
            backgroundColor: '#ff463c',
        },
        psychic: {
            backgroundColor: '#de3365',
        },
        rock: {
            backgroundColor: '#a9773e',
        },
        normal: {
            backgroundColor: '#fff0b4',
        },
        poison: {
            backgroundColor: '#e12de1',
        },
        img: {
            width: 150,
            height: 150,
            resizeMode: 'contain',
        },
        numberBox: {
            marginTop: 20,
            width: '100%',
        },
        number: {
            fontSize: 12,
            color: 'grey',
            textAlign: 'right',
        },
        tile: {
            backgroundColor: '#fafafa',
            borderRadius: 10,
            margin: 10,
            padding: 10,
            width: '100%',
            height: 'max-content',
            display: 'flex',
            flexDirection: 'row',
        },
        infos: {
            width: '55%',
        },
        name: {
            fontSize: 20,
            color: '#252525',
            textTransform: 'capitalize',
            marginBottom: 5,
        },
        typesContainer: {
            flexDirection: 'row',
            marginTop: 10,
        },
        type: {
            fontSize: 14,
            color: '#fff',
            padding: 5,
            textTransform: 'capitalize',
            textAlign: 'center',
            marginRight: 5,
            marginTop: 5,
            marginBottom: 5,
            width: '100%',
            fontStyle: 'bold',
        },
    });

    const [pokemon, setPokemon] = useState([]);
    const [pokemonType1, setPokemonType1] = useState(null);
    const [pokemonType2, setPokemonType2] = useState(null);

    const getPokemon = async () => {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
            setPokemon(response.data);
            setPokemonType1(response.data.types[0].type.name);
            if (response.data.types[1]) {
                setPokemonType2(response.data.types[1].type.name);
            }
        } catch (error) {
            console.error(error);
        }
    }


    const handleTileClick = () => {
        goTo.navigate('Fiche détails',
            {
                id: id,
                pokemonType1: pokemonType1,
                pokemonType2: pokemonType2 ? pokemonType2 : null,
                height: pokemon.height,
                weight: pokemon.weight,
                talent: pokemon.abilities[0].ability.name,
                hiddenTalent: pokemon.abilities[1] ? pokemon.abilities[1].ability.name : null,
                stats: pokemon.stats,
            })
    };

    useEffect(() => {
        getPokemon();

        return () => {
            setPokemon([]);
            setPokemonType1(null);
            setPokemonType2(null);
        }
    }, [id]);

    return (
        <TouchableWithoutFeedback onPress={handleTileClick}>
            <View style={styles.tile}>
                <Image
                    style={styles.img}
                    source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png` }}
                />
                <View style={styles.infos}>
                    <Text style={styles.name}>{pokemon.name}</Text>
                    <View style={styles.types}>
                        <Text style={[styles.type, styles[pokemonType1]]}>{pokemonType1}</Text>
                        {pokemonType2 && <Text style={[styles.type, styles[pokemonType2]]}>{pokemonType2}</Text>}
                    </View>
                    <View style={styles.numberBox}>
                        <Text style={styles.number}>{id}</Text>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default TilePokemon;
