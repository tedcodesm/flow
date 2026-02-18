import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";
import { BASE_URL } from "../config/Ip";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PropertyScreen = ({ navigation }) => {
  const [properties, setProperties] = useState([]);

  const fetchProperties = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        console.log("No token found");
        return;
      }

      const res = await axios.get(`${BASE_URL}/property/landlord/myproperty`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setProperties(res.data);

      console.log("Properties:", res.data);
    } catch (error) {
      console.log("Error:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-gray-200">
      <View className="flex-1 px-2 pt-4">
        {/* SEARCH */}
        <View className="flex-row items-center bg-gray-100 border border-gray-200 rounded-xl px-4 py-2 mb-4">
          <MaterialCommunityIcons name="magnify" size={24} color="#6B7280" />
          <TextInput
            placeholder="Search property"
            className="flex-1 ml-3 text-base text-gray-800"
          />
        </View>

        {/* PROPERTY LIST */}
        <ScrollView showsVerticalScrollIndicator={false}>
          {properties.map((property) => (
            <View
              key={property._id}
              className="h-20 w-full flex-row bg-white rounded-xl gap-2 mb-4"
            >
              <Image
                className="h-20 w-20 rounded-xl"
                source={
                  property.images?.[0]
                    ? { uri: property.images[0] }
                    : require("../assets/apartment.jpg")
                }
              />

              <View className="flex-col justify-between py-2 px-2">
                <Text className="font-bold text-xl tracking-wide">
                  {property.title}
                </Text>

                <Text className="px-2 rounded-xl bg-[#14213D] py-1 text-white text-lg">
                  KSH{" "}
                  {property.price}/month
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* BUTTON */}
      <View className="absolute bottom-4 left-4 right-4">
        <TouchableOpacity
          onPress={() => navigation.navigate("createproperty")}
          className="py-4 bg-[#14213D] rounded-xl"
        >
          <Text className="text-2xl text-white font-bold text-center">
            + Add Property
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PropertyScreen;
