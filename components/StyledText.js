import React from "react";
import { Text, StyleSheet, View } from "react-native";

import AppLoading from "expo-app-loading";
import { useFonts, Lato_400Regular } from "@expo-google-fonts/lato";

export default function SignUpScreen({ title, style }) {
  let [fontsLoaded] = useFonts({
    Lato_400Regular: Lato_400Regular,
  });

  if (!fontsLoaded) {
    return <View />;
  }

  return <Text style={[styles.text, style]}>{title}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "Lato_400Regular",
  },
});
