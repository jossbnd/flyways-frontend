import {
  Button,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Touchable
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TopBar from "../components/TopBar";
import { useState } from "react";

// Import des fonts
import StyledRegularText from "../components/StyledBoldText";
import StyledBoldText from "../components/StyledBoldText";

// Import du composant
import SearchResultTrip from "../components/SearchResultTrip";
import { faBlackTie } from "@fortawesome/free-brands-svg-icons";

const BACK_END_ADDRESS = "https://flyways-backend.vercel.app/";
const BACK_END_ADDRESS_LOCAL = "http://192.168.1.64:3000";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function SearchResultScreen({ navigation, route: { params } }) {
  const [searchResult, setSearchResult] = useState(null);

  const handleCreateNewTrip = () => {
    console.log("create a new trip")
  }

  const handleFetch = () => {
    console.log(params.searchDataComplete);

    fetch(`${BACK_END_ADDRESS}/trips/search`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(params.searchDataComplete),
    })
      .then((res) => res.json())
      .then((foundTrips) => {
        if (foundTrips.result) {
          // si des trips ont été trouvés, affiche les trips trouvés
          setSearchResult(
            foundTrips.sortedResult.map((trip, i) => {
              return (
                <SearchResultTrip key={i} {...trip} /> // map les données du trip
              );
            })
          );
        } else {
          setSearchResult(() => {
            // si aucun trip n'a été trouvé, propose de créer un nouveau trip
            return (
              <>
                <StyledRegularText title="No results found, would you like to create a new trip ?" />
                <TouchableOpacity onPress={() => handleCreateNewTrip()}>
                  <Text>Create a new trip</Text>
                </TouchableOpacity>
              </>
            );
          });
        }
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopBar></TopBar>
      <ScrollView style={styles.resultContainer}>
        {searchResult}
        <Button title="FETCH" onPress={() => handleFetch()}></Button>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  resultContainer: {
    width: windowWidth * 0.98,
    height: windowHeight * 0.85,
    top: 16,
  },
});
