import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { BASE_URL } from "../config/Ip"; // your backend base URL

export default function DiscoverScreen() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all"); // rent, sale, all
  const navigation = useNavigation();

 
const fetchProperties = async () => {
  try {
    setLoading(true);
    const res = await axios.get(`${BASE_URL}/property`);
    setProperties(res.data);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

useFocusEffect(
  useCallback(() => {
    fetchProperties();
  }, [])
);

  // Filtered list
  const filteredProperties = properties.filter(
    (property) =>
      (filter === "all" || property.propertytype.toLowerCase() === filter) &&
      property.title.toLowerCase().includes(search.toLowerCase())
  );

  const renderPropertyCard = ({ item }) => (
    <TouchableOpacity
      className="bg-white rounded-2xl shadow-lg mb-6 overflow-hidden"
      onPress={() =>
        navigation.navigate("details", {
          propertyId: item._id,
        })
      }
    >
      <Image
        source={{
          uri:
            item.images && item.images.length > 0
              ? item.images[0]
              : "https://via.placeholder.com/400",
        }}
        style={{ width: "100%", height: 200 }}
        resizeMode="cover"
      />

      <View className="p-4">
        <Text className="text-lg font-bold text-gray-800">{item.title}</Text>
        <Text className="text-gray-500 mt-1">{item.address}</Text>
        <Text className="text-[#14213D] font-bold mt-2">
          {item.propertytype.toLowerCase() === "rent"
            ? `$${item.price}/month`
            : `KSH ${item.price}`}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-[#14213D]">
      {/* Search & Filters */}
      <View className="bg-[#14213D] px-4 pt-8 pb-4">
        <Text className="text-white text-3xl font-bold mb-3">Discover</Text>

        <View className="flex-row bg-gray-200 rounded-xl items-center px-4 py-2">
          <MaterialCommunityIcons name="magnify" size={24} color="#9CA3AF" />
          <TextInput
            placeholder="Search properties..."
            placeholderTextColor="#9CA3AF"
            value={search}
            onChangeText={setSearch}
            className="ml-2 flex-1 text-gray-800"
          />
        </View>

        <View className="flex-row mt-4 justify-between">
          {["all", "rent", "sale"].map((type) => (
            <TouchableOpacity
              key={type}
              onPress={() => setFilter(type)}
              className="px-4 py-2 rounded-full border"
              style={{
                backgroundColor: filter === type ? "#FCA311" : "#E5E7EB",
                borderColor: filter === type ? "#FCA311" : "#D1D5DB",
              }}
            >
              <Text
                style={{
                  color: filter === type ? "white" : "#374151",
                  fontWeight: "600",
                }}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Property List */}
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#FCA311" />
        </View>
      ) : (
        <FlatList
          data={filteredProperties}
          keyExtractor={(item) => item._id}
          renderItem={renderPropertyCard}
          contentContainerStyle={{ padding: 16 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}
