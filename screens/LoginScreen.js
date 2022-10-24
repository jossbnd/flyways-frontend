/* COMMENTAIRES:
 */

import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import StyledText from "../components/StyledText";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default function LoginScreen({ navigation }) {
  // fonction pour pouvoir acceder a la page login en appuyant sur le premier logo
  const handleSubmit = () => {
    navigation.navigate("SignIn");
  };

  return (
    <SafeAreaView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Image
        style={styles.image}
        source={require("../assets/flyways-logo.png")}
      />
      <View style={styles.titles}>
        <StyledText style={styles.title} title="FlyWays" />
        <StyledText
          style={styles.motto}
          title="Relax, Stress less, save money"
        />
      </View>
      <View style={styles.googleButton}>
        <TouchableOpacity style={[styles.button, styles.green]}>
          <FontAwesome
            name="google"
            size={20}
            color="#000000"
            style={{ marginRight: 5 }}
          />
          <StyledText title="Connect with Google" />
        </TouchableOpacity>
      </View>
      <StyledText title="OR" />
      <View style={styles.flywaysButton}>
        <TouchableOpacity
          style={[styles.button, styles.green]}
          onPress={() => handleSubmit()}
        >
          <StyledText title="SIGN UP" style={styles.signup} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.white]}>
          <StyledText title="SIGN IN" style={styles.signin} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 400,
    resizeMode: "contain",
  },
  titles: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 38,
    color: "#1EA85F",
    marginBottom: 5,
  },
  motto: {
    color: "#1EA85F",
  },
  googleButton: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  flywaysButton: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  button: {
    borderRadius: 20,
    width: "90%",
    height: 40,
    marginTop: 5,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  green: {
    backgroundColor: "#1EA85F",
  },
  white: {
    borderWidth: 1,
    borderColor: "#1EA85F",
  },
  signin: {
    color: "#1EA85F",
    fontWeight: "bold",
  },
  signup: {
    fontWeight: "bold",
  },
});
