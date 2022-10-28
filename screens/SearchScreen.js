import { SafeAreaView } from "react-native-safe-area-context";
import TopBar from "../components/TopBar";
import { StyleSheet, Dimensions, View, TouchableOpacity } from "react-native";
import { useRef, useState, useEffect } from "react";
import * as Location from "expo-location";

/* A faire: ajoutter bouton dans l input pour supprimer la recherche au lieu
de suprrimer une par une les lettres */

/*  COMMENTAIRES A SUPPRIMER*/
// a faire aujourd'hui:
// faire des états pour récupérer les valeurs de details
// créer une variable, qui est égal à un objet, que l'on va envoyer aux pages suivantes
/* ********************************************* */

/* Librairie google maps pour react native */
// https://www.npmjs.com/package/react-native-google-places-autocomplete
/* Librairie react native pour les maps directions */
// https://www.npmjs.com/package/react-native-maps-directions

// Pour utiliser l API: creation d un compte Google Cloud et activation de la librairie SDK android

// import de mapview et du provider Google necessaire pour le fonctionnement de map
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapViewDirections from "react-native-maps-directions";

import { GOOGLE_API_KEY } from "../environmentVar";

// Import des fonts
import StyledRegularText from "../components/StyledBoldText";
import StyledBoldText from "../components/StyledBoldText";
import { Marker } from "react-native-maps";

// Import Icones
import AntDesign from "react-native-vector-icons/AntDesign";

// variables pour afficher la map a son initialisation sur un point geographique par defaut
const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 1;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const INITIAL_POSITION = {
  latitude: 0,
  longitude: 0,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};

export default function SearchScreen({ navigation }) {
  const [departureLocation, setDepartureLocation] = useState(null);
  const [arrivalLocation, setArrivalLocation] = useState(null);

  // search data, null par défaut
  const [departureCoordsLat, setDepartureCoordsLat] = useState(null);
  const [departureCoordsLong, setDepartureCoordsLong] = useState(null);
  const [arrivalCoordsLat, setArrivalCoordsLat] = useState(null);
  const [arrivalCoordsLong, setArrivalCoordsLong] = useState(null);

  // l'objet qui est envoyé à la page suivante (SearchParametersScreen)
  const [searchData, setSearchData] = useState(null);

  // etats de position
  const [currentPosition, setCurrentPosition] = useState(null);

  // creation d etats pour recuperer les valeurs des "details" des inputs qui contiennent les valeurs necessaires
  // pour faire la recherche: latitute et longitude
  const [origin, setOrigin] = useState({});

  // etats des inputs
  const [inputOne, setInputOne] = useState("");

  //useRef pour la reference de MapView
  const mapRef = useRef(null);

  // fonction appelée quand l'utilisateur appuie sur le bouton "Search"
  const handleSearch = () => {
    // set all data (coords, etc) to searchData, then send it to SR screen

    // assigne les paramètres de recherche (coordonnées, etc) à un objet, qui est ensuite passé à l'écran suivant pour le fetch
    // FIXME: have to press multiple times for data to be set
    setDepartureCoordsLat(40);
    setDepartureCoordsLong(50);
    setArrivalCoordsLat(42.008);
    setArrivalCoordsLong(52.004);
    // setMinDate("28/10/2022 15:00");
    // setMaxDate("28/10/2028 16:00");
    // setMaxDist(10);

    setSearchData(searchData => ({
      ...searchData,
      departureCoordsLat,
      departureCoordsLong,
      arrivalCoordsLat,
      arrivalCoordsLong,
      // minDate,
      // maxDate,
      // maxDist,
    }));

    console.log(searchData);
    
    navigation.navigate("SearchParameters", { searchData });
  };

  // set la position au chargement de la page
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        Location.watchPositionAsync({ distanceInterval: 10 }, (location) => {
          const coords = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          };
          setCurrentPosition(coords);
          moveTo(coords);
        });
      }
    })();
  }, []);

  // fonction pour faire deplacer la carte au moment de la selection d une destination
  const moveTo = async (position) => {
    // la variable camera recoit la valeur de mapRef
    const camera = await mapRef.current?.getCamera();
    console.log(camera);
    // une condition doit etre faite pour verifier la valeur de camera
    if (camera) {
      // camera.center est egal a la position recue en argument
      camera.center = position;
      mapRef.current?.animateCamera(camera, { duration: 1000 });
      setOrigin(camera.center);
    }
  };

  /* RETURN de la fonction SEARCHSCREEN */
  return (
    <SafeAreaView style={styles.container}>
      <TopBar style={styles.topBar}></TopBar>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_POSITION}
      >
        {departureLocation && <Marker coordinate={departureLocation} />}
        {arrivalLocation && <Marker coordinate={arrivalLocation} />}
        {departureLocation && arrivalLocation && (
          <MapViewDirections
            origin={departureLocation}
            destination={arrivalLocation}
            apikey={GOOGLE_API_KEY}
            mode="DRIVING"
            strokeWidth={5}
            strokeColor="#1EA85F"
            timePrecision="now"
            onReady={(data) => {
              console.log(data.distance, data.duration);
            }}
          />
        )}
      </MapView>
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
            setDepartureLocation({
              ...position,
              description: data.structured_formatting.secondary_text,
            });
            moveTo(position);
          }}
          query={{
            key: GOOGLE_API_KEY,
            language: "en",
          }}
        />
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => {
            setInputOne("");
          }}
        >
          <AntDesign name="closecircleo" size={15} color="#000000" />
        </TouchableOpacity>
      </View>
      <View style={styles.destinationContainer}>
        <GooglePlacesAutocomplete
          label="Destination"
          placeholder="To"
          fetchDetails={true}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            const position = {
              latitude: details?.geometry.location.lat,
              longitude: details?.geometry.location.lng,
            };
            setArrivalLocation({
              ...position,
              description: data.structured_formatting.secondary_text,
            });
            moveTo(position);
          }}
          query={{
            key: GOOGLE_API_KEY,
            language: "en",
          }}
        />
        <TouchableOpacity style={styles.closeButton}>
          <AntDesign name="closecircleo" size={15} color="#000000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSearch()}>
          <StyledRegularText title="Search" />
        </TouchableOpacity>
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
    flexDirection: "row",
    alignItems: "center",
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
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    borderRadius: 8,
    top: 150,
  },
  closeButton: {
    marginRight: 8,
  },
});
