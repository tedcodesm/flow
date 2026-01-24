import React, { Component } from "react";
import { Text, View, ImageBackground, TouchableOpacity } from "react-native";

export class ChatScreen extends Component {
  render() {
    return (
      <View className="w-full flex-1">
        <ImageBackground
          source={require("../assets/bot2.jpg")}
          className="w-full flex-1 relative"
        >
          <View className="flex-col w-full inset-0 flex-1 items-center justify-between py-4">
            <View className="flex flex-col items-center">
              <Text className="text-xl font-serif font-semibold px-4 py-1  rounded-full text-white">
                Hey! Welcome to Estate Flow 😊
              </Text>
              <Text className="text-xl font-serif font-semibold px-4 py-1 bg-blue-900 rounded-full text-white">
                Echoflow
              </Text>
            </View>
            <View className="pb-20 px-8 w-full">
              <TouchableOpacity className="  italic bg-white  px-4 py-2  rounded-xl  ">
                <Text className="text-black text-2xl text-center  tracking-wider ">
                  Chat With Echoflow
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

export default ChatScreen;
