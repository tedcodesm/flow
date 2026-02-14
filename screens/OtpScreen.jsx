import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import axios from "axios";
import { BASE_URL } from "../config/Ip.jsx";

export default function VerifyOTP({ route, navigation }) {
  const email = route?.params?.email || "";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [message, setMessage] = useState("");

  const inputs = useRef([]);

  // Handle input change
  const handleChange = (text, index) => {
    if (!/^[0-9]?$/.test(text)) return;

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // move to next input
    if (text && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  // Handle backspace
  const handleBackspace = (key, index) => {
    if (key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  // Submit OTP
  const handleVerify = async () => {
    const otpCode = otp.join("");

    if (otpCode.length !== 6) {
      setMessage("Please enter complete OTP");
      return;
    }

    try {
      const res = await axios.post(`${BASE_URL}/auth/verify`, {
        email,
        otp: otpCode,
      });

      navigation.navigate("login");
    } catch (error) {
      setMessage(error?.response?.data?.message || "Verification failed");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        className="flex-1 bg-[#14213D]"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <KeyboardAwareScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            padding: 20,
          }}
          enableOnAndroid={true}
          extraScrollHeight={20}
        >
          <View className="bg-white rounded-3xl p-6 items-center">
            
            {/* Image */}
            <Image
              source={require("../assets/otp.png")}
              className="w-56 h-40 mb-4"
              resizeMode="contain"
            />

            {/* Title */}
            <Text className="text-2xl font-bold text-[#14213D] mb-2">
              Verify OTP
            </Text>

            <Text className="text-gray-500 mb-3 text-center">
              Enter the 6-digit code sent to
            </Text>
             {message ? (
              <Text className="text-center text-red-500 mt-3">
                {message}
              </Text>
            ) : null}

            <Text className="font-semibold text-[#14213D] mb-6">{email}</Text>

            {/* OTP Boxes */}
            <View className="flex-row justify-between w-full mb-6">
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => (inputs.current[index] = ref)}
                  value={digit}
                  onChangeText={(text) => handleChange(text, index)}
                  onKeyPress={({ nativeEvent }) =>
                    handleBackspace(nativeEvent.key, index)
                  }
                  keyboardType="number-pad"
                  maxLength={1}
                  className="w-12 h-14 border-2 border-gray-300 rounded-xl text-center text-xl font-bold"
                />
              ))}
            </View>

            {/* Button */}
            <TouchableOpacity
              onPress={handleVerify}
              className="w-full h-14 bg-[#14213D] rounded-xl items-center justify-center"
            >
              <Text className="text-white font-bold text-lg">Verify OTP</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
