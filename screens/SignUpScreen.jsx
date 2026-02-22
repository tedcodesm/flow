import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Platform,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { BASE_URL } from "../config/Ip";

export default function SignUpScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("tenant");

  const handleSignUp = async () => {
    try {
      await axios.post(`${BASE_URL}/auth/register`, {
        username,
        email,
        password,
        phone,
        role,
      });
      navigation.navigate("otp", { email });
    } catch (error) {
      alert(error?.response?.data?.message || "Sign up failed");
    }
  };

  const renderRadioOption = (label, value) => {
    const selected = role === value;
    return (
      <TouchableOpacity
        onPress={() => setRole(value)}
        className={`flex-row items-center px-4 py-3 rounded-lg border flex-1 ${
          selected ? "bg-[#14213D] border-[#14213D]" : "bg-gray-200 border-gray-300"
        }`}
      >
        <MaterialCommunityIcons
          name={selected ? "radiobox-marked" : "radiobox-blank"}
          size={22}
          color={selected ? "white" : "#6B7280"}
        />
        <Text className={`ml-2 font-semibold ${selected ? "text-white" : "text-gray-700"}`}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#14213D]">
  {/* Top colored area */}
  <View className="h-28 bg-[#14213D]" />

  <KeyboardAwareScrollView
    className="flex-1 px- py-6"
    enableOnAndroid
    extraScrollHeight={Platform.OS === "ios" ? 20 : 100}
    keyboardShouldPersistTaps="handled"
    contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
  >
    {/* Form area with rounded top */}
    <View className="flex-1 bg-gray-200 rounded-t-xl px-4 py-6">
      {/* Header */}
      <Text className="text-4xl font-bold text-black text-center mb-2">
        Create Account
      </Text>
      <Text className="text-gray-600 text-center mb-6">
        Sign up to get started
      </Text>

      {/* Role Selection */}
      <Text className="text-black font-semibold mb-2">I am a:</Text>
      <View className="flex-row gap-3 mb-6">
        {renderRadioOption("Tenant", "tenant")}
        {renderRadioOption("Landlord", "landlord")}
      </View>

      {/* Inputs */}
      <TextInput
        placeholder="Full Name"
        placeholderTextColor="#9CA3AF"
        value={username}
        onChangeText={setUsername}
        className="w-full bg-white rounded-xl px-4 py-4 mb-4 text-gray-800"
      />
      <TextInput
        placeholder="Email Address"
        placeholderTextColor="#9CA3AF"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        className="w-full bg-white rounded-xl px-4 py-4 mb-4 text-gray-800"
      />
      <TextInput
        placeholder="Phone Number"
        placeholderTextColor="#9CA3AF"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
        className="w-full bg-white rounded-xl px-4 py-4 mb-4 text-gray-800"
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#9CA3AF"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        className="w-full bg-white rounded-xl px-4 py-4 mb-6 text-gray-800"
      />

      {/* Sign Up Button */}
      <TouchableOpacity
        onPress={handleSignUp}
        className="w-full bg-[#14213D] py-4 rounded-xl items-center mb-4"
      >
        <Text className="text-white font-bold text-lg">Sign Up as {role}</Text>
      </TouchableOpacity>

      {/* Back to Login */}
      <TouchableOpacity
        onPress={() => navigation.navigate("login")}
        className="items-center"
      >
        <Text className="text-gray-600">
          Already have an account?{" "}
          <Text className="text-[#14213D] font-bold">Login</Text>
        </Text>
      </TouchableOpacity>
    </View>
  </KeyboardAwareScrollView>
</SafeAreaView>
  );
}