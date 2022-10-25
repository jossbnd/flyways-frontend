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

// Import pour gérer le date picker
import DateTimePicker from "@react-native-community/datetimepicker";
import formatDate from "../modules/formatDate";

// Import icones
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

// Import des fonts
import StyledRegularText from "../components/StyledRegularText";
import StyledBoldText from "../components/StyledBoldText";

// Import Store Redux
import { useDispatch } from "react-redux";
import { login } from "../reducers/user";

// Mettre son adresse back end ici
const BACK_END_ADDRESS = "192.168.10.135:3000";

export default function SignUpScreen({ navigation }) {
  // Création états inputs
  const [email, setEmail] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [dob, setDob] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordCheck, setPasswordCheck] = useState(null);

  // Etats pour date picker
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  // Etat pour messages d'erreur
  const [errorMessages, setErrorMessages] = useState([]);

  // Redux dispatch
  const dispatch = useDispatch();

  // Fonction pour bouton Continue: check input + fetch
  const handleContinue = async () => {
    let inputsAreValid = true;
    let errors = [];

    setErrorMessages([]);

    // Regex ratterns
    const EMAIL_REGEX =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const DATE_REGEX =
      /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
    const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{6,20}$/;

    // Check mail
    if (!EMAIL_REGEX.test(email)) {
      errors.push("wrong email");
      inputsAreValid = false;
    }

    // Check date of birth
    if (!DATE_REGEX.test(dob)) {
      errors.push("wrong date of birth, please use DD/MM/YYYY format");
      inputsAreValid = false;
    }

    // Check password
    if (!PASSWORD_REGEX.test(password) && !PASSWORD_REGEX.test(passwordCheck)) {
      errors.push(
        "Invalid password: must be 6-20 characters long, include at least one lower case, one upper case, one digit, and no white space"
      );
      inputsAreValid = false;
    } else if (password !== passwordCheck) {
      errors.push("Passwords are different");
      inputsAreValid = false;
    }

    // checks all inputs
    if (inputsAreValid) {
      let newUser = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        dob: dob,
        password: password,
      };

      fetch(`http://${BACK_END_ADDRESS}/users/signup`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(newUser),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.result) {
            // enregistrer le user dans reducer
            dispatch(
              login({
                firstName: data.user.firstName,
                lastName: data.user.lastName,
                token: data.user.token,
              })
            );
            // reset les inputs et errormessages
            setFirstName(null);
            setLastName(null);
            setEmail(null);
            setDob(null);
            setPassword(null);
            setPasswordCheck(null);
            setErrorMessages([]);

            // navigate vers PhoneScreen
            navigation.navigate("Phone");
            return;
          } else {
            setErrorMessages([data.error]);
            return;
          }
        });
    } else {
      setErrorMessages(errors);
    }
  };

  // Fonction pour le Date Picker
  const handleDatePicker = (el) => {
    if (el.type == "set") {
      setDate(new Date(el.nativeEvent.timestamp));
      setOpen(false);
      setDob(formatDate(new Date(el.nativeEvent.timestamp)));
      return;
    } else {
      setOpen(false);
      return;
    }
  };

  const errorMessagesData = errorMessages.map((errorText, i) => {
    return (
      <StyledRegularText key={i} title={errorText} style={{ color: "red" }} />
    );
  });

  return (
    <KeyboardAvoidingView style={styles.container}>
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.header}>
          <StyledBoldText style={styles.title} title="Create an account" />
          <StyledBoldText style={styles.welcome} title="Welcome" />
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
            <TouchableOpacity onPress={() => setOpen(true)}>
              <FontAwesome5 name="calendar-alt" size={25} />
            </TouchableOpacity>
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
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              onChangeText={(value) => setPasswordCheck(value)}
              value={passwordCheck}
              secureTextEntry={true}
            />
            <FontAwesome5 name="lock" size={25} />
          </View>
          <View style={styles.errorsContainer}>{errorMessagesData}</View>
        </View>
        <View style={styles.bottom}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleContinue()}
          >
            <StyledBoldText title="CONTINUE" style={styles.buttonText} />
          </TouchableOpacity>
        </View>
        {open && (
          <DateTimePicker
            value={date}
            onChange={handleDatePicker}
            onTouchCancel={() => setOpen(false)}
            mode="date"
          />
        )}
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
    width: "90%",
    textAlign: "center",
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
  },
  inputContainer: {
    flexDirection: "row",
    width: "90%",
    borderBottomWidth: 1,
    height: "10%",
    minHeight: 40,
    margin: 3,
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    width: "90%",
    height: "100%",
  },
  errorsContainer: {
    flexDirection: "column",
    width: "90%",
    minHeight: 20,
    marginTop: 10,
    justifyContent: "space-between",
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
