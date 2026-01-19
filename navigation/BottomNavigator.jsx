import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen'
import { MaterialCommunityIcons } from "@expo/vector-icons";


const Tab = createBottomTabNavigator()
const BottomNavigator = () => {
  return ( 
    <Tab.Navigator
    screenOptions={{
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "black",
        tabBarStyle: { backgroundColor: "#e5e7eb" },
        headerShown: false,
      }}
    >
        <Tab.Screen
        name="bottom"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons name="home" size={25} color={focused ? "blue" : "black"} />
          ),
        }}
      />
       
       
      
       

    </Tab.Navigator>
  )
}

export default BottomNavigator