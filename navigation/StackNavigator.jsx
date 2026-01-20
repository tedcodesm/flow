import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../screens/SplashScreen';
import BottomNavigator from './BottomNavigator';
import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import DiscoverScreen from '../screens/DiscoverScreen';
import ChatScreen from '../screens/ChatScreen';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="bottom" component={BottomNavigator} />
        <Stack.Screen name="chat" component={ChatScreen} />
        <Stack.Screen name="disc" component={DiscoverScreen} />
        <Stack.Screen name="map" component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
