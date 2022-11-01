import {
  Button,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Touchable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TopBar from "../components/TopBar";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

// Import des fonts
import StyledRegularText from "../components/StyledBoldText";
import StyledBoldText from "../components/StyledBoldText";

// Import du composant
import SearchResultTrip from "../components/SearchResultTrip";
import { faBlackTie } from "@fortawesome/free-brands-svg-icons";

const BACK_END_ADDRESS = "https://flyways-backend.vercel.app";
// const BACK_END_ADDRESS = "http://192.168.1.20:3000";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function SearchResultScreen({ navigation, route: { params } }) {
  const user = useSelector((state) => state.user.value); // pour utiliser le token de l'utilisateur
  const [searchResult, setSearchResult] = useState(null);

  const handleCreateNewTrip = () => {
    navigation.navigate("CreateTrip");
  };

  const handleFetch = () => {
    console.log(params.searchDataComplete);
    fetch(`${BACK_END_ADDRESS}/trips/search`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(params.searchDataComplete),
    })
      .then((res) => res.json())
      .then((foundTrips) => {
        // NOTE: Pass this to the next screen
        // console.log(foundTrips);
        if (foundTrips.result) {
          // si des trips ont été trouvés, affiche les trips trouvés
          setSearchResult(
            foundTrips.sortedResult.map((trip, i) => {
              return (
                <SearchResultTrip
<<<<<<< HEAD
                  onPress={() => navigation.navigate("TripScreen")}
=======
>>>>>>> 48c0f68b1a8f93004c7e38ef658e623a546f229c
                  key={i}
                  {...trip}
                /> // map les données du trip
              );
            })
          );
        } else {
          setSearchResult(() => {
            // si aucun trip n'a été trouvé, propose de créer un nouveau trip
            return (
              <View style={styles.container}>
                <StyledRegularText
                  style={styles.noResults}
                  title="No results found, would you like to create a new trip ?"
                />
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleCreateNewTrip()}
                >
                  <Text>Create a new trip</Text>
                </TouchableOpacity>
              </View>
            );
          });
        }
      });
  };

  // useEffect qui charge les résultats automatiquement au chargement de la page
  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TopBar></TopBar>
      <ScrollView style={styles.resultContainer}>{searchResult}</ScrollView>
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
  noResults: {
    marginVertical: 20,
    marginHorizontal: 8,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    textAlign: "center",
  },
  button: {
    width: "90%",
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(30, 168, 95, 0.5)",
  },
});
