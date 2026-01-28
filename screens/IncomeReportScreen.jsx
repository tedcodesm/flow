import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export class IncomeReportScreen extends Component {
  render() {
    return (
      <SafeAreaView className="flex-1 ">
        <View className="flex flex-1 flex-col gap-4 py-4 px-2 bg-gray-200">
          <View className="bg-white rounded-xl justify-between flex-row items-center px-2 py-2">
            <TouchableOpacity>
              {" "}
              <MaterialCommunityIcons name="chevron-left" size={20} />{" "}
            </TouchableOpacity>
            <Text className="font-bold text-lg">
              1st April 2027 - 30th April 2027
            </Text>
            <TouchableOpacity>
              {" "}
              <MaterialCommunityIcons name="chevron-right" size={20} />{" "}
            </TouchableOpacity>
          </View>
          <View className="bg-white py-4 px-2 rounded-xl gap-3">
            <Text className="font-bold text-xl">Income Breakdown</Text>
            <View className="h-[1px] bg-gray-300" />

            <View className="items-center w-full gap-2 flex flex-row">
              <Text className="text-xl w-[50%]">Collected Rent : </Text>
              <Text className="text-xl font-bold">Ksh 275,000</Text>
            </View>
            <View className="h-[1px] bg-gray-300" />

            <View className="items-center gap-2 flex flex-row">
              <Text className="text-xl w-[50%]">Late Fees : </Text>
              <Text className="text-xl font-bold">Ksh 5,000</Text>
            </View>
            <View className="h-[1px] bg-gray-300" />

            <View className="items-center gap-2 flex flex-row">
              <Text className="text-xl w-[50%]">Collected Rent : </Text>
              <Text className="text-xl font-bold">Ksh 40,000</Text>
            </View>
          </View>
          <View className="bg-white flex-col rounded-xl gap-2 py-2 px-2">
            <Text className="font-bold text-xl">House Overview</Text>
            <View className="flex flex-row items-center justify-between">
              <Text className="font-bold text-xl">Spring Apartment</Text>
              <Text className="font-bold text-xl">
                KSH <Text className="font-bold text-xl">75,000</Text>{" "}
                <MaterialCommunityIcons name="chevron-right" size={20} />{" "}
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default IncomeReportScreen;
