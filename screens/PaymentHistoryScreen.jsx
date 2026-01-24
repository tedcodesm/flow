import React from "react";
import { Text, View, TouchableOpacity, ScrollView,  } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const PaymentHistoryScreen = () => {
  const navigation = useNavigation();

  // Sample payment data
  const payments = [
    { date: "April 5, 2026", amount: 15000 },
    { date: "December 25, 2026", amount: 13000 },
    { date: "March 31, 2026", amount: 22000 },
    { date: "May 4, 2026", amount: 9000 },
    { date: "June 16, 2026", amount: 86000 },
    { date: "January 17, 2026", amount: 6000 },
    { date: "January 17, 2026", amount: 6000 },
    { date: "January 17, 2026", amount: 6000 },
    { date: "January 17, 2026", amount: 6000 },
    { date: "January 17, 2026", amount: 6000 },
    { date: "January 17, 2026", amount: 6000 },
    { date: "January 17, 2026", amount: 6000 },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-200">
      {/* Header */}
      <View className="px-4 w-full pt-4 items-center flex-row justify-between">
        <TouchableOpacity
          className="py-2 px-2 rounded-full bg-[#14213D]"
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons name="chevron-left" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-black text-2xl font-semibold">Your Payments</Text>
      </View>

      {/* Payment List */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-col gap-4 px-4 py-4">
          {payments.map((payment, index) => (
            <View
              key={index}
              className="flex-col bg-white rounded-xl px-4 py-2 gap-4 w-full"
            >
              <Text className="text-xl text-black font-bold">{payment.date}</Text>
              <View className="h-[2px] bg-black" />

              <View className="w-full items-center justify-between flex-row">
                <Text className="text-green-700 font-bold text-2xl">
                  Paid{" "}
                  <Text className="text-xl text-black font-semibold tracking-wider">
                    Ksh {payment.amount.toLocaleString()}
                  </Text>
                </Text>
                <TouchableOpacity>
                  <Text className="text-blue-600 text-lg">View Receipt</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PaymentHistoryScreen;
