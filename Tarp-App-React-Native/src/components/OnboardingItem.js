import {
  View,
  Text,
  Image,
  useWindowDimensions,
  TouchableOpacity,
  Animated,
} from "react-native";
import React, { useEffect, useRef } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { G, Circle } from "react-native-svg";
import { theme } from "../theme";
import { AntDesign } from "@expo/vector-icons";

export default function OnboardingItem({ item, percentage, buttonFn }) {
  const { width } = useWindowDimensions();
  const buttonSize = 80;
  const buttonStrokeWidth = 6;
  const buttonCenter = buttonSize / 2;
  const buttonRadius = buttonSize / 2 - buttonStrokeWidth / 2;
  const buttonCircumference = 2 * Math.PI * buttonRadius;
  const progressAnimation = useRef(new Animated.Value(0)).current;
  const progressRef = useRef(null);
  const animation = (toValue) => {
    return Animated.timing(progressAnimation, {
      toValue,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    animation(percentage);
  }, [percentage]);

  useEffect(() => {
    progressAnimation.addListener(
      (value) => {
        const strokeDashoffset =
          buttonCircumference - (buttonCircumference * value.value) / 100;
        if (progressRef.current) {
          progressRef.current.setNativeProps({
            strokeDashoffset,
          });
        }
      },
      [percentage]
    );
    return () => {
      progressAnimation.removeAllListeners();
    };
  }, []);
  return (
    <View className="flex justify-end flex-1">
      <Image source={item.image} style={{ width }} className="w-full h-full" />
      <View className="absolute p-5 pb-10 space-y-8">
        <LinearGradient
          colors={["transparent", "rgba(3,105,161,0.8)"]}
          style={{ width: wp(100), height: hp(60) }}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          className="absolute bottom-0"
        />
        <View className="space-y-3">
          <Text
            className="text-5xl font-bold text-white"
            style={{ fontSize: wp(10) }}
          >
            {item.title}
          </Text>
          <Text
            className="font-medium text-neutral-200"
            style={{ fontSize: wp(4) }}
          >
            {item.subtitle}
          </Text>
        </View>
        <View className="items-center justify-center flex-1">
          <Svg width={buttonSize} height={buttonSize}>
            <G rotation="-90" origin={buttonCenter}>
              <Circle
                stroke="#E6E7E8"
                cx={buttonCenter}
                cy={buttonCenter}
                r={buttonRadius}
                strokeWidth={buttonStrokeWidth}
                fill="#fff"
              />
              <Circle
                stroke="rgba(249, 115, 22, 1)"
                ref={progressRef}
                cx={buttonCenter}
                cy={buttonCenter}
                r={buttonRadius}
                strokeWidth={buttonStrokeWidth}
                strokeDasharray={buttonCircumference}
                fill="#fff"
              />
            </G>
          </Svg>
          <TouchableOpacity
            style={{ backgroundColor: theme.bg(1) }}
            className="absolute p-4 mx-auto rounded-full"
            onPress={buttonFn}
          >
            <AntDesign name="arrowright" size={32} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
