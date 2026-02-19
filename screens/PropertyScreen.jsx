import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";
import { BASE_URL } from "../config/Ip";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PropertyScreen = ({ navigation }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) return;

      const res = await axios.get(
        `${BASE_URL}/property/landlord/myproperty`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProperties(res.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredProperties = properties.filter((property) =>
    property.title.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
    
      className="bg-white rounded-2xl mb-4 shadow-sm overflow-hidden"
    >
      <Image
        className="h-40 w-full"
        source={
          item.images?.[0]
            ? { uri: item.images[0] }
            : require("../assets/apartment.jpg")
        }
      />

      <View className="p-4">
        <View className="flex-row justify-between items-center">
          <Text className="text-lg font-bold text-gray-800">
            {item.title}
          </Text>

          <View className="bg-[#14213D] px-3 py-1 rounded-full">
            <Text className="text-white text-xs font-semibold">
              Active
            </Text>
          </View>
        </View>

        <Text className="text-gray-500 mt-1">
          {item.address}
        </Text>

        <View className="flex-row justify-between items-center mt-3">
          <Text className="text-xl font-bold text-[#14213D]">
            Ksh {Number(item.price).toLocaleString()}
            <Text className="text-sm text-gray-500"> /month</Text>
          </Text>

        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#14213D" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="px-4 pt-4 flex-1">

        {/* Header */}
        <View className="mb-4">
          <Text className="text-2xl font-bold text-gray-900">
            My Properties
          </Text>
          <Text className="text-gray-500">
            {properties.length} Properties Listed
          </Text>
        </View>

        {/* Search */}
        <View className="flex-row items-center bg-white rounded-xl px-4 py-3 mb-4 shadow-sm">
          <MaterialCommunityIcons
            name="magnify"
            size={22}
            color="#9CA3AF"
          />
          <TextInput
            placeholder="Search property..."
            value={search}
            onChangeText={setSearch}
            className="flex-1 ml-3 text-gray-800"
          />
        </View>

        {/* Property List */}
        <FlatList
          data={filteredProperties}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View className="items-center mt-20">
              <MaterialCommunityIcons
                name="home-city-outline"
                size={60}
                color="#D1D5DB"
              />
              <Text className="text-gray-400 mt-4 text-lg">
                No properties found
              </Text>
            </View>
          }
        />
      </View>

      {/* Floating Add Button */}
      <TouchableOpacity
        onPress={() => navigation.navigate("createproperty")}
        className="absolute bottom-6 right-6 bg-[#14213D] h-16 w-16 rounded-full justify-center items-center shadow-lg"
      >
        <MaterialCommunityIcons name="plus" size={30} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default PropertyScreen;
