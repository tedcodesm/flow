import React, { useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const LandlordProfileScreen = ({ navigation }) => {
  const { user, name, phone, role, email, setAuthenticated, setUser } =
    useContext(AuthContext);

  const handleLogout = async () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel" },
        {
          text: "Logout",
          onPress: async () => {
            await AsyncStorage.removeItem("token");
            await AsyncStorage.removeItem("user");

            setAuthenticated(false);
            setUser(null);

            navigation.replace("login");
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">

      {/* HEADER */}
      <View className="items-center mt-6">

        {/* PROFILE IMAGE */}
        <View className="w-28 h-28 rounded-full bg-[#14213D] items-center justify-center">
          <MaterialCommunityIcons
            name="account"
            size={60}
            color="white"
          />
        </View>

        {/* NAME */}
        <Text className="text-2xl font-bold mt-4">
          {name || "No Name"}
        </Text>

        {/* ROLE */}
        <Text className="text-gray-500 text-base capitalize">
          {role}
        </Text>

      </View>

      {/* INFO SECTION */}
      <View className="bg-white mx-4 mt-6 rounded-xl p-4">

        {/* USERNAME */}
        <View className="flex-row items-center mb-4">
          <MaterialCommunityIcons
            name="account-outline"
            size={24}
            color="#14213D"
          />
          <View className="ml-3">
            <Text className="text-gray-500">Username</Text>
            <Text className="text-lg font-semibold">
              {user?.username}
            </Text>
          </View>
        </View>

        {/* PHONE */}
        <View className="flex-row items-center mb-4">
          <MaterialCommunityIcons
            name="phone-outline"
            size={24}
            color="#14213D"
          />
          <View className="ml-3">
            <Text className="text-gray-500">Phone</Text>
            <Text className="text-lg font-semibold">
              {phone || "Not provided"}
            </Text>
          </View>
        </View>

        {/* USER ID */}
        <View className="flex-row items-center">
          <MaterialCommunityIcons
            name="email-outline"
            size={24}
            color="#14213D"
          />
          <View className="ml-3">
            <Text className="text-gray-500">Email address</Text>
            <Text className="text-sm font-semibold">
              {email || "Not provided"}
            </Text>
          </View>
        </View>

      </View>

      {/* LOGOUT BUTTON */}
      <View className="absolute bottom-6 left-4 right-4">
        <TouchableOpacity
          onPress={handleLogout}
          className="bg-red-500 py-4 rounded-xl"
        >
          <Text className="text-white text-center text-lg font-bold">
            Logout
          </Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};

export default LandlordProfileScreen;
