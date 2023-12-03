import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ios = Platform.OS == "ios";
const topMargin = ios ? "mt-3" : "mt-10";
export default function HomeScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        className={"space-y-6 " + topMargin}
      >
        {/* avatar */}
        <View className="flex-row items-center justify-between mx-5 mb-10">
          <Text
            style={{ fontSize: wp(7) }}
            className="font-bold text-neutral-700"
          >
            Thermography AI
          </Text>
          <View className="flex flex-row items-center justify-between w-2/5 ml-3">
            <TouchableOpacity onPress={() => navigation.navigate("Camera")}>
              <Entypo name="camera" size={24} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require("../../assets/images/avatar.png")}
                style={{ height: wp(12), width: wp(12) }}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* search bar */}
      </ScrollView>
    </SafeAreaView>
  );
}
