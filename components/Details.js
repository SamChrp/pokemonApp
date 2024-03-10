import axios from 'axios';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Image, ScrollView, Text, StyleSheet, Pressable, Alert } from 'react-native';
import TilePokemon from './TilePokemon';
import Loader from './Loader';
import { colors } from '../utils/StylesSheet';

const styles = StyleSheet.create({
    box: {
        flex: 1,
        backgroundColor: '#f3f3f3',
        padding: 20,
    },
    boxImg: {
        width: '100%',
        marginBottom: 20,
    },
    borderImg: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: "70%",
        borderRadius: 200,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    img: {
        width: 200,
        height: 200,
        borderRadius: 100,
        margin: 20,
        alignSelf: 'center',
        backgroundColor: 'white',
        borderWidth: 5,
        borderColor: 'white',
        borderStyle: 'solid',
    },
    evolutionTile: {
        width: '30%',
        aspectRatio: 1,
        marginBottom: 10,
    },
    evolutionImg: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    button: {
        backgroundColor: '#f44336',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
        marginBottom: 20,
        alignSelf: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    statLabel: {
        flex: 1,
        fontSize: 16,
        marginRight: 10,
        color: '#555',
    },
    inofs: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    text: {
        fontSize: 16,
        marginBottom: 10,
        color: '#555',
    },
    stat: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    boxBarStat: {
        flex: 3,
        height: 10,
        backgroundColor: '#f2f2f2',
        borderRadius: 5,
        overflow: 'hidden',
    },
    statBar: {
        height: '100%',
        borderRadius: 5,
        backgroundColor: '#4CAF50',
    },
    statValue: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
        color: '#333',
    },
    evolutionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 20,
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
        fontStyle: 'bold',
    },
    line: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginVertical: 10,
    },
});

