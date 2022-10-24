import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { useFonts } from "expo-font";
import StyledText from "../components/StyledText";

export default function LoadingScreen({ navigation }) {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Image
        style={styles.image}
        source={require("../assets/flyways-logo.png")}
      />
      <Text style={styles.title}>FlyWays</Text>
      <Text style={styles.motto}>Relax, Stress less, save money</Text>
      <StyledText title='HELLO WORLD' />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E1E",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    width: 150,
    height: 80,
    resizeMode: "contain",
  },
  title: {
    width: "80%",
    fontSize: 38,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  motto: {
    color: "#1EA85F",
  },
});

