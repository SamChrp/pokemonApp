import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';


import Home from './Home';
import Search from './Search';
import Team from './Team';
import Settings from './Settings';
import Details from './Details';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();



function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Parcourir le Pokédex" component={Home} />
            <Stack.Screen name="Fiche détails" component={Details} />
        </Stack.Navigator>
    );
}
function TeamStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Mon équipe" component={Team} />
            <Stack.Screen name="Détail" component={Details} />
        </Stack.Navigator>
    );
}




function Tabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Accueil"
                component={HomeStack}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="md-home" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Recherche"
                component={Search}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="md-search" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Mon Équipe"
                component={TeamStack}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="md-people" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Paramètres"
                component={Settings}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="md-settings" size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}


export default Tabs;