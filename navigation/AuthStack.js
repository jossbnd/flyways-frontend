import { View, Text } from "react-native";
import React from "react";

// Navigation
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Import des screens
import LoadingScreen from "../screens/LoadingScreen";
import LoginScreen from "../screens/LoginScreen";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import PhoneScreen from "../screens/PhoneScreen";
import PhoneVerification from "../screens/PhoneVerification";

const Stack = createNativeStackNavigator();

import { createDrawerNavigator } from "@react-navigation/drawer";
const Drawer = createDrawerNavigator();



export default function AuthStack() {
  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Phone" component={PhoneScreen} />
        <Stack.Screen name="PhoneVerification" component={PhoneVerification} />
      </Stack.Navigator>
  );
}
