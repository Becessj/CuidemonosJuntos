import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import InicioScreen from '../screens/InicioScreen';
import CardDetailScreen from '../screens/CardDetailScreen';
import GeneralArticlesScreen from '../screens/GeneralArticlesScreen';
import ChecklistScreen from '../screens/ChecklistScreen';


const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // Opcional: ocultar la cabecera del stack
      }}
    >
      <Stack.Screen name="InicioStack" component={InicioScreen} />
      <Stack.Screen name="CardDetail" component={CardDetailScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
