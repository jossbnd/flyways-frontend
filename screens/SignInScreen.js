import {
    Image,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
  } from "react-native";
  
  export default function SignInScreen({ navigation }) {
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
      width: "100%",
      height: "50%",
    },
    title: {
      width: "80%",
      fontSize: 38,
      fontWeight: "600",
    },
  });
  