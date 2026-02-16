import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Alert,
} from "react-native";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import axios from "axios";
import { BASE_URL } from "../config/Ip";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DetailScreen({ route, navigation }) {
  const { propertyId } = route.params;
  const { width } = Dimensions.get("window");
const [activeIndex, setActiveIndex] = useState(0);
const [imageModalVisible, setImageModalVisible] = useState(false);
const [modalIndex, setModalIndex] = useState(0);

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  
   const [showModal, setShowModal] = useState(false);

  const handleBookViewing = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        setShowModal(true);
      } else {
        console.log("Book viewing for property:", propertyId);
        navigation.navigate("booking", { propertyId });
      }
    } catch (error) {
      console.error("Error checking login:", error.message);
    }
  };

  const handleProceedToPayment = () => {
  navigation.navigate("rent", {
    propertyId: property._id,
    price: property.price,
    property: property, 
  });
};

    // check if user is logged in 
    // useEffect(() => {
    //   const checkAuth = async () => {
    //     const token = await AsyncStorage.getItem("token");
    //     if (!token) {
    //       navigation.navigate("login");
    //     }
    //     };
    //     checkAuth();
    // }, []);

  // Fetch single property
  const fetchProperty = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/property/${propertyId}`);
      setProperty(res.data);
    } catch (error) {
      console.error("Error fetching property:", error.message);
      alert("Failed to fetch property details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperty();
  }, [propertyId]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#FCA311" />
      </View>
    );
  }

  if (!property) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg">Property not found</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-100">
    <View className="relative">
  <FlatList
    data={property.images}
    horizontal
    pagingEnabled
    showsHorizontalScrollIndicator={false}
    onScroll={(event) => {
      const index = Math.round(
        event.nativeEvent.contentOffset.x / width
      );
      setActiveIndex(index);
    }}
    keyExtractor={(_, index) => index.toString()}
    renderItem={({ item, index }) => (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          setModalIndex(index);
          setImageModalVisible(true);
        }}
      >
        <Image
          source={{ uri: item }}
          style={{ width, height: 250 }}
          resizeMode="cover"
        />
      </TouchableOpacity>
    )}
  />

<View className="absolute top-14 left-5 bg-black/50 px-3 py-1 rounded-full">
  <Text className="text-white">
    {activeIndex + 1} / {property.images.length}
  </Text>
</View>


  <View className="absolute top-4 right-4 bg-[#14213D] px-3 py-1 rounded-full">
    <Text className="text-white font-semibold">
      {property.propertytype === "sale" ? "For Sale" : "For Rent"}
    </Text>
  </View>
</View>


      <View className="p-4">
        <Text className="text-2xl font-bold text-gray-800 mb-2">
          {property.title}
        </Text>
        <Text className="text-xl font-bold text-blue-600 mb-2">
          {property.propertytype === "rent"
            ? `$${property.price}/month`
            : `KSH ${property.price}`}
        </Text>

        <View className="flex-row items-center mb-3">
          <MaterialIcons name="location-on" size={20} color="gray" />
          <Text className="text-gray-600 ml-1">{property.address}</Text>
        </View>

        <View className="bg-white p-4 rounded-lg mb-4 shadow-sm">
          <Text className="text-lg font-semibold mb-2">Description</Text>
          <Text className="text-gray-600 leading-6">
            {property.description}
          </Text>
        </View>

        <View className="bg-white p-4 rounded-lg mb-4 shadow-sm">
          <Text className="text-lg font-semibold mb-3">Property Info</Text>
          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-500">Type</Text>
            <Text className="font-semibold">{property.propertytype}</Text>
          </View>
          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-500">Latitude</Text>
            <Text>{property.coordinates.lng}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-500">Longitude</Text>
            <Text>{property.coordinates.lat}</Text>
          </View>
        </View>

        <View className="bg-white p-4 rounded-lg mb-6 shadow-sm">
          <Text className="text-lg font-semibold mb-3">Landlord</Text>
          <View className="flex-row items-center mb-2">
            <Feather name="user" size={18} color="gray" />
            <Text className="ml-2 text-gray-700">
              {property.landlord?.username}
            </Text>
          </View>
          <View className="flex-row items-center">
            <Feather name="phone" size={18} color="gray" />
            <Text className="ml-2 text-gray-700">
              {property.landlord?.phone}
            </Text>
          </View>
        </View>

        <TouchableOpacity
      className="bg-[#14213D] py-4 rounded-lg items-center mb-10"
      onPress={handleBookViewing}
    >
      <Text className="text-white font-bold text-lg">Book Viewing</Text>
    </TouchableOpacity>
        <TouchableOpacity
      className="bg-[#14213D] py-4 rounded-lg items-center mb-10"
      onPress={handleProceedToPayment}
    >
      <Text className="text-white font-bold text-lg">Proceed to payment</Text>
    </TouchableOpacity>
      </View>
         <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Login Required</Text>
            <Text style={styles.modalMessage}>
              You need to log in to book a viewing.
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#E5E7EB" }]}
                onPress={() => setShowModal(false)}
              >
                <Text style={{ color: "#374151", fontWeight: "600" }}>
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#FCA311" }]}
                onPress={() => {
                  setShowModal(false);
                  navigation.navigate("login");
                }}
              >
                <Text style={{ color: "white", fontWeight: "600" }}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal visible={imageModalVisible} transparent={true}>
  <View className="flex-1 bg-black">

    <FlatList
      data={property.images}
      horizontal
      pagingEnabled
      initialScrollIndex={modalIndex}
      getItemLayout={(_, index) => ({
        length: width,
        offset: width * index,
        index,
      })}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) => (
        <Image
          source={{ uri: item }}
          style={{ width, height: "100%" }}
          resizeMode="contain"
        />
      )}
    />

    <TouchableOpacity
      className="absolute top-14 right-5 bg-gray-700 p-3 rounded-full"
      onPress={() => setImageModalVisible(false)}
    >
      <MaterialIcons name="close" size={24} color="white" />
    </TouchableOpacity>

  </View>
</Modal>

    </ScrollView>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#14213D",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: width * 0.8,
    backgroundColor: "white",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  modalMessage: {
    fontSize: 16,
    color: "#4B5563",
    textAlign: "center",
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 5,
  },
});
