import { SafeAreaView } from "react-native-safe-area-context";
// Import Composants
import TopBar from "../components/TopBar";
import ProfilModal from "../components/ProfilModal";
import {
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
  Animated,
} from "react-native";
import { useRef, useState, useEffect } from "react";
import * as Location from "expo-location";

/* A faire: ajoutter bouton dans l input pour supprimer la recherche au lieu
de suprrimer une par une les lettres */

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

// FONCTION principale SEARCHSCREEN
export default function SearchScreen({ navigation }) {
  /****** ETATS ******/
  /* états pour stocker la valeur distance (distance entre 2 points sur la carte)
  et la valeur duration (durée de trajet entre 2 points sur la carte) */
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);

  // etats pour stocker la valeur de départ et d'arrivée
  const [departureLocation, setDepartureLocation] = useState(null);
  const [arrivalLocation, setArrivalLocation] = useState(null);

  // l'objet qui est envoyé à la page suivante (SearchParametersScreen)
  const [searchData, setSearchData] = useState(null);

  // etats de position
  // état pour stocker la valeur de la position en temps réel de l'utilisateur
  const [currentPosition, setCurrentPosition] = useState(null);

  // creation d etats pour recuperer les valeurs des "details" des inputs qui contiennent les valeurs necessaires
  // pour faire la recherche: latitute et longitude
  const [origin, setOrigin] = useState({});

  // états pour stocker la value des inputs
  const [inputOne, setInputOne] = useState("");

  // état et fonction pour gérer le fonctionnement de la modale profile
  const [modalVisible, setModalVisible] = useState(false);

  // fonction appelée quand l'utilisateur appuie sur le bouton "Search"
  const handleSearch = () => {
    // assigne les paramètres de recherche (coordonnées, etc) à un objet, qui est ensuite passé à l'écran suivant pour le fetch
    setSearchData((searchData) => ({
      ...searchData,
      departureCoordsLat: departureLocation.latitude,
      departureCoordsLong: departureLocation.longitude,
      arrivalCoordsLat: arrivalLocation.latitude,
      arrivalCoordsLong: arrivalLocation.longitude,
    }));

    console.log(searchData);

    navigation.navigate("SearchParameters", { searchData });
  };

  // set la position au chargement de la page
  // état et fonction pour gérer le fonctionnement du bouton continue
  const [continueButton, setContinueButton] = useState(false);

  const [animatedViewVisible, setAnimatedViewVisible] = useState(false);

  /* ********************************************************************** */

  /****** USE EFFECT ******/
  // useEffect d'initialisation qui demande l'autorisation à l'utilisateur de trouver sa position
  // la fonction moveTo permet de changer la vue sur la position de l'utilisateur
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

  /* ********************************************************************** */

  /****** FONCTIONS ******/

  // fonction qui permet de changer la vue de la caméra
  const moveTo = async (position) => {
    // la variable camera recoit la valeur de mapRef
    const camera = await mapRef.current?.getCamera();
    // une condition doit etre faite pour verifier la valeur de camera
    if (camera) {
      // camera.center est egal a la position recue en argument
      camera.center = position;
      mapRef.current?.animateCamera(camera, { duration: 1000 });
      setOrigin(camera.center);
    }
  };

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1500,
      useNativeDriver: false,
    }).start();
  };

  /* fonction permettant de calculer la moyenne latitude + longitude entre 2 points
  et déplacer la caméra basée sur cette moyenne */
  const handleTripView = () => {
    mapRef.current?.fitToCoordinates([departureLocation, arrivalLocation], {
      edgePadding,
    });
  };

  // fonction qui permet de stocker la valeur de distance et duration
  const viewDistanceDuration = (data) => {
    setDistance(data.distance);
    setDuration(data.duration);
  };

  // fonction pour rendre la modale profile visible
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  // fonction pour afficher le bouton continue
  const handleContinueButton = () => {
    setContinueButton(true);
  };

  // fonction pour activer l'animation du formulaire après l'appui sur le bouton continue
  const animatedView = () => {
    setAnimatedViewVisible(true);
  };

  /* ********************************************************************** */

  /* VARIABLES */
  // variables qui mettent en place du padding sur la caméra lorsque l'utilisateur recherche un trajet
  const edgePaddingValue = 30;
  const edgePadding = {
    top: edgePaddingValue,
    right: edgePaddingValue,
    bottom: edgePaddingValue,
    left: edgePaddingValue,
  };

  // variable qui stocke la nouvelle valeur pour l'animated View
  const fadeAnim = useRef(new Animated.Value(-500)).current;

  // useRef pour la reference de MapView
  const mapRef = useRef(null);

  /* ********************************************************************** */

  /* RETURN de la fonction SEARCHSCREEN */
  return (
    <SafeAreaView style={styles.container}>
      <TopBar toggleModal={toggleModal} style={styles.topBar}></TopBar>

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
              handleTripView();
              viewDistanceDuration(data);
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
            handleContinueButton();
          }}
          query={{
            key: GOOGLE_API_KEY,
            language: "en",
          }}
        />
        <TouchableOpacity style={styles.closeButton}>
          <AntDesign name="closecircleo" size={15} color="#000000" />
        </TouchableOpacity>
      </View>
      {distance && duration && (
        <View style={styles.viewDistanceDuration}>
          <StyledBoldText title={`Distance: ${distance.toFixed(2)} km`} />
          <StyledBoldText title={`Trip duration: ${Math.ceil(duration)} min`} />
        </View>
      )}
      {continueButton && (
        <View style={styles.continuePopover}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              animatedView();
              fadeIn();
            }}
          >
            <StyledBoldText title="CONTINUE ?" style={styles.buttonText} />
          </TouchableOpacity>
        </View>
      )}
      <ProfilModal modalVisible={modalVisible} toggleModal={toggleModal} />
      {animatedViewVisible && (
        <Animated.View
          style={[
            styles.fadingContainer,
            {
              // Bind opacity to animated value
              bottom: fadeAnim,
            },
          ]}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              handleSearch();
              // navigation.navigate("SearchResult");
            }}
          >
            <StyledBoldText title="CONTINUE ?" style={styles.buttonText} />
          </TouchableOpacity>
        </Animated.View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
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
  viewDistanceDuration: {
    position: "absolute",
    flexDirection: "row",
    width: "90%",
    height: "5%",
    top: 210,
    alignItems: "center",
    justifyContent: "space-evenly",
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  continuePopover: {
    top: 620,
    position: "absolute",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: "90%",
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(30, 168, 95, 1)",
  },
  buttonText: {
    fontSize: 14,
  },

  fadingContainer: {
    zIndex: 1,
    borderRadius: 10,
    height: "75%",
    width: "90%",
    position: "absolute",
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderWidth: 1,
    borderColor: "rgba(30, 168, 95, 1)",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  fadingText: {
    fontSize: 28,
    color: "black",
  },
});
