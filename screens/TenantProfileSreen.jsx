import React, { useContext } from "react";
import { Text, View, Image, TouchableOpacity,Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";

const TenantProfileScreen = () => {
  const navigation = useNavigation();

  const {name,phone ,email,logout} = useContext(AuthContext);

  const handleLogout = () => {
  Alert.alert(
    "Logout",
    "Are you sure you want to logout?",
    [
      { text: "Cancel" },
      { text: "Logout", onPress: () => {
          logout();
          navigation.replace("login");
        } 
      }
    ]
  );
};

  return (
    <SafeAreaView className="flex-1">
      <View className="px-4 py-4 flex-1 flex-col gap-4 bg-gray-200">
        <View className="flex flex-row items-center gap-4">
          <Image
            className="w-12 h-12 rounded-full"
            source={require("../assets/Luffy_.jpg")}
          />
          <View>
            <Text className="text-xl font-bold">{name}</Text>
            <Text className="text-lg">GreenView Villas - unit B3</Text>
          </View>
        </View>

        <View className="bg-white py-4 px-2 rounded-xl gap-3">
          <Text className="font-bold text-xl">Tenant Info</Text>
          <View className="h-[1px] bg-gray-300" />

          <Text className="text-xl">
            <MaterialCommunityIcons name="phone" size={20} /> {phone}
          </Text>

          <Text className="text-xl font-bold">Email: {email}</Text>

          
        </View>

        <View className="bg-white rounded-xl py-4 px-2">
          <Text className="font-bold text-xl">Rent Status</Text>
          <View className="bg-yellow-100 py-4 px-2 rounded-xl">
            <Text className="font-bold text-xl text-yellow-800">Pending</Text>
            <Text className="text-lg">Ksh 10,000 Due By: 30th April</Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("hist")}
          className="py-2 px-4 bg-white border border-gray-300 rounded-xl"
        >
          <Text className="text-2xl font-bold text-center">Payment History</Text>
        </TouchableOpacity>
         <TouchableOpacity className="py-4 px-4 gap-2 items-center w-full justify-center bg-[#14213D] rounded-xl flex-row">
                  <MaterialCommunityIcons name="toolbox" size={34} color="white" />
                  <Text className="font-bold text-xl tracking-wide text-white">Maintenance Request</Text>
                </TouchableOpacity>
        <TouchableOpacity
          onPress={handleLogout}
          className="py-2 px-4 bg-red-500 border border-red-500 rounded-xl"
        >
          <Text className="text-2xl font-bold text-center text-white">Logout</Text>
        </TouchableOpacity>
        
               
      </View>
    </SafeAreaView>
  );
};

export default TenantProfileScreen;
