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

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleSignUp = async () => {
    try {
      await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password,
      
      });
      navigation.navigate("drawer");
    } catch (error) {
      alert(error?.response?.data?.message || "Login failed");
    }
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
            enableOnAndroid={true} 
            extraScrollHeight={20} 
            keyboardShouldPersistTaps="handled"
          >
            <View className="flex-1 bg-gray-200 rounded-t-3xl px-6 py-8">
              {/* Header */}
              <Text className="text-4xl font-bold text-[#14213D] mb-6 text-center">
               Welcome
              </Text>
              <Text className="text-gray-600 text-center mb-6">
                Login in to your account
              </Text>

              {/* Role Selection */}
             

              {/* Inputs */}
            

              <TextInput
                placeholder="Email Address"
                placeholderTextColor="#9CA3AF"
                value={email}
                onChangeText={setEmail}
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
                 Log In
                </Text>
              </TouchableOpacity>

              {/* Back to Login */}
              <TouchableOpacity
                onPress={() => navigation.navigate("signup")}
                className="mt-4 items-center"
              >
                <Text className="text-gray-500">
                  Dont have an account?{" "}
                  <Text className="text-[#14213D] font-bold">Sign Up</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