const Details = ({ route, navigation }) => {
    const [loader, setLoader] = useState(true);
    const [evolutionsIds, setEvolutionsIds] = useState([]);
    const scrollViewRef = React.useRef();
    const { id, pokemonType1, pokemonType2, height, weight, talent, hiddenTalent, stats } = route.params;
    const [pokemon, setPokemon] = useState({});
    
    const getDetails = async () => {
        setLoader(true);
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
            setPokemon(response.data);
            if (response.data.evolution_chain) {
                await getEvolutions(response.data.evolution_chain.url);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoader(false);
        }
    };

    const getEvolutions = async (url) => {
        setLoader(true);
        try {
            const response = await axios.get(url);
            const evolutionChain = response.data.chain;
            const speciesIds = [];

            speciesIds.push(getId(evolutionChain.species.url));

            for (const evolveTo of evolutionChain.evolves_to) {
                speciesIds.push(getId(evolveTo.species.url));

                for (const secondEvolveTo of evolveTo.evolves_to) {
                    speciesIds.push(getId(secondEvolveTo.species.url));
                }
            }

            setEvolutionsIds(speciesIds);
        } catch (error) {
            console.error(error);
        } finally {
            setLoader(false);
        }
    };
    
    const getId = (url) => {
        const urlParts = url.split("/");
        return urlParts[urlParts.length - 2];
    };

    const storeTeam = async (key, newValue) => {
        try {
            const existingValue = await AsyncStorage.getItem(key);
            let updatedValue = [];

            if (existingValue !== null) {
                updatedValue = JSON.parse(existingValue);

                if (updatedValue.length >= 6) {
                    Alert.alert(
                        'Équipe pleine !',
                        'Supprimez un Pokémon de votre équipe pour en ajouter un nouveau.',
                        [{ text: 'OK', onPress: () => console.log('OK Pressed') }
                        ]
                    );
                    return;
                }

                if (updatedValue.includes(newValue.toString())) { // Convertir newValue en chaîne de caractères
                    console.error('Erreur de stockage : La valeur existe déjà dans le tableau');
                    return;
                }

                updatedValue.push(newValue.toString()); // Convertir newValue en chaîne de caractères
            } else {
                updatedValue = [newValue.toString()]; // Convertir newValue en chaîne de caractères
            }

            await AsyncStorage.setItem(key, JSON.stringify(updatedValue));
        } catch (error) {
            console.error('Erreur de stockage :', error);
        }
    };


    const getTeam = async (key) => {
        try {
            const jsonValue = await AsyncStorage.getItem(key);

            if (jsonValue === null) {
                return [];
            }
            const team = JSON.parse(jsonValue);
            return team;
        } catch (error) {
            console.error('Erreur de récupération de données :', error);
            return [];
        }
    };

    const deleteFromTeam = async (key, valueToRemove) => {
        valueToRemove = valueToRemove.toString(); 
        try {
         
            const existingValue = await AsyncStorage.getItem(key);
            
            if (existingValue === null) {
                console.warn('Le tableau est vide. Aucune action n\'a été effectuée.');
                return;
            }
            
            let updatedValue = JSON.parse(existingValue);
            updatedValue = updatedValue.filter(item => item !== valueToRemove);
            await AsyncStorage.setItem(key, JSON.stringify(updatedValue));
        } catch (error) {
            console.error('Erreur de suppression de données :', error);
        }
    };

    useEffect(() => {
        const start = async () => {
            await getDetails();
            getTeam('team');
        };

        start();
    }, [id]);

    function formatText(text) {
        return text.replace(/\n/g, " ");
    }

    if (loader) {
        return <Loader />;
    }

    return (
        <ScrollView style={styles.box} ref={scrollViewRef}>
            <View  style={styles.boxImg}>
                <View  style={[colors[pokemonType1], styles.borderImg]}>
                    <Image
                        style={styles.img}
                        source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png` }}
                    />
                </View>
            </View>

            <View style={styles.inofs}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.title}>{pokemon.name}</Text>
                    <Text style={[styles.text, { marginRight: 20 }]}>#{pokemon.order}</Text>
                </View>
                <Text style={styles.text}>{pokemon.genera[7].genus}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={[styles.type, colors[pokemonType1]]}>{pokemonType1}</Text>
                    <Text style={[styles.type, colors[pokemonType2]]}>{pokemonType2}</Text>
                </View>
            </View>

            <Pressable
                onPress={() => {
                    storeTeam('team', id);
                }}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Ajouter à l'équipe</Text>
            </Pressable>
            <Pressable
                onPress={() => {
                    deleteFromTeam('team', id);
                }}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Retirer de l'équipe</Text>
            </Pressable>

            <View style={styles.line} />

            <Text style={styles.title}>Espèces</Text>
            <View style={styles.inofs}>
                <Text style={styles.text}>{formatText(pokemon.flavor_text_entries.find(entry => entry.language.name === "fr").flavor_text)}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.text}>Taille : {height / 10} m</Text>
                    <Text style={styles.text}>Poids : {weight / 10} kg</Text>
                </View>
            </View>

            <View style={styles.line} />

            <Text style={styles.title}>Statistiques</Text>
            <View style={styles.inofs}>
                {stats.map((stat, index) => (
                    <Stats key={index} item={stat} />
                ))}
            </View>

            <View style={styles.line} />

            <Text style={styles.title}>Évolutions du Pokémon</Text>
            <View style={styles.evolutionsContainer}>
                {evolutionsIds.map((id) => (
                    <TilePokemon key={id} id={id} goTo={navigation} />
                ))}
            </View>
        </ScrollView>
    );
};

const Stats = ({ item }) => (
    <View style={styles.stat}>
        <Text style={styles.statLabel}>{item.stat.name}</Text>
        <View style={styles.boxBarStat}>
            <View style={[styles.statBar, { width: `${item.base_stat}%` }]} />
        </View>
        <Text style={styles.statValue}>{item.base_stat}</Text>
    </View>
);

export default Details;
