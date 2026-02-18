import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "../config/Ip";

const BookingScreen = ({ route, navigation }) => {
  const { propertyId, propertyTitle } = route.params;

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (event.type === "set" && selectedDate) {
      const newDate = new Date(selectedDate);
      // Preserve previously selected time
      newDate.setHours(date.getHours());
      newDate.setMinutes(date.getMinutes());
      setDate(newDate);
    }
  };

  const onTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (event.type === "set" && selectedTime) {
      const newDate = new Date(date);
      newDate.setHours(selectedTime.getHours());
      newDate.setMinutes(selectedTime.getMinutes());
      setDate(newDate);
    }
  };

  const handleBooking = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");

      const res = await axios.post(
        `${BASE_URL}/booking/`,
        {
          propertyId,
          viewingDate: date.toISOString(), // ← better format for backend
          message,
          time: date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Alert.alert("Success", "Viewing booked successfully");
      navigation.goBack();
    } catch (error) {
      Alert.alert(
        "Error",
        error.response?.data?.message || "Booking failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100 px-4 pt-4">
      <Text className="text-2xl font-bold mb-4">Book Viewing</Text>

      {/* Property Info */}
      <View className="bg-white p-4 rounded-xl mb-4">
        <Text className="text-gray-500">Property</Text>
        <Text className="text-lg font-bold">{propertyTitle}</Text>
      </View>

      {/* Date & Time Selection */}
      <View className="bg-white p-4 rounded-xl mb-4">
        <Text className="text-gray-500 mb-2">Select Viewing Date & Time</Text>

        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          className="flex-row items-center justify-between bg-gray-100 p-3 rounded-lg mb-3"
        >
          <Text className="text-lg">
            {date.toLocaleDateString([], {
              weekday: "short",
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </Text>
          <MaterialCommunityIcons name="calendar" size={24} color="#14213D" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setShowTimePicker(true)}
          className="flex-row items-center justify-between bg-gray-100 p-3 rounded-lg"
        >
          <Text className="text-lg">
            {date.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </Text>
          <MaterialCommunityIcons name="clock-outline" size={24} color="#14213D" />
        </TouchableOpacity>
      </View>

      {/* Message */}
      <View className="bg-white p-4 rounded-xl mb-4">
        <Text className="text-gray-500 mb-2">Message (optional)</Text>
        <TextInput
          placeholder="I'm interested in viewing this property..."
          multiline
          numberOfLines={4}
          value={message}
          onChangeText={setMessage}
          className="bg-gray-100 p-3 rounded-lg text-base"
        />
      </View>

      {/* Book Button */}
      <TouchableOpacity
        onPress={handleBooking}
        disabled={loading}
        className={`bg-[#14213D] py-4 rounded-xl ${loading ? "opacity-70" : ""}`}
      >
        <Text className="text-white text-center text-lg font-bold">
          {loading ? "Booking..." : "Book Viewing"}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === "ios" ? "inline" : "default"}
          minimumDate={new Date()}
          onChange={onDateChange}
        />
      )}

      {/* Time Picker */}
      {showTimePicker && (
        <DateTimePicker
          value={date}
          mode="time"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={onTimeChange}
        />
      )}
    </SafeAreaView>
  );
};

export default BookingScreen;