import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingScreen from "../screens/OnboardingScreen";
import LoginScreen from "../screens/LoginScreen";
import { getItem } from "../utils/AsyncStorage";
import HomeScreen from "../screens/HomeScreen";
import CameraScreen from "../screens/CameraScreen";
const Stack = createNativeStackNavigator();

function AppNavigation() {
  const [viewedOnboarding, setViewedOnboarding] = useState(null);

  const checkOnboarded = async () => {
    let onBoarding = await getItem("onboarding");
    if (onBoarding === "1") {
      setViewedOnboarding(true);
    } else {
      setViewedOnboarding(false);
    }
  };

  useEffect(() => {
    checkOnboarded();
  }, []);

  if (viewedOnboarding === false) {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Onboarding"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="Camera" component={CameraScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else if (viewedOnboarding === true) {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="Camera" component={CameraScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return null;
  }
}

export default AppNavigation;
