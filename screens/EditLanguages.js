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
import ProfilModal from "../components/ProfilModal";

import { BACK_END_ADDRESS } from "../environmentVar";

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

export default function EditLanguagesScreen({ navigation }) {
  const [flags, setFlags] = useState(null);
  const [countryCode, setCountryCode] = useState(null);

  // état et fonction pour gérer le fonctionnement de la modale profile
  const [modalVisible, setModalVisible] = useState(false);

  // fonction pour rendre la modale profile visible
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    fetch(`${BACK_END_ADDRESS}/users/languages/${user.token}`)
      .then((res) => res.json())
      .then((languages) => {
        // map un drapeau par langue parlée
        setFlags(
          languages.languagesSpoken.map((language, i) => {
            return (
              <TouchableOpacity
                key={i}
                style={styles.flag}
                onPress={() => {
                  fetch(
                    `${BACK_END_ADDRESS}/users/removeLanguage/${user.token}`,
                    {
                      method: "PUT",
                      headers: { "content-type": "application/json" },
                      body: JSON.stringify({ language }),
                    }
                  )
                    .then((res) => res.json())
                    .then((data) => {
                      console.log(data);
                    });
                }}
              >
                <CountryFlag
                  key={i}
                  isoCode={language}
                  style={styles.flag}
                  size={64}
                />
              </TouchableOpacity>
            );
          })
        );
      });
  }, [flags]); // refait le fetch à chaque fois qu'une langue est ajoutée/supprimée

  return (
    <SafeAreaView style={styles.container}>
      <TopBar toggleModal={toggleModal}></TopBar>

      {/* AA */}
      <CountryPicker
      preferredCountries={['FR', 'GB', 'KR', 'CL']}
      withAlphaFilter={false}
        containerButtonStyle={styles.button}
        withFilter={true}
        countryCode={countryCode}
        withFlag
        onSelect={(country) => {
          let language = country.cca2;
          fetch(`${BACK_END_ADDRESS}/users/addLanguage/${user.token}`, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ language }),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
            });
        }}
      ></CountryPicker>

      <View style={styles.inputContainer}>
        <View style={styles.dateAndCalendar}></View>
      </View>

      {flags && <View>{flags}</View>}
      <ProfilModal modalVisible={modalVisible} toggleModal={toggleModal} />
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
  flag: {
    margin: 4,
    borderRadius: 4,
  },
  button: {
    width: 200,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(30, 168, 95, 0.5)",
    marginTop: 20,
    marginBottom: 20,
  },
});
