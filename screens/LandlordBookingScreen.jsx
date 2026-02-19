import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import axios from "axios";
import { BASE_URL } from "../config/Ip";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LandlordBookingsScreen = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    initialize();
  }, []);

  const initialize = async () => {
    const storedToken = await AsyncStorage.getItem("token");
    setToken(storedToken);
    fetchBookings(storedToken);
  };

  const fetchBookings = async (authToken) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/booking/landlord`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      setBookings(data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (id, action) => {
    try {
      await axios.put(
        `${BASE_URL}/booking/${id}/${action}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === id
            ? {
                ...booking,
                status: action === "confirm" ? "confirmed" : "rejected",
              }
            : booking
        )
      );

      Alert.alert("Success", `Booking ${action}ed successfully`);
    } catch (error) {
      console.log(error.response?.data || error.message);
      Alert.alert("Error", "Something went wrong");
    }
  };


  const renderItem = ({ item }) => (
    <View className="bg-white rounded-2xl p-4 mb-4 shadow-md">
      <Text className="text-lg font-bold text-[#14213D]">
        {item.property?.title}
      </Text>

      <Text className="text-gray-600 mt-1">
        Tenant: {item.tenant?.username}
      </Text>

     <Text className="text-gray-600">
  Date: {new Date(item.viewingDate).toLocaleDateString()}
</Text>


      <Text className="text-gray-600">
        Time: {item.time}
      </Text>

      <Text
        className={`mt-2 font-semibold ${
          item.status === "confirmed"
            ? "text-green-600"
            : item.status === "rejected"
            ? "text-red-600"
            : "text-yellow-600"
        }`}
      >
        Status: {item.status}
      </Text>

      {item.status === "pending" && (
        <View className="flex-row mt-4 justify-between">
          <TouchableOpacity
            className="bg-green-600 px-4 py-2 rounded-xl w-[48%]"
            onPress={() => updateBookingStatus(item._id, "confirm")}
          >
            <Text className="text-white text-center font-semibold">
              Confirm
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-red-600 px-4 py-2 rounded-xl w-[48%]"
            onPress={() => updateBookingStatus(item._id, "reject")}
          >
            <Text className="text-white text-center font-semibold">
              Reject
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#14213D" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <FlatList
        data={bookings}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text className="text-center text-gray-500 mt-10">
            No bookings available
          </Text>
        }
      />
    </View>
  );
};

export default LandlordBookingsScreen;
