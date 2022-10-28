import {
  Button,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
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
const BACK_END_ADDRESS_LOCAL = "http://192.168.1.20:3000";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function SearchResultScreen({ navigation, route: { params } }) {
  // const placeHolderData = {
  //   result: true,
  //   sortedResult: [
  //     {
  //       tripFoundToken: "vxKhLCtBY-j-W291QB4oHR3WEDX0tZgM",
  //       date: "2025-10-05T08:30:00.000Z",
  //       passengers: [
  //         {
  //           isLeader: true,
  //           passengerToken: "UoswI6AR19Q6vO5sbn4YvbWzj5uqlNn3",
  //           firstName: "Jean",
  //           lastName: "Valjean",
  //           profilePicture:
  //             "https://i.pinimg.com/564x/79/1c/ee/791cee75e44b3314a5445a456a4920ba.jpg",
  //           rating: 4,
  //           languagesSpoken: ["jp", "fr", "it"],
  //           _id: "635a93b892810c68e64265cb",
  //         },
  //       ],
  //       passengersNumber: 1,
  //       capacity: 5,
  //       arrivalCoords: {
  //         latitude: 140,
  //         longitude: 35,
  //         description: "yes",
  //         _id: "635a93b892810c68e64265cd",
  //       },
  //       distToDestination: 1.215616,
  //     },
  //     {
  //       tripFoundToken: "IM9Uc5eTQPd8c1WJ25aHZlpGHbZP9VH0",
  //       date: "2030-10-05T08:50:00.000Z",
  //       passengers: [
  //         {
  //           isLeader: true,
  //           passengerToken: "UoswI6AR19Q6vO5sbn4YvbWzj5uqlNn3",
  //           firstName: "Font",
  //           lastName: "Weesome",
  //           profilePicture:
  //             "https://i.kym-cdn.com/photos/images/original/001/809/674/f4a.jpg",
  //           rating: 4,
  //           languagesSpoken: ["de", "jp"],
  //           _id: "635a93bd92810c68e64265d3",
  //         },
  //       ],
  //       passengersNumber: 1,
  //       capacity: 3,
  //       arrivalCoords: {
  //         latitude: 140,
  //         longitude: 35,
  //         description: "yes",
  //         _id: "635a93bd92810c68e64265d5",
  //       },
  //       distToDestination: 0.433217501146,
  //     },
  //   ],
  // };

  const [searchResult, setSearchResult] = useState(null);

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
          setSearchResult(
            foundTrips.sortedResult.map((trip, i) => {
              return (
                <SearchResultTrip key={i} {...trip} /> // map les données de passengers[0] (le leader du trip)
              );
            })
          );
        } else {
          // TODO: display msg if no trip has been found
          setSearchResult(() => {
            return (
              <StyledRegularText title="No result found, please revise your search parameters" />
            );
          });
        }
      });
  };

  // const searchResult = placeHolderData.sortedResult.map((trip, i) => {
  //   return (
  //     <SearchResultTrip key={i} {...trip} /> // map les données de passengers[0] (le leader du trip)
  //   );
  // });

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
