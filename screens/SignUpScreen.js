import { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";

// Import icones
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

// Import des fonts
import StyledBoldText from "../components/StyledBoldText";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignUpScreen({ navigation }) {
  // Création états inputs
  const [email, setEmail] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [dob, setDob] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordCheck, setPasswordCheck] = useState(null);

  const handleContinue = () => {
    navigation.navigate("Phone");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.header}>
          <StyledBoldText style={styles.title} title="Create an account" />
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
              placeholder="First Name"
              onChangeText={(value) => setFirstName(value)}
              value={firstName}
            />
            <FontAwesome5 name="user" size={25} />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              onChangeText={(value) => setLastName(value)}
              value={lastName}
            />
            <FontAwesome5 name="user" size={25} />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Date of Birth DD/MM/YYYY"
              onChangeText={(value) => setDob(value)}
              value={dob}
            />
            <FontAwesome5 name="calendar-alt" size={25} />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              onChangeText={(value) => setPassword(value)}
              value={password}
            />
            <FontAwesome5 name="lock" size={25} />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              onChangeText={(value) => setPasswordCheck(value)}
              value={passwordCheck}
            />
            <FontAwesome5 name="lock" size={25} />
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
  title: {
    fontSize: 20,
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
