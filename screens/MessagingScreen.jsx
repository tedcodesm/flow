import React, { useEffect, useState } from "react";
import { View, TextInput, FlatList, Text, TouchableOpacity } from "react-native";
import axios from "axios";
import { BASE_URL } from "../config/Ip";
import { useSocket } from "../context/SocketContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MessagingScreen = ({ route }) => {
  const propertyId = route?.params?.propertyId;
  const { socket } = useSocket();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  // Guard
  if (!propertyId) {
    return <Text>No property selected</Text>;
  }

  // Fetch old messages
  useEffect(() => {
    const fetchMessages = async () => {


        const token = await AsyncStorage.getItem("token");
      try {
        const res = await axios.get(
          `${BASE_URL}/messages/property/${propertyId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMessages(res.data.messages);
      } catch (error) {
        console.log(error.response?.data || error.message);
      }
    };

    fetchMessages();
  }, [propertyId]);

  // Listen for new messages
  useEffect(() => {
    if (!socket) return;

    socket.on("newMessage", (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => {
      socket.off("newMessage");
    };
  }, [socket]);

  const handleSend = async () => {
    if (!text.trim()) return;

    try {
      const res = await axios.post(
        `${BASE_URL}/messages/send/property/${propertyId}`,
        { content: text },
        {
          headers: {
            Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
          },
        }
      );

      setMessages((prev) => [...prev, res.data]);
      setText("");
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <View className="flex-1 bg-white p-4">
      <FlatList
        data={messages}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Text className="mb-2">{item.content}</Text>
        )}
      />

      <View className="flex-row items-center">
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Type a message..."
          className="flex-1 border rounded-lg p-3"
        />

        <TouchableOpacity
          onPress={handleSend}
          className="ml-2 bg-blue-500 px-4 py-3 rounded-lg"
        >
          <Text className="text-white">Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MessagingScreen;