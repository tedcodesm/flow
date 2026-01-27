import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export class TenantProfileSreen extends Component {
  render() {
    return (
      <SafeAreaView className="flex-1 ">
        <View className="px-4 py-4 flex-1 flex-col gap-4 bg-gray-200">
          <View className="flex flex-row items-center gap-4">
            <Image
              className="w-12 h-12 rounded-full"
              source={require("../assets/apartment.jpg")}
            />
            <View className="flex flex-col">
              <Text className="text-xl font-bold tracking-wide">
                Edward Njoroge
              </Text>
              <Text className="text-lg  tracking-wide">
                GreenView Villas - unit B3{" "}
              </Text>
            </View>
          </View>
          <View className="flex-col gap-4 bg-white py-4 px-2 rounded-xl">
            <Text className="font-bold text-xl ">Tenant Info</Text>
            <View className="h-[1px] bg-gray-500" />

            <Text className="flex flex-row font-bold text-xl items-center gap-2">
              <Text className="">
                {" "}
                <MaterialCommunityIcons name="phone" size={20} color="black" />
              </Text>
              +254 789 098 988
            </Text>
            <Text className="flex flex-row font-bold text-xl items-center gap-2">
              <Text className="font-bold text-2xl">ID</Text> 23453455{" "}
            </Text>
            <Text className="flex flex-row text-xl  items-center gap-2">
              <MaterialCommunityIcons name="calendar" size={20} color="black" />
              1st jan 2027 - 31st Dec 2027{" "}
            </Text>
          </View>
          <View className="bg-white rounded-xl py-4 px-2">
            <Text className="font-bold text-xl">Rent Status</Text>
            <View className="bg-yellow-100 py-4 px-2 gap-2 rounded-xl ">
              <Text className="font-bold text-xl text-yellow-800">Pending</Text>
              <Text className=" text-lg">Ksh 10,000 Due By : 30th April</Text>
            </View>
          </View>
            <TouchableOpacity
                    onPress={() => navigation.navigate("hist")}
                    className="py-2 px-4 border bg-white border-gray-300 rounded-xl"
                  >
                    <Text className="text-2xl font-bold text-center">Payment History</Text>
                  </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

export default TenantProfileSreen;
