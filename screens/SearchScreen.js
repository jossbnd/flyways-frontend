import { SafeAreaView } from "react-native-safe-area-context";
import TopBar from "../components/TopBar";
import { StyleSheet, Dimensions, View } from "react-native";
import { useRef, useState } from "react";

/* A faire: ajoutter bouton dans l input pour supprimer la recherche au lieu
de suprrimer une par une les lettres */

/*  COMMENTAIRES A SUPPRIMER*/
// a faire aujourd'hui:
// faire des états pour récupérer les valeurs de details
// créer une variable, qui est égal à un objet, que l'on va envoyer aux pages suivantes
/* ********************************************* */

/* Librairie google maps pour react native */
// https://www.npmjs.com/package/react-native-google-places-autocomplete

// Pour utiliser l API: creation d un compte Google Cloud et activation de la librairie SDK android

// import de mapview et du provider Google necessaire pour le fonctionnement de map
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import GOOGLE_API_KEY from "../environmentVar";

// Import des fonts
import StyledRegularText from "../components/StyledBoldText";
import StyledBoldText from "../components/StyledBoldText";
import { login } from "../reducers/user";

// variables pour afficher la map a son initialisation sur un point geographique par defaut
const { width, height } = Dimensions.get("window");

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
  // creation d etats pour recuperer les valeurs des "details" des inputs qui contiennent les valeurs necessaires
  // pour faire la recherche: latitute et longitude
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  // fonction pour faire deplacer la carte au moment de la selection d une destination
  const moveTo = async (position) => {
    //
    const camera = await mapRef.current?.getCamera();
    console.log("map reference:", camera);
    if (camera) {
      camera.center = position;
      mapRef.current?.animateCamera(camera, { duration: 1000 });
    }
  };

  // fonction onPlaceSelected pour sauvegarder les informations de localisation
  const onPlaceSelected = (details) => {};
  const mapRef = useRef(null);

  return (
    <SafeAreaView style={styles.container}>
      <TopBar style={styles.topBar}></TopBar>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_POSITION}
      />
      <View style={styles.searchContainer}>
        <GooglePlacesAutocomplete
          label="Origin"
          placeholder="From"
          fetchDetails={true}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            // setOrigin(details);
            const position = {
              latitude: details?.geometry.location.lat,
              longitude: details?.geometry.location.lng,
            };
            // console.log("coordonnees", details.geometry);
            moveTo(position);
            // console.log("etat:", origin);
          }}
          query={{
            key: GOOGLE_API_KEY,
            language: "en",
          }}
        />
      </View>
      <View style={styles.destinationContainer}>
        <GooglePlacesAutocomplete
          label="Destination"
          placeholder="To"
          fetchDetails={true}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            // setDestination(details);
            // console.log("coordonnees", details.geometry);
            // console.log("resultat", data);
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
    top: 90,
    zIndex: 1,
  },
  destinationContainer: {
    position: "absolute",
    width: "90%",
    backgroundColor: "#FFFFFF",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    borderRadius: 8,
    top: 150,
  },
});
