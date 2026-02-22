// import React, { useContext, useState } from "react";
// import {
//   Text,
//   View,
//   TouchableOpacity,
//   TextInput,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
//   Keyboard,
//   TouchableWithoutFeedback,
// } from "react-native";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import * as LocalAuthentication from "expo-local-authentication";

// import { SafeAreaView } from "react-native-safe-area-context";
// import axios from "axios";
// import { BASE_URL } from "../config/Ip";
// import { MaterialCommunityIcons } from "@expo/vector-icons";

// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { AuthContext } from "../context/AuthContext";

// export default function LoginScreen({ navigation }) {
//   const { login } = useContext(AuthContext);
//   const [email, setEmail] = useState("bsclmr113626@spu.ac.ke");
//   const [password, setPassword] = useState("12345678");

// const handleFingerprintLogin = async () => {
//   try {
//     // Check if the device has biometrics
//     const compatible = await LocalAuthentication.hasHardwareAsync();
//     if (!compatible) {
//       alert("Biometric authentication is not available on this device");
//       return;
//     }

//     // Check if fingerprints/face ID are enrolled
//     const enrolled = await LocalAuthentication.isEnrolledAsync();
//     if (!enrolled) {
//       alert("No fingerprints or face ID enrolled. Please set it up first.");
//       return;
//     }

//     // Prompt for biometric auth
//     const result = await LocalAuthentication.authenticateAsync({
//       promptMessage: "Login with fingerprint",
//       fallbackLabel: "Enter password",
//     });

//     if (result.success) {
//       // Retrieve stored credentials (securely)
//       const storedEmail = await AsyncStorage.getItem("email");
//       const storedPassword = await AsyncStorage.getItem("password");

//       if (!storedEmail || !storedPassword) {
//         alert("No saved credentials. Please login with email/password first.");
//         return;
//       }

//       // Auto-login with stored credentials
//       const response = await axios.post(`${BASE_URL}/auth/login`, {
//         email: storedEmail,
//         password: storedPassword,
//       });

//       const data = response.data;
//       if (data?.token && data?.user) {
//         await login(data.user, data.token);
//         navigation.replace("drawer");
//       }
//     } else {
//       alert("Authentication failed");
//     }
//   } catch (error) {
//     console.log("Fingerprint error:", error.message);
//     alert("Authentication error");
//   }
// };

//   const handleLogin = async () => {
//     try {
//       const response = await axios.post(`${BASE_URL}/auth/login`, {
//         email,
//         password,
//       });

//       const data = response.data;

//       if (data?.token && data?.user) {
//         await login(data.user, data.token);

//         if (data?.user) {
//           navigation.replace("drawer");
//         }
//       }
//     } catch (error) {
//       alert(error?.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <SafeAreaView className="flex-1 bg-[#14213D]">
//       <View className="h-28 bg-[#14213D]" />

//       <KeyboardAvoidingView
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//         className="flex-1"
//       >
//         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//           <ScrollView
//             vertical={true}
//             className="flex-1 "
//             showsVerticalScrollIndicator={false}
//             contentContainerStyle={{
//               flexGrow: 1,
//               justifyContent: "center",
//             }}
//             enableOnAndroid={true}
//             extraScrollHeight={20}
//             keyboardShouldPersistTaps="handled"
//           >
//             <View className="flex-1 bg-gray-200 rounded-t-3xl px-6 py-8">
//               <Text className="text-4xl font-bold text-[#14213D] mb-6 text-center">
//                 Welcome
//               </Text>
//               <Text className="text-gray-600 text-center mb-6">
//                 Login in to your account
//               </Text>

//               <TextInput
//                 placeholder="Email Address"
//                 placeholderTextColor="#9CA3AF"
//                 value={email}
//                 onChangeText={setEmail}
//                 className="w-full bg-white rounded-xl px-4 py-4 mb-4 text-gray-800 shadow"
//               />

//               <TextInput
//                 placeholder="Password"
//                 placeholderTextColor="#9CA3AF"
//                 secureTextEntry
//                 value={password}
//                 onChangeText={setPassword}
//                 className="w-full bg-white rounded-xl px-4 py-4 mb-6 text-gray-800 shadow"
//               />

