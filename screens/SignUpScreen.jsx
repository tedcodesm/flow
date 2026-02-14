import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
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
        className="flex-row items-center px-4 py-3 rounded-xl border"
        style={{
          backgroundColor: selected ? "#14213D" : "#E5E7EB",
          borderColor: selected ? "#14213D" : "#D1D5DB",
        }}
      >
        <MaterialCommunityIcons
          name={selected ? "radiobox-marked" : "radiobox-blank"}
          size={22}
          color={selected ? "white" : "#6B7280"}
        />
        <Text
          style={{
            marginLeft: 8,
            fontWeight: "600",
            color: selected ? "white" : "#374151",
          }}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#14213D]">
      {/* Top area same as status bar */}
      <View className="h-28 bg-[#14213D]" />

      {/* Form area */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView vertical={true} className="flex-1 " showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "center",
            }}
            enableOnAndroid={true} // keeps keyboard handling on Android
            extraScrollHeight={20} // extra padding above inputs when keyboard opens
            keyboardShouldPersistTaps="handled"
          >
            <View className="flex-1 bg-gray-200 rounded-t-3xl px-6 py-8">
              {/* Header */}
              <Text className="text-4xl font-bold text-[#14213D] mb-6 text-center">
                Create Account
              </Text>
              <Text className="text-gray-600 text-center mb-6">
                Sign up to get started
              </Text>

              {/* Role Selection */}
              <Text className="text-gray-700 font-semibold mb-2">I am a:</Text>
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
                className="w-full bg-white rounded-xl px-4 py-4 mb-4 text-gray-800 shadow"
              />

              <TextInput
                placeholder="Email Address"
                placeholderTextColor="#9CA3AF"
                value={email}
                onChangeText={setEmail}
                className="w-full bg-white rounded-xl px-4 py-4 mb-4 text-gray-800 shadow"
              />

              <TextInput
                placeholder="Phone Number"
                placeholderTextColor="#9CA3AF"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
                className="w-full bg-white rounded-xl px-4 py-4 mb-4 text-gray-800 shadow"
              />

              <TextInput
                placeholder="Password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                className="w-full bg-white rounded-xl px-4 py-4 mb-6 text-gray-800 shadow"
              />

              {/* Sign Up Button */}
              <TouchableOpacity
                onPress={handleSignUp}
                className="w-full py-4 rounded-xl items-center"
                style={{ backgroundColor: "#14213D" }}
              >
                <Text className="text-white font-bold text-lg">
                  Sign Up as {role}
                </Text>
              </TouchableOpacity>

              {/* Back to Login */}
              <TouchableOpacity
                onPress={() => navigation.navigate("login")}
                className="mt-4 items-center"
              >
                <Text className="text-gray-500">
                  Already have an account?{" "}
                  <Text className="text-[#14213D] font-bold">Login</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
