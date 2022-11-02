import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TopBar from "../components/TopBar";

// Import des fonts
import StyledRegularText from "../components/StyledBoldText";
import StyledBoldText from "../components/StyledBoldText";

// Import icones
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

// Import du country picker
import CountryPicker from "react-native-country-picker-modal";
// import { CountryCode, Country } from './src/types'

// Import des icones drapeau
import CountryFlag from "react-native-country-flag";

const BACK_END_ADDRESS_LOCAL = "http://192.168.10.172:3000";

export default function EditLanguagesScreen({ navigation }) {
  const [flags, setFlags] = useState(null);
  // const [newLanguage, setNewLanguage] = useState(null);
  const [countryCode, setCountryCode] = useState(null);
  const [msg, setMsg] = useState(null);

  let newLanguage = null;

  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    fetch(`${BACK_END_ADDRESS_LOCAL}/users/languages/${user.token}`)
      .then((res) => res.json())
      .then((languages) => {
        // map un drapeau par langue parlée
        setFlags(
          languages.languagesSpoken.map((language, i) => {
            return (
              <CountryFlag
                key={i}
                isoCode={language}
                style={styles.flag}
                size={64}
              />
            );
          })
        );
      });
  }, [flags]); // refait le fetch à chaque fois qu'une langue est ajoutée/supprimée

  const handleSubmit = () => {
    // fetch(`${BACK_END_ADDRESS_LOCAL}/users/update/${user.token}`, {
    //   method: "PUT",
    //   headers: { "content-type": "application/json" },
    //   body: JSON.stringify({ gender }),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     if (data.result) {
    //       setMsg("User languages have been updated");
    //     }
    //   });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopBar></TopBar>
      <StyledRegularText title="Edit languages :" style={styles.text} />

      <CountryPicker
        countryCode={countryCode}
        withFlag
        onSelect={(country) => {
          language = country.cca2;
          fetch(`${BACK_END_ADDRESS_LOCAL}/users/addLanguage/${user.token}`, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({language}),
          })
            .then((res) => res.json())
            .then((data) => console.log(data));
        }}
      ></CountryPicker>

      <View style={styles.inputContainer}>
        <View style={styles.dateAndCalendar}></View>
      </View>

      {flags && <View>{flags}</View>}

      {msg && <Text>{msg}</Text>}

      {/* <TouchableOpacity onPress={() => handleSubmit()} style={styles.button}>
        <Text>Submit</Text>
      </TouchableOpacity> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
  },
  dateAndCalendar: {
    flexDirection: "row",
  },
  button: {
    width: "75%",
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(30, 168, 95, 0.5)",
  },

  // yes
  flag: {
    marginLeft: 2,
    borderRadius: 4,
  },
});
