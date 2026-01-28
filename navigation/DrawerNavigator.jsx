import { createDrawerNavigator, DrawerItemList } from "@react-navigation/drawer";
import React from "react";
import { View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import BottomNavigator from "./BottomNavigator";
import ChatScreen from "../screens/ChatScreen";
import MapScreen from "../screens/MapScreen";
import DiscoverScreen from "../screens/DiscoverScreen";
import RentPaymentScreen from "../screens/RentPaymentScreen";
import PaymentHistoryScreen from "../screens/PaymentHistoryScreen";
import TenantProfileSreen from "../screens/TenantProfileSreen";
import PropertyScreen from "../screens/PropertyScreen";
import IncomeReportScreen from "../screens/IncomeReportScreen";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <SafeAreaView style={{ flex: 1 }}>
          <View className="w-full justify-center rounded-br-3xl bg-blue-400 items-center h-32 mb-5">
            <Image
              className="h-32 w-full object-cover rounded-b-xl"
              source={require("../assets/dark.jpg")}
            />
          </View>
          <DrawerItemList {...props} />
        </SafeAreaView>
      )}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: "#3b82f6",
        drawerActiveTintColor: "#fff",
        drawerInactiveTintColor: "#14213D",
        drawerLabelStyle: { marginLeft: 10, fontSize: 14 },
      }}
    >
      <Drawer.Screen
        name="bottom"
        component={BottomNavigator}
        options={{
          drawerLabel: "Home",
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
        }}
      />
        <Drawer.Screen
        name="map"
        component={MapScreen}
        options={{
          drawerLabel: "Map",
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="map" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="rent"
        component={RentPaymentScreen}
        options={{
          drawerLabel: "Payments",
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cash" size={size} color={color} />
          ),
        }}
      />
    
      <Drawer.Screen
        name="hist"
        component={PaymentHistoryScreen}
        options={{
          drawerLabel: "Payment history",
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="history" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="ten"
        component={TenantProfileSreen}
        options={{
          drawerLabel: "Tenant profile",
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="prop"
        component={PropertyScreen}
        options={{
          drawerLabel: "Properties ",
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="inc"
        component={IncomeReportScreen}
        options={{
          drawerLabel: "Income Report ",
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="statistics" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
