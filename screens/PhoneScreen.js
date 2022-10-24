import { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useDispatch, useSelector } from "react-redux";
import { login } from "../reducers/user";

// Import icones
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

// Import des fonts
import StyledRegularText from "../components/StyledBoldText";
import StyledBoldText from "../components/StyledBoldText";

export default function PhoneScreen({ navigation, route: { params } }) {
  // Création états inputs
  const [phoneNumber, setPhoneNumber] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const handleContinue = () => {
    let newUser = { ...params.newUser, phoneNumber: phoneNumber };

    console.log(newUser);
    fetch("http://192.168.10.134:3000/users/signup", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newUser),
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
          navigation.navigate("Home");
          console.log("USER ENREGISTRE");
        }
      });
  };

  console.log(user);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.header}>
          <TouchableOpacity
            style={{ width: "90%" }}
            onPress={() => navigation.navigate("SignUp")}
          >
            <FontAwesome5 name="arrow-left" size={25} style={styles.back} />
          </TouchableOpacity>
          <StyledBoldText style={styles.welcome} title="Welcome" />
        </View>
        <View style={styles.inputsContainer}>
          <StyledRegularText title="Please enter your phone number" />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="+33 (0) ..."
              onChangeText={(value) => setPhoneNumber(value)}
              value={phoneNumber}
            />
            <FontAwesome5 name="phone" size={25} />
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
    width: "100%",
    alignItems: "center",
  },
  header: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  back: {
    width: "90%",
  },
  welcome: {
    fontSize: 30,
    width: "90%",
    textAlign: "left",
    color: "#1EA85F",
  },
  inputsContainer: {
    flex: 5,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    flexDirection: "row",
    width: "90%",
    height: "10%",
    minHeight: 50,
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 30,
  },
  input: {
    width: "90%",
    height: "100%",
  },
  bottom: {
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
