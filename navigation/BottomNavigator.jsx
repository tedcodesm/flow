import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen'
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DiscoverScreen from '../screens/DiscoverScreen';
import ChatScreen from '../screens/ChatScreen';
import MapScreen from '../screens/MapScreen';


const Tab = createBottomTabNavigator()
const BottomNavigator = () => {
  return ( 
    <Tab.Navigator
     screenOptions={{
    tabBarActiveTintColor: "white",
    tabBarInactiveTintColor: "gray",
    tabBarStyle: {
      backgroundColor: "#14213D",
      borderTopLeftRadius: 80,   // rounded top corners
      borderTopRightRadius: 80,  // rounded top corners
      borderBottomLeftRadius: 80,  // rounded top corners
      borderBottomRightRadius: 80,  // rounded top corners
      position: "absolute",      // make it float
      left: 10,
      right: 10,
      bottom: 5,
      height: 60,                // adjust height if needed
      elevation: 5,              // shadow for Android
    },
    headerShown: false,
      }}
    >
        <Tab.Screen
        name="bottom"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons name="home" size={25} color={focused ? "white" : "gray"} />
          ),
        }}
      />
        <Tab.Screen
        name="disc"
        component={DiscoverScreen}
        options={{
          tabBarLabel: "Discover",
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons name="compass" size={25} color={focused ? "white" : "gray"} />
          ),
        }}
      />
        <Tab.Screen
        name="chat"
        component={ChatScreen}
        options={{
          tabBarLabel: "Chat",
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons name="chat" size={25} color={focused ? "white" : "gray"} />
          ),
        }}
      />
        <Tab.Screen
        name="map"
        component={MapScreen}
        options={{
          tabBarLabel: "Map",
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons name="map" size={25} color={focused ? "white" : "gray"} />
          ),
        }}
      />
       
       
      
       

    </Tab.Navigator>
  )
}

export default BottomNavigator