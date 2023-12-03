import { View, FlatList, Animated } from "react-native";
import React, { useState, useRef } from "react";
import { OnboardingSlides } from "../constants";
import OnboardingItem from "../components/OnboardingItem";
import { useNavigation } from "@react-navigation/native";
import { setItem } from "../utils/AsyncStorage";

export default function OnboardingScreen() {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const viewableItemChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
  const slidesRef = useRef(null);

  const scrollTo = () => {
    if (currentIndex < OnboardingSlides.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      setItem("onboarding", "1");
      navigation.navigate("Login");
    }
  };

  return (
    <View className="items-center justify-center flex-1">
      <View style={{ flex: 3 }}>
        <FlatList
          data={OnboardingSlides}
          renderItem={({ item }) => (
            <OnboardingItem
              item={item}
              percentage={(currentIndex + 1) * (100 / OnboardingSlides.length)}
              buttonFn={scrollTo}
            />
          )}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          viewabilityConfig={viewConfig}
          onViewableItemsChanged={viewableItemChanged}
          scrollEventThrottle={32}
          ref={slidesRef}
        />
      </View>
    </View>
  );
}
