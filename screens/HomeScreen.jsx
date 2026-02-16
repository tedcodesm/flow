import React, { useContext } from "react";
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
import { SafeAreaView } from "react-native-safe-area-context";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { properties } from "../data/properties";
import { AuthContext } from "../context/AuthContext";

const HomeScreen = () => {
  const { name, authenticated } = useContext(AuthContext);
  const filterIcons = {
    Bed: "bed-outline",
    Bath: "bathtub",
    "Square feet": "ruler-square",
  };

  const navigation = useNavigation();
  console.log(navigation.getParent());

  return (
    <SafeAreaView className="flex-1 bg-gray-200 relative">
      {/* Status Bar */}
      <StatusBar barStyle="light-content" backgroundColor="#14213D" />

      {/* Header */}
      <ImageBackground
        source={require("../assets/dark.jpg")}
        className="w-full px-4 py-4 flex-row justify-between  h-24"
        imageStyle={{ borderBottomLeftRadius: 40, borderBottomRightRadius: 40 }}
      >
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <MaterialCommunityIcons name="menu" size={34} color="white" />
        </TouchableOpacity>
        <View className="gap-2 items-center">
          <Text className="font-semibold text-white text-lg tracking-wider">
            Hello {name ? name : "Guest"}
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
        className="px-4 flex-1  mt-2 w-full"
        nestedScrollEnabled={true} // Required for nested horizontal scroll on Android
      >
        {/* Search Section */}
        {authenticated ? (
          <View className="flex-row bg-gray-200 rounded-xl items-center px-4 py-2 mb-4">
            <MaterialCommunityIcons name="magnify" size={24} color="#9CA3AF" />
            <TextInput
              placeholder="Search properties..."
              placeholderTextColor="#9CA3AF"
              className="ml-2 flex-1 text-gray-800"
            />
          </View>
        ) : (
          <View className="bg-[#14213D] rounded-2xl p-5 mx-4 my-3 shadow-lg">
            {/* Top icon + text row */}
            <View className="flex-row items-center">
              {/* Icon container */}
              <View className="bg-white/20 p-3 rounded-xl">
                <MaterialCommunityIcons
                  name="heart-outline"
                  size={26}
                  color="white"
                />
              </View>

              {/* Text */}
              <View className="ml-4 flex-1">
                <Text className="text-white text-lg font-semibold">
                  Save your favorite homes
                </Text>

                <Text className="text-gray-200 text-sm mt-1">
                  Login to save, compare, and contact landlords easily
                </Text>
              </View>
            </View>

            {/* Divider */}
            <View className="h-[1px] bg-white/20 my-4" />

            {/* Button */}
            <TouchableOpacity
              className="bg-white rounded-xl py-3 flex-row justify-center items-center"
              onPress={() => navigation.navigate("login")}
            >
              <MaterialCommunityIcons name="login" size={20} color="#364d7c" />

              <Text className="text-[#364d7c] font-semibold text-base ml-2">
                Login or Create Account
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Promo Banner */}
        <ImageBackground
          source={require("../assets/dark.jpg")}
          imageStyle={{ borderRadius: 7 }}
          className="w-full px-4 py-2 bg-[#364d7c] flex-row justify-between items-center h-20 rounded-lg mt-4"
        >
          <View>
            <Text className="font-semibold text-white text-2xl">Save 15%</Text>
            <Text className="text-white text-lg">
              Limited Time Offer signup Now
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate("signup")}
            className="border rounded-full py-2 px-4 border-white"
          >
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
          <View className="flex-row items-center gap-5">
            {properties.map((property) => (
              <TouchableOpacity
                key={property.id}
                activeOpacity={0.8}
                onPress={() =>
                  navigation.navigate("propertydetails", {
                    propertyId: property.id,
                  })
                }
              >
                <View
                  className="flex-col relative items-center bg-white rounded-lg"
                  style={{ width: 320, height: 200 }}
                >
                  <Image
                    source={property.images[0]}
                    style={{ width: 320, height: 140 }}
                  />

                  <Text className="absolute text-white bg-[#14213D] px-2 py-1 rounded-full top-2 right-4 text-lg">
                    {property.propertytype === "sale" ? "For Sale" : "For Rent"}
                  </Text>

                  <View className="flex-row w-full items-center justify-between px-2 py-4">
                    <Text className="font-bold text-xl">{property.title}</Text>
                    <Text className="text-blue-500 text-lg">
                      ${property.price}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
