import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

// Import store redux et fonction redux
import { useDispatch, useSelector } from "react-redux";
import { login } from "../reducers/user";

// Import des fonts
import StyledBoldText from "../components/StyledBoldText";
import StyledRegularText from "../components/StyledRegularText";

// Import des icons
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

// Mettre son adresse back end ici
const BACK_END_ADDRESS = "https://flyways-backend.vercel.app/";

export default function LoginScreen({ navigation }) {
  // Création états inputs
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();

  // Fonction pour pouvoir acceder a la page login en appuyant sur le premier logo
  const handleContinue = () => {
    const EMAIL_REGEX =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // check email
    if (EMAIL_REGEX.test(email)) {
      fetch(`${BACK_END_ADDRESS}/users/signin`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: email, password: password }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.result) {
            dispatch(
              login({
                firstName: data.user.firstName,
                lastName: data.user.lastName,
                token: data.user.token,
              })
            );
            setErrorMessage(null);
            navigation.navigate("TabNavigator");
          } else {
            setErrorMessage(data.error);
          }
        });
    } else {
      setErrorMessage("Invalid Mail");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "android" ? "position" : "height"}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeContainer}>
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
        <View style={styles.inputsContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="E-mail address"
              onChangeText={(value) => setEmail(value)}
              value={email}
            />
            <FontAwesome5 name="mail-bulk" size={25} />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              onChangeText={(value) => setPassword(value)}
              value={password}
              secureTextEntry={true}
            />
            <FontAwesome5 name="lock" size={25} />
          </View>
          <View style={styles.errorContainer}>
            <StyledRegularText title={errorMessage} style={{ color: "red" }} />
          </View>
        </View>
        <View style={styles.bottom}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleContinue()}
          >
            <StyledBoldText title="CONTINUE" style={styles.buttonText} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeContainer: {
    flex: 1,
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
  inputsContainer: {
    flex: 5,
    width: "100%",
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    width: "90%",
    borderBottomWidth: 1,
    height: "10%",
    minHeight: 45,
    margin: 3,
    justifyContent: "space-between",
    alignItems: "center",
  },
  errorContainer: {
    width: "90%",
    height: "10%",
    minHeight: 45,
    margin: 3,
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  input: {
    width: "90%",
    height: "100%",
  },
  bottom: {
    marginTop: 280,
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  button: {
    width: "90%",
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(30, 168, 95, 0.5)",
  },
  buttonText: {
    fontSize: 14,
  },
});
