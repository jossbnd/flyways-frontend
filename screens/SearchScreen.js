import { SafeAreaView } from "react-native-safe-area-context";
import TopBar from "../components/TopBar";
import { StyleSheet, Dimensions, View } from "react-native";

/* Librairie google maps pour react native */
// https://www.npmjs.com/package/react-native-google-places-autocomplete

// Pour utiliser l API: creation d un compte Google Cloud et activation de la librairie SDK android

// import de mapview et du provider Google necessaire pour le fonctionnement de map
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

// Import des fonts
import StyledRegularText from "../components/StyledBoldText";
import StyledBoldText from "../components/StyledBoldText";

// variables pour afficher la map a son initialisation sur un point geographique par defaut
const { width, height } = Dimensions.get("window");

const GOOGLE_API_KEY = "AIzaSyDzcCPu-F8IaF_BC0wETn5efFrq701mx68";

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 1;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const INITIAL_POSITION = {
  latitude: 48.87,
  longitude: 2.33,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};

export default function SearchScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <TopBar style={styles.topBar}></TopBar>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_POSITION}
      />
      <View style={styles.searchContainer}>
        <GooglePlacesAutocomplete
          placeholder="Search"
          fetchDetails={true}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(data, details);
          }}
          query={{
            key: GOOGLE_API_KEY,
            language: "en",
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    justifyContent: "space-between",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  searchContainer: {
    position: "absolute",
    width: "90%",
    backgroundColor: "#FFFFFF",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    borderRadius: 8,
    marginTop: 90,
  },
});
