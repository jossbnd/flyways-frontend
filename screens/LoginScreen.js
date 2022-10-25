/* COMMENTAIRES:
 */

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

// Import icons
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function LoginScreen({ navigation }) {
  // fonction pour pouvoir acceder a la page login en appuyant sur le premier logo
  const handleSignIn = () => {
    navigation.navigate("SignIn");
  };

  // fonction pour pouvoir acceder a la page login en appuyant sur le premier logo
  const handleSignUp = () => {
    navigation.navigate("SignUp");
  };

  // fonction pour acceder a la profile page
  const handleProfilePage = () => {
    navigation.navigate("TabNavigator");
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
        <TouchableOpacity style={[styles.button, styles.green]}>
          <FontAwesome
            name="google"
            size={20}
            color="#000000"
            style={{ marginRight: 5 }}
          />
          <StyledRegularText title="Connect with Google" />
        </TouchableOpacity>
      </View>
      <StyledRegularText title="OR" />
      <View style={styles.flywaysButton}>
        <TouchableOpacity
          style={[styles.button, styles.green]}
          onPress={() => handleSignUp()}
        >
          <StyledRegularText title="SIGN UP" style={styles.signup} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.white]}
          onPress={() => handleSignIn()}
        >
          <StyledRegularText title="SIGN IN" style={styles.signin} />
        </TouchableOpacity>
        {/* FONCTION CI DESSOUS A SUPPRIMER UNE FOIS LA PAGE DE PROFLIL TERMINEE */}
        <TouchableOpacity
          style={[styles.button, styles.white]}
          onPress={() => handleProfilePage()}
        >
          <StyledRegularText title="PROFILE PAGE" style={styles.signin} />
        </TouchableOpacity>
        {/* ********************************************************************** */}
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
  signin: {
    color: "#1EA85F",
    fontWeight: "bold",
  },
  signup: {
    fontWeight: "bold",
  },
});
