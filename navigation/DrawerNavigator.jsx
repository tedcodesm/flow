import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import React, { Component } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeScreen from "../screens/HomeScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BottomNavigator from "./BottomNavigator";
import ChatScreen from "../screens/ChatScreen";

const Drawer = createDrawerNavigator();

export class DrawerNavigator extends Component {
  render() {
    return (
      <Drawer.Navigator
        drawerContent={(props) => {
          return (
            <SafeAreaView>
              <View className="w-full justify-center rounded-br-3xl bg-blue-400 items-center gap-4 h-40 mb-5"></View>
              <DrawerItemList {...props} />
            </SafeAreaView>
          );
        }}
        screenOptions={{
          headerShown: false,
          drawerActiveBackgroundColor: "blue",
          drawerActiveTintColor: "red",
          drawerInactiveTintColor: "yellow",
          drawerLabelStyle: { marginLeft: -20, fontSize: 12 },
        }}
      >
        <Drawer.Screen
          name="chat"
          component={ChatScreen}
          options={{
            drawerLabel: "Home",
            drawerIcon: ({ color }) => (
              <MaterialCommunityIcons
                className="mr-4"
                name="home"
                size={25}
                color="orange"
              />
            ),
          }}
        />
      </Drawer.Navigator>
    );
  }
}

export default DrawerNavigator;
