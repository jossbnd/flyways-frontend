import {
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import StyledBoldText from "../components/StyledBoldText";
import StyledRegularText from "../components/StyledRegularText";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function LoginScreen({ navigation }) {

  const user = useSelector((state) => state.user.value);
  useEffect(() => {
    if (user.token) {
      navigation.navigate('AppStack');
      return;
    }
  }, []);

  // Fonction pour pouvoir accéder à la page login en appuyant sur le premier logo
  const handleSignIn = () => {
    navigation.navigate("SignIn");
  };

  // Fonction pour pouvoir accéder à la page login en appuyant sur le premier logo
  const handleSignUp = () => {
    navigation.navigate("SignUp");
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
        <StyledBoldText style={styles.title} title="FlyWays" />
        <StyledRegularText
          style={styles.motto}
          title="Relax, Stress less, save money"
        />
      </View>
      <View style={styles.googleButton}>
        <TouchableOpacity style={[styles.button, styles.black]}>
          <Image
            source={require("../assets/logo-google.png")}
            style={{ height: 20, width: 20, marginRight: 5 }}
          />
          <StyledBoldText
            title="Connect with Google"
            style={{ color: "#ffffff" }}
          />
        </TouchableOpacity>
      </View>
      <StyledRegularText title="OR" />
      <View style={styles.flywaysButton}>
        <TouchableOpacity
          style={[styles.button, styles.green]}
          onPress={() => handleSignUp()}
        >
          <StyledBoldText title="SIGN UP" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.white]}
          onPress={() => handleSignIn()}
        >
          <StyledBoldText title="SIGN IN" style={styles.signin} />
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
    paddingTop: 50,
  },
  image: {
    width: 200,
    height: 300,
    resizeMode: "contain",
  },
  titles: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    height: 100,
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
    backgroundColor: "rgba(30, 168, 95, 0.5)",
  },
  white: {
    borderWidth: 1,
    borderColor: "#1EA85F",
  },
  black: {
    backgroundColor: "rgba(0, 0, 0, 1)",
  },
  signin: {
    color: "#1EA85F",
  },
});
