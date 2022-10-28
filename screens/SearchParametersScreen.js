import {
  KeyboardAvoidingView,
  Button,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TopBar from "../components/TopBar";
import { useState } from "react";

// Import des fonts
import StyledRegularText from "../components/StyledBoldText";
import StyledBoldText from "../components/StyledBoldText";

// Import du composant
import SearchResultTrip from "../components/SearchResultTrip";

// Import de react-slider pour la distance max
import ReactSlider from "react-slider";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function SearchResultScreen({ navigation, route: { params } }) {
  //   const [minDate, setMinDate] = useState(null);
  //   const [maxDate, setMaxDate] = useState(null);
  //   const [maxDist, setMaxDist] = useState(null);

  const [minDate, setMinDate] = useState("20/01/2010 10:00");
  const [maxDate, setMaxDate] = useState("20/01/2050 10:00");
  const [maxDist, setMaxDist] = useState(40000);

  const [searchDataComplete, setSearchDataComplete] = useState(null);

  const handleSearch = () => {
    // FIXME: have to press multiple times on button to set the data
    console.log(params.searchData);

    // ajoute les paramètres de date et de distance au searchData de l'écran précédent
    setSearchDataComplete((searchDataComplete) => ({
      ...params.searchData, // prend les données de la page précédente (coordonnées GPS)
      ...searchDataComplete, // ajoute les données de cette page (date et distance max)
      minDate,
      maxDate,
      maxDist,
    }));

    console.log(searchDataComplete);
    navigation.navigate("SearchResult", { searchDataComplete }); // envoie l'objet complet (coords + date/distance)
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <TopBar></TopBar>
      <StyledRegularText title="Search parameters" />

      <View style={styles.parameters}>
        <View style={styles.dateAndTime}>
          <StyledRegularText title="Date and time of departure" />
          <TextInput // expects: 20/01/2020 10:50
            style={styles.input}
            placeholder="DD/MM/YYYY HH:mm"
            onChangeText={(value) => {
              setMinDate(value);
              setSearchDataComplete((searchDataComplete) => ({
                ...params.searchData,
                ...searchDataComplete,
                minDate,
              }));
            }}
            value={minDate}
          />
        </View>

        <View style={styles.dateAndTime}>
          <StyledRegularText title="Maximum waiting time" />
          <TextInput // expects: 20/01/2020 10:50
            style={styles.input}
            placeholder="DD/MM/YYYY HH:mm"
            onChangeText={(value) => {
              setMaxDate(value);
              setSearchDataComplete((searchDataComplete) => ({
                ...params.searchData,
                ...searchDataComplete,
                maxDate,
              }));
            }}
            value={maxDate}
          />
        </View>

        <View style={styles.dateAndTime}>
          <StyledRegularText title="Maximum drop-off distance" />
          <TextInput // expects: number in km
            style={styles.input}
            placeholder="0.5"
            onChangeText={(value) => {
              setMaxDist(value);
              setSearchDataComplete((searchDataComplete) => ({
                ...params.searchData,
                ...searchDataComplete,
                maxDist,
              }))
            }}
            value={maxDist}
          />
        </View>
      </View>

      <TouchableOpacity
        style={styles.searchButton}
        onPress={() => handleSearch()}
      >
        <Text>Search</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  parameters: {
    display: "flex",
    height: windowHeight * 0.7,
    marginVertical: 20,
    flexDirection: "column",
    justifyContent: "space-around",
  },
  searchButton: {
    backgroundColor: "#1B9756",
    padding: 8,
    borderRadius: 6,
  },
});
