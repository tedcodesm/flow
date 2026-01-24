import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const RentPaymentScreen = () => {
  const navigation = useNavigation(); // ✅ works here

  return (
    <SafeAreaView className="flex-1 bg-gray-200">
      <View className="flex-1 w-full flex-col px-4 gap-4 py-4">
        <Text className="items-start font-bold text-xl text-black">Hi, User!</Text>

        <View className="w-full flex-col gap-4 items-center justify-center h-32 rounded-xl bg-[#14213D]">
          <Text className="text-xl font-semibold tracking-wider text-white">
            Amount Due: <Text className="font-bold text-2xl">KSH 15,000</Text>
          </Text>
          <Text className="font-semibold text-xl text-white">Due By : 30th April</Text>
        </View>

        <TouchableOpacity className="py-2 px-4 bg-green-400 rounded-xl">
          <Text className="text-white text-2xl font-bold text-center">Pay Now</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("hist")}
          className="py-2 px-4 border bg-white border-gray-300 rounded-xl"
        >
          <Text className="text-2xl font-bold text-center">Payment History</Text>
        </TouchableOpacity>

        <View className="rounded-xl gap-4 bg-white flex-col px-4 py-4">
          <Text className="font-bold text-xl tracking-wide">Outstanding Balance</Text>

          <View className="h-[2px] bg-black" />

          <View className="items-center justify-between flex-row w-full">
            <Text className="font-bold text-xl tracking-wide">Arrears:</Text>
            <Text className="font-bold text-xl tracking-wide">Ksh 5,000</Text>
          </View>

          <View className="h-[2px] bg-black" />

          <View className="items-center justify-between flex-row w-full">
            <Text className="font-bold text-xl tracking-wide">Late Fee:</Text>
            <Text className="font-bold text-xl tracking-wide">Ksh 500</Text>
          </View>
        </View>

        <TouchableOpacity className="py-4 px-4 gap-2 items-center w-full justify-center bg-[#14213D] rounded-xl flex-row">
          <MaterialCommunityIcons name="toolbox" size={34} color="white" />
          <Text className="font-bold text-xl tracking-wide text-white">Maintenance Request</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RentPaymentScreen;
