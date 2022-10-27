import { Button, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TopBar from "../components/TopBar";

// Import des fonts
import StyledRegularText from "../components/StyledBoldText";
import StyledBoldText from "../components/StyledBoldText";

// Import du composant
import SearchResultTrip from "../components/SearchResultTrip";

export default function SearchResultScreen({ navigation }) {
    const placeHolderData = 
    {
      "result": true,
      "sortedResult": [
        {
          "tripFoundToken": "vxKhLCtBY-j-W291QB4oHR3WEDX0tZgM",
          "date": "2025-10-05T08:30:00.000Z",
          "passengers": [
            {
              "isLeader": true,
              "passengerToken": "UoswI6AR19Q6vO5sbn4YvbWzj5uqlNn3",
              "firstName": "Jean",
              "lastName": "Valjean",
              "profilePicture": "https://i.pinimg.com/564x/79/1c/ee/791cee75e44b3314a5445a456a4920ba.jpg",
              "rating": 4,
              "languagesSpoken": ["jp", "fr", "it"],
              "_id": "635a93b892810c68e64265cb"
            }
          ],
          "passengersNumber": 1,
          "capacity": 5,
          "arrivalCoords": {
            "latitude": 140,
            "longitude": 35,
            "description": "yes",
            "_id": "635a93b892810c68e64265cd"
          },
          "distToDestination": 1.215616
        },
        {
          "tripFoundToken": "IM9Uc5eTQPd8c1WJ25aHZlpGHbZP9VH0",
          "date": "2030-10-05T08:50:00.000Z",
          "passengers": [
            {
              "isLeader": true,
              "passengerToken": "UoswI6AR19Q6vO5sbn4YvbWzj5uqlNn3",
              "firstName": "Font",
              "lastName": "Weesome",
              "profilePicture": "https://i.kym-cdn.com/photos/images/original/001/809/674/f4a.jpg",
              "rating": 4,
              "languagesSpoken": ["de", "jp"],
              "_id": "635a93bd92810c68e64265d3"
            }
          ],
          "passengersNumber": 1,
          "capacity": 3,
          "arrivalCoords": {
            "latitude": 140,
            "longitude": 35,
            "description": "yes",
            "_id": "635a93bd92810c68e64265d5"
          },
          "distToDestination": 0.433217501146
        }
      ]
    }
    // {
    //   "result": true,
    //   "sortedResult": [
    //     {
    //       "tripFoundToken": "KQQoMCFLuOxRPLjsAZXhbVMnenOOaRxO",
    //       "date": "2028-10-05T08:50:00.000Z",
    //       "passengers": [
    //         {
    //           "isLeader": true,
    //           "passengerToken": "UoswI6AR19Q6vO5sbn4YvbWzj5uqlNn3",
    //           "firstName": "Chiri",
    //           "lastName": "Kitsu",
    //           "rating": 4,
    //           "languagesSpoken": ["de", "jp"],
    //           "_id": "635a880af244dd1d60b418a0"
    //         }
    //       ],
    //       "passengersNumber": 1,
    //       "capacity": 3,
    //       "arrivalCoords": {
    //         "latitude": 140,
    //         "longitude": 35,
    //         "description": "yes",
    //         "_id": "635a880af244dd1d60b418a2"
    //       },
    //       "distToDestination": 7037.433217501146
    //     },
    //     {
    //       "tripFoundToken": "slBSbf5wHieWS619zNkAHTMXJeAP0vf0",
    //       "date": "2025-10-05T08:50:00.000Z",
    //       "passengers": [
    //         {
    //           "isLeader": true,
    //           "passengerToken": "UoswI6AR19Q6vO5sbn4YvbWzj5uqlNn3",
    //           "firstName": "Chiri",
    //           "lastName": "Kitsu",
    //           "rating": 4.5,
    //           "languagesSpoken": ["jp", "gb", "it"],
    //           // "languagesSpoken": [
    //           //   {
    //           //     "0": "jp",
    //           //     "1": "de",
    //           //     "_id": "635a8814f244dd1d60b418a5"
    //           //   },
    //           //   {
    //           //     "0": "j",
    //           //     "1": "p",
    //           //     "_id": "635a8814f244dd1d60b418a6"
    //           //   }
    //           // ],
    //           "_id": "635a8814f244dd1d60b418a8"
    //         }
    //       ],
    //       "passengersNumber": 1,
    //       "capacity": 5,
    //       "arrivalCoords": {
    //         "latitude": 140,
    //         "longitude": 35,
    //         "description": "yes",
    //         "_id": "635a8814f244dd1d60b418aa"
    //       },
    //       "distToDestination": 7037.433217501146
    //     }
    //   ]
    // }

    const searchResult = placeHolderData.sortedResult.map((trip, i) => {
        return (
            <SearchResultTrip key={i} {...trip} /> // passe les données de passengers[0] (le leader du trip)
        )
    })

  return (
    <SafeAreaView style={styles.container}>
      <TopBar></TopBar>
      <StyledRegularText title="Search results" />
      {searchResult}
      {/* <SearchResultTrip></SearchResultTrip> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
