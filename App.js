import React from 'react';
import { StatusBar } from 'react-native';
import Navigation from './components/Navigation';
import { NavigationContainer } from '@react-navigation/native';

const App = () => {
  return (
    <>
      <StatusBar backgroundColor="#f0f0f0" barStyle="dark-content" />
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </>
  );
};

export default App;