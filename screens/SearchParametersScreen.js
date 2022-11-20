import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from "react-native";
import TopBar from "../components/TopBar";
import { useState } from "react";

// Import des fonts
import StyledRegularText from "../components/StyledBoldText";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function SearchResultScreen({ navigation, route: { params } }) {
  const [minDate, setMinDate] = useState("20/01/2010 10:00");
  const [maxDate, setMaxDate] = useState("20/01/2050 10:00");
  const [maxDist, setMaxDist] = useState(40000);

  const [searchDataComplete, setSearchDataComplete] = useState(null);

  const handleSearch = () => {
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
                ...params.searchData, // prend les données de la page précédente (coordonnées GPS)
                ...searchDataComplete, // ajoute minDate
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
                ...params.searchData, // prend les données de la page précédente (coordonnées GPS)
                ...searchDataComplete, // ajoute maxDate
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
                ...params.searchData, // prend les données de la page précédente (coordonnées GPS)
                ...searchDataComplete, // ajoute maxDist
                maxDist,
              }));
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
