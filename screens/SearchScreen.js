/* Librairie google maps pour react native */
// https://www.npmjs.com/package/react-native-google-places-autocomplete
/* Librairie react native pour les maps directions */
// https://www.npmjs.com/package/react-native-maps-directions

// Pour utiliser l API: creation d un compte Google Cloud et activation de la librairie SDK android

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
  Text,
} from "react-native";
import { useRef, useState, useEffect } from "react";
import * as Location from "expo-location";

// Import du Slider
import Slider from "@react-native-community/slider";

// Import pour gérer le date picker
import DateTimePicker from "@react-native-community/datetimepicker";
import formatDate from "../modules/formatDate";

// Import icones
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

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

// adresse vercel back end
const BACK_END_ADDRESS = "https://flyways-backend.vercel.app/";

// FONCTION principale SEARCHSCREEN
export default function SearchScreen({ navigation }) {
  /****** ETATS ******/

  // états pour stocker les valeurs des sliders
  const [rangeTime, setRangeTime] = useState(0);
  const [rangeDistance, setRangeDistance] = useState(0);

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

  // set la position au chargement de la page
  // état et fonction pour gérer le fonctionnement du bouton continue
  const [continueButton, setContinueButton] = useState(false);

  // Etats pour date et time picker
  // const [date, setDate] = useState(new Date());
  // const [openDate, setOpenDate] = useState(false);
  // const [openTime, setOpenTime] = useState(false);
  // const [departureDate, setDepartureDate] = useState(null);
  // const [departureTime, setDepartureTime] = useState(null);

  /* **************************************************** */
  // etats et fonction du date and time picker
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date"); // permet de changer entre le mode "date" et "time"
  const [show, setShow] = useState(false); // montre ou cache le date/time picker
  const [selectedDateJS, setSelectedDateJS] = useState(null);
  const [formattedDate, setFormattedDate] = useState(null); // date formatée en string exploitable par la database
  const [formattedTime, setFormattedTime] = useState(null); // time formaté en string exploitable par la database
  const [formattedTimeAndDate, setFormattedTimeAndDate] = useState(null);
  const onChange = (event, selectedDate) => {
    setShow(Platform.OS === "ios");
    setDate(selectedDate);

    // date et heure créés en utilisant le date picker
    setSelectedDateJS(new Date(selectedDate));

    // formate l'heure en string pour l'afficher sur la page ("20/01/2000 09:50")
    setFormattedDate(
      `${selectedDateJS.getDate()}/${
        selectedDateJS.getMonth() + 1
      }/${selectedDateJS.getFullYear()}`
    );
    setFormattedTime(
      `${selectedDateJS.getHours()}:${selectedDateJS.getMinutes()}`
    );

    // formate l'heure en string pour l'afficher sur la page ("20/01/2000 09:50")
    setFormattedTimeAndDate(
      `${selectedDateJS.getDate()}/${
        selectedDateJS.getMonth() + 1
      }/${selectedDateJS.getFullYear()} ${selectedDateJS.getHours()}:${selectedDateJS.getMinutes()}`
    );
  };

  const showMode = (currentMode) => {
    // permet de set le mode du date/time picker à afficher (date ou time)
    setShow(true);
    setMode(currentMode);
  };

  /* **************************************************** */

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

  // fonction appelée quand l'utilisateur appuie sur le bouton "Search"
  const handleSearch = () => {
    // assigne les paramètres de recherche (coordonnées, etc) à un objet, qui est ensuite passé à l'écran suivant pour le fetch
    setSearchData((searchData) => ({
      ...searchData,
      maxDist: rangeDistance / 1000,
      minDate: formattedTimeAndDate,
    }));

    console.log("resultat de la recherche:", searchData);
    console.log(formattedTimeAndDate);
    // console.log(rangeDistance);
    // console.log(rangeTime);

    // navigation.navigate("SearchParameters", { searchData });
  };

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

  // fonction qui permet d'animer l'animated view qui s'affiche au moment de l'appui sur le bouton Continue
  const fadeIn = () => {
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

  // fonction pour récupérer la valeur de l'input destination
  const getAddress = () => {
    // console.log(placesRef.current?.getAddressText());
  };

  // Fonction pour le Date Picker
  /*   const handleDatePicker = (el) => {
    if (el.type == "set") {
      setDate(new Date(el.nativeEvent.timestamp));
      setOpenDate(false);
      setDepartureDate(formatDate(new Date(el.nativeEvent.timestamp)));
      console.log();
      return;
    } else {
      setOpenDate(false);
      return;
    }
  }; */

  // Fonction pour le Date Picker
  /*   const handleTimePicker = (el) => {
    if (el.type == "set") {
      setDate(new Date(el.nativeEvent.timestamp));
      setOpenTime(false);
      setDepartureDate(formatDate(new Date(el.nativeEvent.timestamp)));
      console.log();
      return;
    } else {
      setOpenTime(false);
      return;
    }
  }; */

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

  /*    utilisation de placesRef sur les GooglePlaceAutocomplete, permet d'utiliser la fonction getAddress
  qui récupère la valeur des inputs */
  const placesRef = useRef();

  /* ********************************************************************** */

  /* RETURN de la fonction SEARCHSCREEN */
  return (
    <SafeAreaView style={styles.container}>
      <TopBar
        toggleModal={toggleModal}
        style={styles.topBar}
        navigation={navigation}
      ></TopBar>

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
          ref={placesRef}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            getAddress();
            const position = {
              latitude: details?.geometry.location.lat,
              longitude: details?.geometry.location.lng,
            };
            setDepartureLocation({
              ...position,
              description: data.structured_formatting.secondary_text,
            });
            // console.log("coordones position depart", position);
            moveTo(position);
          }}
          query={{
            key: GOOGLE_API_KEY,
            language: "en",
          }}
          renderRightButton={() =>
            placesRef.current?.getAddressText() ? (
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => {
                  placesRef.current?.setAddressText("");
                }}
              >
                <AntDesign name="closecircleo" size={15} color="#000000" />
              </TouchableOpacity>
            ) : null
          }
        />
      </View>
      <View style={styles.destinationContainer}>
        <GooglePlacesAutocomplete
          label="Destination"
          placeholder="To"
          fetchDetails={true}
          ref={placesRef}
          onPress={(data, details = null) => {
            getAddress();
            // 'details' is provided when fetchDetails = true
            // TODO: remove the unnecessary (position, setArrivalLocation)
            const position = {
              latitude: details?.geometry.location.lat,
              longitude: details?.geometry.location.lng,
            };
            setArrivalLocation({
              ...position,
              description: data.structured_formatting.secondary_text,
            });
            // console.log("coordones position arrival", position);
            moveTo(position);
            handleContinueButton();

            setSearchData((searchData) => ({
              ...searchData,
              departureCoordsLat: departureLocation.latitude,
              departureCoordsLong: departureLocation.longitude,
              arrivalCoordsLat: details?.geometry.location.lat,
              arrivalCoordsLong: details?.geometry.location.lng,
            }));
          }}
          query={{
            key: GOOGLE_API_KEY,
            language: "en",
          }}
          renderRightButton={() =>
            placesRef.current?.getAddressText() ? (
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => {
                  placesRef.current?.setAddressText("");
                }}
              >
                <AntDesign name="closecircleo" size={15} color="#000000" />
              </TouchableOpacity>
            ) : null
          }
        />
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
          {/*           <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Departure Date"
              onChangeText={(value) => setDepartureDate(value)}
              value={departureDate}
            />
            <TouchableOpacity onPress={() => setOpenDate(true)}>
              <FontAwesome5 name="calendar-alt" size={25} />
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Departure Time"
              onChangeText={(value) => setDepartureTime(value)}
              value={departureTime}
            />
            <TouchableOpacity onPress={() => setOpenTime(true)}>
              <FontAwesome5 name="clock" size={25} />
            </TouchableOpacity>
          </View> */}

          <View style={styles.datePicker}>
            <StyledRegularText title="Pick your date: " />
            <TouchableOpacity
              style={styles.button}
              onPress={() => showMode("date")}
            >
              <FontAwesome5 name="calendar-alt" size={25} />
            </TouchableOpacity>
          </View>

          {formattedDate && (
            <View>
              <Text>Departure : {formattedDate}</Text>
            </View>
          )}

          <View style={styles.timePicker}>
            <StyledRegularText title="Pick your time: " />
            <TouchableOpacity
              style={styles.button}
              onPress={() => showMode("time")}
            >
              <FontAwesome5 name="clock" size={25} />
            </TouchableOpacity>
          </View>

          {formattedTime && (
            <View>
              <Text>Time : {formattedTime}</Text>
            </View>
          )}

          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
          <View style={styles.timeSlider}>
            <StyledRegularText title={`Max Waiting Time: ${rangeTime} mn`} />
            <Slider
              style={{ width: 200, height: 40 }}
              step={5}
              onValueChange={(value) => setRangeTime(value)}
              thumbTintColor="rgba(30, 168, 95, 1)"
              minimumValue={0}
              maximumValue={60}
            />
          </View>
          <View style={styles.distanceSlider}>
            <StyledRegularText
              title={`Max drop-off distance from Home: ${rangeDistance} meters`}
            />
            <Slider
              style={{ width: 200, height: 40 }}
              step={100}
              onValueChange={(value) => setRangeDistance(value)}
              thumbTintColor="rgba(30, 168, 95, 1)"
              minimumValue={0}
              maximumValue={1000}
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              handleSearch();
              // console.log("max time", rangeTime);
              // console.log("max distance", rangeDistance);
            }}
          >
            <StyledBoldText title="CONTINUE ?" style={styles.buttonText} />
          </TouchableOpacity>
        </Animated.View>
      )}
      {/*       {openDate && (
        <DateTimePicker
          value={date}
          onChange={handleDatePicker}
          // onChange={console.log}
          onTouchCancel={() => setOpenDate(false)}
          mode="date"
        />
      )}
      {openTime && (
        <DateTimePicker
          value={date}
          onChange={handleTimePicker}
          // onChange={console.log}
          onTouchCancel={() => setOpenTime(false)}
          mode="time"
        />
      )} */}
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
    marginTop: 15,
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
  inputContainer: {
    flexDirection: "row",
    width: "90%",
    borderBottomWidth: 1,
    height: "10%",
    minHeight: 40,
    margin: 3,
    justifyContent: "space-between",
    alignItems: "center",
  },
  datePicker: {
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  timePicker: {
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  timeSlider: {
    alignItems: "center",
    justifyContent: "center",
  },
  distanceSlider: {
    alignItems: "center",
    justifyContent: "center",
  },
});
