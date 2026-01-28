import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../screens/SplashScreen';
import BottomNavigator from './BottomNavigator';
import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import DiscoverScreen from '../screens/DiscoverScreen';
import ChatScreen from '../screens/ChatScreen';
import DrawerNavigator from './DrawerNavigator';
import RentPaymentScreen from '../screens/RentPaymentScreen';
import PaymentHistoryScreen from '../screens/PaymentHistoryScreen';
import TenantProfileSreen from '../screens/TenantProfileSreen';
import PropertyScreen from '../screens/PropertyScreen';
import IncomeReportScreen from '../screens/IncomeReportScreen';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="drawer" component={DrawerNavigator} />
        <Stack.Screen name="bottom" component={BottomNavigator} />
        <Stack.Screen name="chat" component={ChatScreen} />
        <Stack.Screen name="rent" component={RentPaymentScreen} />
        <Stack.Screen name="hist" component={PaymentHistoryScreen} />
        <Stack.Screen name="disc" component={DiscoverScreen} />
        <Stack.Screen name="map" component={MapScreen} />
        <Stack.Screen name="ten" component={TenantProfileSreen} />
        <Stack.Screen name="prop" component={PropertyScreen} />
        <Stack.Screen name="inc" component={IncomeReportScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