//               <View className="w-full flex gap-3 flex-row items-center">
//                 <TouchableOpacity
//                   onPress={handleLogin}
//                   className="w-[80%] py-4 rounded-xl items-center"
//                   style={{ backgroundColor: "#14213D" }}
//                 >
//                   <Text className="text-white font-bold text-lg">Log In</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   onPress={handleFingerprintLogin}
//                   className="w-[18%]  rounded-xl bg-[#14213D] items-center"
//                 >
//                   <MaterialCommunityIcons
//                     name="fingerprint"
//                     size={50}
//                     color="green"
//                   />{" "}
//                 </TouchableOpacity>
//               </View>

//               <TouchableOpacity
//                 onPress={() => navigation.navigate("signup")}
//                 className="mt-4 items-center"
//               >
//                 <Text className="text-gray-500">
//                   Dont have an account?{" "}
//                   <Text className="text-[#14213D] font-bold">Sign Up</Text>
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </ScrollView>
//         </TouchableWithoutFeedback>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// }
import React, { useContext, useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Platform,
  Alert,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import * as LocalAuthentication from "expo-local-authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "../config/Ip";
import { AuthContext } from "../context/AuthContext";

export default function LoginScreen({ navigation }) {
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Check if credentials exist for fingerprint login
  useEffect(() => {
    (async () => {
      const storedEmail = await AsyncStorage.getItem("email");
      const storedPassword = await AsyncStorage.getItem("password");
      if (storedEmail && storedPassword) {
        setEmail(storedEmail);
        setPassword(storedPassword);
      }
    })();
  }, []);

  const handleLogin = async (userEmail = email, userPassword = password) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        email: userEmail,
        password: userPassword,
      });

      const data = response.data;

      if (data?.token && data?.user) {
        // Save credentials for fingerprint login
        await AsyncStorage.setItem("email", userEmail);
        await AsyncStorage.setItem("password", userPassword);

        // Update auth context
        await login(data.user, data.token);

        navigation.replace("drawer");
      }
    } catch (error) {
      alert(error?.response?.data?.message || "Login failed");
    }
  };

  const handleFingerprintLogin = async () => {
    try {
      // Check if device supports biometrics
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const savedBiometrics = await LocalAuthentication.isEnrolledAsync();

      if (!hasHardware || !savedBiometrics) {
        Alert.alert("Fingerprint not supported or enrolled");
        return;
      }

      // Prompt fingerprint
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Login with Fingerprint",
        cancelLabel: "Cancel",
      });

      if (result.success) {
        // Get stored credentials
        const storedEmail = await AsyncStorage.getItem("email");
        const storedPassword = await AsyncStorage.getItem("password");

        if (storedEmail && storedPassword) {
          handleLogin(storedEmail, storedPassword);
        } else {
          Alert.alert("No stored credentials. Please login manually first.");
        }
      }
    } catch (error) {
      console.log("Fingerprint login error:", error.message);
      Alert.alert("Fingerprint login failed");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#14213D]">
      <View className="h-28 bg-[#14213D]" />
      <KeyboardAwareScrollView
        className="flex-1 px- py-6"
        enableOnAndroid
        extraScrollHeight={Platform.OS === "ios" ? 20 : 100}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        <View className="flex-1 bg-gray-200 rounded-t-xl px-6 py-8">
          {/* Header */}
          <Text className="text-4xl font-bold text-[#14213D] mb-2 text-center">
            Welcome
          </Text>
          <Text className="text-gray-600 text-center mb-6">
            Login to your account
          </Text>

          {/* Inputs */}
          <TextInput
            placeholder="Email Address"
            placeholderTextColor="#9CA3AF"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
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

          {/* Login & Fingerprint */}
          <View className="flex-row w-full gap-3 items-center mb-4">
            <TouchableOpacity
              onPress={() => handleLogin()}
              className="flex-1 bg-[#14213D] py-4 rounded-xl items-center"
            >
              <Text className="text-white font-bold text-lg">Log In</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleFingerprintLogin}
              className="w-16 h-16 rounded-xl bg-[#14213D] items-center justify-center"
            >
              <MaterialCommunityIcons
                name="fingerprint"
                size={40}
                color="limegreen"
              />
            </TouchableOpacity>
          </View>

          {/* Sign Up Link */}
          <TouchableOpacity
            onPress={() => navigation.navigate("signup")}
            className="items-center"
          >
            <Text className="text-gray-600">
              Don't have an account?{" "}
              <Text className="text-[#14213D] font-bold">Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}