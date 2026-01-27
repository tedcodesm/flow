import { useState } from "react";
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  FlatList,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { GoogleGenAI } from "@google/genai";
import { GEMINI_API_KEY } from "../config/Ip";

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

// Starter messages
const initialMessages = [
  { sender: "you", message: "Hello, how are you?" },
  { sender: "ML", message: "Hello! How can I assist you today?" },
];

// Chat bubble
function ChatMessage({ item }) {
  const isYou = item.sender === "you";

  return (
    <View
      className={`max-w-[70%] rounded-xl px-4 py-2 my-1 ${
        isYou ? "self-end bg-[#004F98]" : "self-start bg-orange-200"
      }`}
    >
      <Text className="text-xs font-semibold text-gray-700 mb-1">
        {item.sender}
      </Text>
      <Text className={`text-base ${isYou ? "text-white" : "text-black"}`}>
        {item.message}
      </Text>
    </View>
  );
}

export default function ChatScreen() {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);

  // Call Gemini
  const makeAiInference = async (prompt) => {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash-lite",
        contents: prompt,
      });

      const text =
        response.response.candidates[0].content.parts[0].text;

      setMessages((prev) => [
        ...prev,
        { sender: "ML", message: text },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "ML", message: "Sorry, I couldn’t process that." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Send message
  const sendPrompt = () => {
    const trimmed = inputText.trim();
    if (!trimmed) return;

    setMessages((prev) => [
      ...prev,
      { sender: "you", message: trimmed },
    ]);

    setInputText("");
    setLoading(true);
    makeAiInference(trimmed);
  };

  // 🔹 WELCOME SCREEN
  if (!showChat) {
    return (
      <SafeAreaView className="flex-1">
        <ImageBackground
          source={require("../assets/bot2.jpg")}
          className="flex-1"
        >
          <View className="flex-1 items-center justify-between py-10 pb-24">
            <View className="items-center">
              <Text className="text-xl font-semibold text-white">
                Hey! Welcome to Estate Flow 😊
              </Text>
              <Text className="mt-2 text-xl font-semibold bg-blue-900 px-4 py-1 rounded-full text-white">
                Echoflow
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => setShowChat(true)}
              className="bg-white px-6 py-3 rounded-xl"
            >
              <Text className="text-2xl text-center">
                Chat With Echoflow
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }

  // 🔹 CHAT SCREEN
  return (
    <KeyboardAvoidingView
      className="flex-1 bg-gray-100"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={80}
    >
      {/* Header */}
      <View className="px-4 bg-[#14213D] flex-row items-center py-4 justify-between">
        <TouchableOpacity className="py-2 px-2 bg-white rounded-full" onPress={() => setShowChat(false)}>
          <MaterialCommunityIcons
            name="chevron-left"
            size={26}
            color="black"
          />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-white">
          Echoflow Chat
        </Text>
        <View style={{ width: 26 }} />
      </View>

      {/* Messages */}
      <FlatList
        data={messages}
        renderItem={({ item }) => <ChatMessage item={item} />}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{ padding: 10 }}
      />

      {loading && (
        <Text className="text-center text-gray-600 mb-2">
          Please wait ...
        </Text>
      )}

      {/* Input */}
      <View className="flex-row items-center p-2 pb-20 bg-white border-t">
        <TextInput
          className="flex-1 px-4 py-2 bg-slate-200 rounded-full"
          placeholder="Type a message"
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity
          onPress={sendPrompt}
          className="ml-2 bg-[#037ff3] px-4 py-2 rounded-full"
        >
          <Text className="text-white font-bold">Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
