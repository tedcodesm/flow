import React, { Component } from "react";
import { Text, View, TextInput, Image, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export class PropertyScreen extends Component {
  render() {
    return (
      <SafeAreaView className="flex-1 bg-gray-200">
        
        {/* MAIN CONTENT */}
        <View className="flex-1 px-2 pt-4">

          {/* SEARCH BAR */}
          <View className="flex-row items-center bg-gray-100 border border-gray-200 rounded-xl px-4 py-2 mb-4">
            <MaterialCommunityIcons name="magnify" size={24} color="#6B7280" />
            <TextInput
              placeholder="Search property"
              placeholderTextColor="#9CA3AF"
              className="flex-1 ml-3 text-base text-gray-800"
            />
          </View>

          {/* PROPERTY LIST */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }} // 👈 space for button
          >
            {[1].map((_, index) => (
              <View
                key={index}
                className="h-20 w-full flex-row bg-white rounded-xl gap-2 mb-4"
              >
                <Image
                  className="h-20 w-20 rounded-xl"
                  source={require("../assets/apartment.jpg")}
                />
                <View className="flex-col justify-between py-2 px-2">
                  <Text className="font-bold text-xl tracking-wide">
                    Spring Apartments
                  </Text>
                  <Text className="px-2 rounded-xl bg-[#14213D] py-1 text-white text-lg">
                    3/5 Occupied · KSH 28,000/month
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* FIXED ADD PROPERTY BUTTON */}
        <View className="absolute bottom-4 left-4 right-4">
          <TouchableOpacity
          onPress={() => this.props.navigation.navigate("createproperty")}
          className="py-4 bg-[#14213D] rounded-xl">
            <Text className="text-2xl text-white font-bold text-center">
              + Add Property
            </Text>
          </TouchableOpacity>
        </View>

      </SafeAreaView>
    );
  }
}

export default PropertyScreen;
