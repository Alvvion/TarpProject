import { Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import React, { Component } from "react";
import { StatusBar } from "expo-status-bar";
import { theme } from "../theme";
// import Animated, { FadeIn, FadeInUp, FadeOut } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
  const navigation = useNavigation();
  return (
    <View className="w-full h-full bg-white">
      <StatusBar style="light" />
      <Image
        source={require("../../assets/images/background.png")}
        className="absolute w-full h-full"
      />
      <View className="absolute flex-row justify-around w-full">
        <Image
          source={require("../../assets/images/light.png")}
          className="h-[275] w-[110]"
        />
        <Image
          source={require("../../assets/images/light.png")}
          className="h-[190] w-[75]"
        />
      </View>
      <View className="flex justify-around w-full h-full pt-40 pb-10">
        <View className="flex items-center pb-10">
          <Text className="text-5xl font-bold tracking-wider text-white">
            Login
          </Text>
        </View>
        <View className="flex items-center mx-4 space-y-4">
          <View className="w-full p-5 bg-black/5 rounded-2xl">
            <TextInput placeholder="Email" placeholderTextColor={"gray"} />
          </View>
          <View className="w-full p-5 mb-3 bg-black/5 rounded-2xl">
            <TextInput
              placeholder="Password"
              placeholderTextColor={"gray"}
              secureTextEntry
            />
          </View>
          <View className="w-full">
            <TouchableOpacity
              className="w-full p-3 mb-3 rounded-2xl"
              style={{ backgroundColor: theme.bg(1) }}
              onPress={() => navigation.navigate("HomeScreen")}
            >
              <Text className="text-xl font-bold text-center text-white">
                Login
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row justify-center">
            <Text>Don't have an account? </Text>
            <TouchableOpacity>
              <Text className="text-sky-600">SignUp</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
