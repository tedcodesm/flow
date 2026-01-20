import React from "react";
import {
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const HomeScreen = () => {
  const filterIcons = {
    Bed: "bed-outline",
    Bath: "bathtub",
    "Square feet": "ruler-square",
  };

  return (
    <View className="flex-1 bg-gray-200 relative">
      {/* Status Bar */}
      <StatusBar barStyle="light-content" backgroundColor="#14213D" />

      {/* Header */}
      <ImageBackground
  source={require("../assets/dark.jpg")}
  className="w-full px-4 py-4 flex-row justify-between  h-40"
  imageStyle={{ borderBottomLeftRadius: 15, borderBottomRightRadius: 15 }}
>
  <View className="gap-2">
    <Text className="font-semibold text-white text-lg tracking-wider">
      Hello User
    </Text>
    <Text className="text-white text-2xl tracking-wider">
      Let's Start exploring
    </Text>
  </View>

  <TouchableOpacity className="border rounded-full w-10 h-10 items-center justify-center border-white">
    <MaterialCommunityIcons name="bell-outline" size={24} color="white" />
  </TouchableOpacity>
</ImageBackground>


      {/* Main ScrollView */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="px-4 flex-1 absolute top-28 w-full"
        nestedScrollEnabled={true} // Required for nested horizontal scroll on Android
      >
        {/* Search Section */}
        <View className="gap-5 py-4 bg-white rounded-lg px-4">
          <View className="flex-row justify-center">
            <Text className="font-semibold w-1/2 text-center text-lg">Buy</Text>
            <Text className="font-semibold w-1/2 text-center text-lg">
              Rent
            </Text>
          </View>

          <View className="flex-row items-center bg-gray-100 border border-gray-200 rounded-xl px-4 py-2">
            <MaterialCommunityIcons
              name="map-marker"
              size={24}
              color="#6B7280"
            />
            <TextInput
              placeholder="Search by location, property type, or price"
              placeholderTextColor="#9CA3AF"
              className="flex-1 ml-3 text-base text-gray-800"
            />
          </View>

          <View className="flex-row justify-between">
            {["Bed", "Bath", "Square feet"].map((label) => (
              <TouchableOpacity
                key={label}
                className="flex-row gap-1 border border-gray-300 py-1 px-2 rounded-lg items-center"
              >
                <MaterialCommunityIcons name={filterIcons[label]} size={20} />
                <Text className="font-bold">{label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity className="bg-[#364d7c] py-3 rounded-full">
            <Text className="text-center text-white text-xl">Search</Text>
          </TouchableOpacity>
        </View>

        {/* Promo Banner */}
        <ImageBackground
          source={require("../assets/dark.jpg")}
          imageStyle={{borderRadius:7}}
          className="w-full px-4 py-2 bg-[#364d7c] flex-row justify-between items-center h-20 rounded-lg mt-4"
        >
          <View>
            <Text className="font-semibold text-white text-2xl">Save 15%</Text>
            <Text className="text-white text-lg">
              Limited Time Offer signup Now
            </Text>
          </View>

          <TouchableOpacity className="border rounded-full py-2 px-4 border-white">
            <Text className="text-white">Explore</Text>
          </TouchableOpacity>
        </ImageBackground>

        {/* Featured Properties Header */}
        <View className="flex-row justify-between items-center px-2 py-3">
          <Text className="font-bold text-2xl text-black">
            Featured Property
          </Text>
          <Text className="font-bold text-gray-500">See all</Text>
        </View>

        {/* Horizontal Scroll for Property Cards */}
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          className="mb-4"
        >
          <View className="flex-row items-center gap-5 space-x-4">
            {/* Card 1 */}
            <View
              className="flex-col relative items-center bg-white rounded-lg"
              style={{ width: 320, height: 200 }}
            >
              <Image
                source={require("../assets/house1.jpg")}
                className="rounded-lg"
                style={{ width: 320, height: 140 }}
              />
              <Text className="absolute text-white bg-[#14213D] text-center px-2 py-1 rounded-full top-2 right-4 text-lg">
                For Rent
              </Text>

              <View className="flex-row w-full items-center justify-between px-2 py-4">
                <Text className="font-bold text-xl">HollyWood Hill</Text>
                <Text className="text-blue-500 text-lg">$213/mo</Text>
              </View>
            </View>

            {/* Card 2 */}
            <View
              className="flex-col relative items-center bg-white rounded-lg"
              style={{ width: 320, height: 200 }}
            >
              <Image
                source={require("../assets/house2.jpg")}
                className="rounded-lg"
                style={{ width: 320, height: 140 }}
              />
              <Text className="absolute text-white bg-[#14213D] text-center px-2 py-1 rounded-full top-2 right-4 text-lg">
                For Rent
              </Text>

              <View className="flex-row w-full items-center justify-between px-2 py-4">
                <Text className="font-bold text-xl">HollyWood Hill</Text>
                <Text className="text-blue-500 text-lg">$213/mo</Text>
              </View>
            </View>

            {/* Card 3 */}
            <View
              className="flex-col relative items-center bg-white rounded-lg"
              style={{ width: 320, height: 200 }}
            >
              <Image
                source={require("../assets/house3.jpg")}
                className="rounded-lg"
                style={{ width: 320, height: 140 }}
              />
              <Text className="absolute text-white bg-[#14213D] text-center px-2 py-1 rounded-full top-2 right-4 text-lg">
                For Rent
              </Text>

              <View className="flex-row w-full items-center justify-between px-2 py-4">
                <Text className="font-bold text-xl">HollyWood Hill</Text>
                <Text className="text-blue-500 text-lg">$213/mo</Text>
              </View>
            </View>

            {/* Card 4 */}
            <View
              className="flex-col relative items-center bg-white rounded-lg"
              style={{ width: 320, height: 200 }}
            >
              <Image
                source={require("../assets/house4.jpg")}
                className="rounded-lg"
                style={{ width: 320, height: 140 }}
              />
              <Text className="absolute text-white bg-[#14213D] text-center px-2 py-1 rounded-full top-2 right-4 text-lg">
                For Rent
              </Text>

              <View className="flex-row w-full items-center justify-between px-2 py-4">
                <Text className="font-bold text-xl">HollyWood Hill</Text>
                <Text className="text-blue-500 text-lg">$213/mo</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
