import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const IncomeReportScreen = () => {
  const expectedRent = 300000;
  const collectedRent = 275000;

  const progress = (collectedRent / expectedRent) * 100;

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1 gap-4 p-4">

        {/* Date Selector */}
        <View className="bg-white rounded-2xl flex-row items-center justify-between px-4 py-3 shadow-sm">
          <TouchableOpacity>
            <MaterialCommunityIcons name="chevron-left" size={24} />
          </TouchableOpacity>

          <Text className="font-semibold text-base text-gray-700">
            1 Apr 2027 - 30 Apr 2027
          </Text>

          <TouchableOpacity>
            <MaterialCommunityIcons name="chevron-right" size={24} />
          </TouchableOpacity>
        </View>

        {/* Total Income Card */}
        <View className="bg-[#14213D] rounded-2xl p-5 shadow-lg">
          <Text className="text-gray-300 text-sm">Total Income</Text>
          <Text className="text-white text-3xl font-bold mt-1">
            Ksh 320,000
          </Text>

          <Text className="text-gray-300 mt-3 text-sm">
            Rent Collection Progress
          </Text>

          {/* Progress Bar */}
          <View className="h-3 bg-gray-300 rounded-full mt-2 overflow-hidden">
            <View
              style={{ width: `${progress}%` }}
              className="h-full bg-green-500 rounded-full"
            />
          </View>

          <Text className="text-gray-200 mt-2 text-xs">
            {progress.toFixed(0)}% of expected rent collected
          </Text>
        </View>

        {/* Income Breakdown */}
        <View className="bg-white rounded-2xl p-4 shadow-sm">
          <Text className="font-bold text-lg mb-3">
            Income Breakdown
          </Text>

          <View className="flex-row justify-between py-2">
            <Text className="text-gray-600">Collected Rent</Text>
            <Text className="font-semibold">Ksh 275,000</Text>
          </View>

          <View className="h-[1px] bg-gray-200" />

          <View className="flex-row justify-between py-2">
            <Text className="text-gray-600">Late Fees</Text>
            <Text className="font-semibold">Ksh 5,000</Text>
          </View>

          <View className="h-[1px] bg-gray-200" />

          <View className="flex-row justify-between py-2">
            <Text className="text-gray-600">Other Charges</Text>
            <Text className="font-semibold">Ksh 40,000</Text>
          </View>
        </View>

        {/* Property Overview */}
        <View className="bg-white rounded-2xl p-4 shadow-sm">
          <Text className="font-bold text-lg mb-3">
            Property Overview
          </Text>

          <TouchableOpacity className="flex-row justify-between items-center py-2">
            <Text className="font-semibold text-gray-800">
              Spring Apartment
            </Text>

            <View className="flex-row items-center gap-1">
              <Text className="font-bold text-gray-900">
                Ksh 75,000
              </Text>
              <MaterialCommunityIcons name="chevron-right" size={20} />
            </View>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
};

export default IncomeReportScreen;
