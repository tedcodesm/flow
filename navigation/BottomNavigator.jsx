import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DiscoverScreen from "../screens/DiscoverScreen";
import ChatScreen from "../screens/ChatScreen";
import MapScreen from "../screens/MapScreen";

const Tab = createBottomTabNavigator();
const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "#14213D",
          borderTopLeftRadius: 80,
          borderTopRightRadius: 80,
          borderBottomLeftRadius: 80,
          borderBottomRightRadius: 80,
          position: "absolute",
          left: 10,
          right: 10,
          bottom: 7,
          height: 60,
          elevation: 5,
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
            <MaterialCommunityIcons
              name="home"
              size={25}
              color={focused ? "white" : "gray"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="disc"
        component={DiscoverScreen}
        options={{
          tabBarLabel: "Explore",
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="compass"
              size={25}
              color={focused ? "white" : "gray"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="chat"
        component={ChatScreen}
        options={{
          tabBarLabel: "Chat",
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="chat"
              size={25}
              color={focused ? "white" : "gray"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="map"
        component={MapScreen}
        options={{
          tabBarLabel: "Map",
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="home-map-marker"
              size={25}
              color={focused ? "white" : "gray"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
