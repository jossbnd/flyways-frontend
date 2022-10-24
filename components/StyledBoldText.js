import React from "react";
import { Text, StyleSheet, View } from "react-native";

import { useFonts, Lato_700Bold } from "@expo-google-fonts/lato";

export default function SignUpScreen({ title, style }) {
  let [fontsLoaded] = useFonts({
    Lato_700Bold: Lato_700Bold,
  });

  if (!fontsLoaded) {
    return <View />;
  }

  return <Text style={[styles.text, style]}>{title}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "Lato_700Bold",
  },
});
