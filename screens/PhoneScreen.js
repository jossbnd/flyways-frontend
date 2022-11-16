import { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Import icones
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

// Import des fonts
import StyledRegularText from "../components/StyledBoldText";
import StyledBoldText from "../components/StyledBoldText";

export default function PhoneScreen({ navigation }) {
  // Création états
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleContinue = () => {
    const PHONE_REGEX = /^(\+33|0033|0)(6|7)[0-9]{8}$/;

    if (PHONE_REGEX.test(phoneNumber)) {
      navigation.navigate("TabNavigator");
      // ajout route pour update user
      setErrorMessage(null);
    } else {
      setErrorMessage("Invalid phone number");
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
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
              placeholder="+33 ..."
              onChangeText={(value) => setPhoneNumber(value)}
              value={phoneNumber}
              keyboardType="phone-pad"
            />
            <FontAwesome5 name="phone" size={25} />
          </View>
          <View style={{ width: "90%" }}>
            <StyledRegularText title={errorMessage} style={{ color: "red" }} />
          </View>
        </View>
        <View style={styles.bottom}>
          <TouchableOpacity style={styles.button} onPress={handleContinue}>
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
    justifyContent: "center",
    alignItems: "center",
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
