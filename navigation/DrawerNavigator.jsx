import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import React, { useContext } from "react";
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
import CreatePropertyScreen from "../screens/CreatePropertyScreen";
import { BASE_URL } from "../config/Ip";
import { AuthContext } from "../context/AuthContext.jsx";
import LandlordProfileScreen from "../screens/LandlordProfileScreen.jsx";
import LandlordBookingsScreen from "../screens/LandlordBookingScreen.jsx";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const { role } = useContext(AuthContext);

  // handle get user by id
  const getUser = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/:id`); // replace with actual user ID
      console.log("User data:", res.data);
    } catch (error) {
      console.error("Error fetching user:", error.message);
    }
  };

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
      {role === "landlord" && (
        <>
          <Drawer.Screen
            name="createproperty"
            component={CreatePropertyScreen}
            options={{
              drawerLabel: "Create Property",
              drawerIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="plus-circle-outline"
                  size={size}
                  color={color}
                />
              ),
            }}
          />

          <Drawer.Screen
            name="prop"
            component={PropertyScreen}
            options={{
              drawerLabel: "My Properties",
              drawerIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="home" size={size} color={color} />
              ),
            }}
          />

          <Drawer.Screen
            name="inc"
            component={IncomeReportScreen}
            options={{
              drawerLabel: "Income Report",
              drawerIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="chart-line"
                  size={size}
                  color={color}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="landi"
            component={LandlordProfileScreen}
            options={{
              drawerLabel: "Landlord Profile",
              drawerIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="account"
                  size={size}
                  color={color}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="bookings"
            component={LandlordBookingsScreen}
            options={{
              drawerLabel: "Landlord Bookings",
              drawerIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="calendar-check"
                  size={size}
                  color={color}
                />
              ),
            }}
          />
        </>
      )}

      {role === "tenant" && (
        <>
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
                <MaterialCommunityIcons
                  name="history"
                  size={size}
                  color={color}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="ten"
            component={TenantProfileSreen}
            options={{
              drawerLabel: "Tenant profile",
              drawerIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="account"
                  size={size}
                  color={color}
                />
              ),
            }}
          />
        </>
      )}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
