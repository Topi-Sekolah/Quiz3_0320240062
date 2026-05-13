import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen  from './src/screens/HomeScreen';
import ApartScreen from './src/screens/ApartScreen';
import HouseScreen from './src/screens/HouseScreen';
import DetailScreen from './src/screens/DetailScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home"   component={HomeScreen}  />
        <Stack.Screen name="Apart"  component={ApartScreen} />
        <Stack.Screen name="House"  component={HouseScreen} />
        <Stack.Screen name="Detail" component={DetailScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
