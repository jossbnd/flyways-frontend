import { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

import TopBar from "../components/TopBar";

// Import pour gérer le date picker
import DateTimePicker from "@react-native-community/datetimepicker";
import formatDate from "../modules/formatDate";

// Import des éléments nécessaires pour le google autocomplete
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapViewDirections from "react-native-maps-directions";

import { GOOGLE_API_KEY, BACK_END_ADDRESS } from "../environmentVar";

// Import icones
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AntDesign from "react-native-vector-icons/AntDesign";

// Import dropdown list (pour le nombre de passagers)
import SelectList from "react-native-dropdown-select-list";

// Import des fonts
import StyledRegularText from "../components/StyledRegularText";
import StyledBoldText from "../components/StyledBoldText";

// Import Store Redux
import { useDispatch } from "react-redux";
import { login } from "../reducers/user";

// TODO: REMOVE THE UNNECESSARY STUFF LEFT FROM THE MAP

export default function CreateTripScreen({ navigation }) {
    // FIXME: time displaying 9:8 for 09:08

  const user = useSelector((state) => state.user.value); // nécessaire pour lire le token de l'utilisateur

  // etats pour stocker les coords du départ et de l'arrivée
  const [departureLocation, setDepartureLocation] = useState(null);
  const [arrivalLocation, setArrivalLocation] = useState(null);

  // etats et fonction du date and time picker
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date"); // permet de changer entre le mode "date" et "time"
  const [show, setShow] = useState(false); // montre ou cache le date/time picker
  const [selectedDateJS, setSelectedDateJS] = useState(null);
  const [formattedDate, setFormattedDate] = useState(null); // date formatée en string exploitable par la database

  const onChange = (event, selectedDate) => {
    setShow(Platform.OS === "ios");
    setDate(selectedDate);

    // date et heure créés en utilisant le date picker
    setSelectedDateJS(new Date(selectedDate));

    // formate l'heure en string pour l'afficher sur la page ("20/01/2000 09:50")
    setFormattedDate(
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

  // variables dropdown list (pour choisir la capacité de passagers)
  const [capacity, setCapacity] = useState(null);
  const [selected, setSelected] = useState("");
  const data = [
    { key: "1", value: 1 },
    { key: "2", value: 2 },
    { key: "3", value: 3 },
    { key: "4", value: 4 },
    { key: "5", value: 5 },
    { key: "6", value: 6 },
    { key: "7", value: 7 },
    { key: "8", value: 8 },
    { key: "9", value: 9 },
  ];

  // Etat pour messages d'erreur
  const [errorMessages, setErrorMessages] = useState([]);

  // Redux dispatch
  const dispatch = useDispatch();

  // fonction pour crééer le nouveau trip
  const handleCreateNewTrip = () => {
    // objet envoyé au backend
    const createTripData = {
        passengerToken: user.token,
        departureCoordsLat: departureLocation.latitude,
        departureCoordsLong: departureLocation.longitude,
        departureDescription: departureLocation.description,
        arrivalCoordsLat: arrivalLocation.latitude,
        arrivalCoordsLong: arrivalLocation.longitude,
        arrivalDescription: arrivalLocation.description,
        date: selectedDateJS,
        capacity,
    }

    fetch(`${BACK_END_ADDRESS}/trips/create`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(createTripData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
            // TODO: navigate to trip page
            console.log("new trip created")
        }
      });
  };

  const errorMessagesData = errorMessages.map((errorText, i) => {
    return (
      <StyledRegularText key={i} title={errorText} style={{ color: "red" }} />
    );
  });

  return (
    <KeyboardAvoidingView style={styles.container}>
      <SafeAreaView style={styles.safeContainer}>
        <TopBar />
        <View style={styles.header}>
          <StyledBoldText style={styles.title} title="Create a new trip" />
        </View>
        <View style={styles.inputsContainer}>
          {/* Google autocomplete (for departure and destination) */}
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
                  description: data.description,
                });
                // moveTo(position);
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
                // TODO: remove the unnecessary (position, setArrivalLocation)
                const position = {
                  latitude: details?.geometry.location.lat,
                  longitude: details?.geometry.location.lng,
                };
                setArrivalLocation({
                  ...position,
                  description: data.description,
                });
                // moveTo(position);
                // handleCreateNewTripButton();
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

          <View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => showMode("date")}
            >
              <Text>Date of departure</Text>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => showMode("time")}
            >
              <Text>Time of departure</Text>
            </TouchableOpacity>
          </View>

          {formattedDate && (
            <View>
              <Text>Departure : {formattedDate}</Text>
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

          <View style={styles.inputContainer}>
            <StyledRegularText title="Passenger capacity (including yourself) " />
            <SelectList
              setSelected={setSelected}
              data={data}
              style={styles.capacityList}
              dropdownStyles={{ height: 2000, width: 60 }}
              onSelect={() => {
                setCapacity(data[selected - 1].value); // -1 parce que le tableau "data" est indexé sur 0
              }}
            />
          </View>

          <View style={styles.errorsContainer}>{errorMessagesData}</View>
        </View>
        <View style={styles.bottom}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleCreateNewTrip()}
          >
            <StyledBoldText
              title="Create a new trip"
              style={styles.buttonText}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  header: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  title: {
    fontSize: 20,
    width: "90%",
    textAlign: "center",
  },
  inputsContainer: {
    flex: 5,
    width: "100%",
    alignItems: "center",
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
  input: {
    width: "90%",
    height: "100%",
  },
  errorsContainer: {
    flexDirection: "column",
    width: "90%",
    minHeight: 20,
    marginTop: 10,
    justifyContent: "space-between",
  },
  bottom: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  button: {
    width: "90%",
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(30, 168, 95, 0.5)",
  },
  buttonText: {
    fontSize: 14,
  },

  //   YES
  searchContainer: {
    // position: "absolute",
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "#FFFFFF",
    // backgroundColor: "rgba(30, 168, 95, 0.5)",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    borderRadius: 8,
    // top: 90,
    // zIndex: 1,
  },
  destinationContainer: {
    // position: "absolute",
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "#FFFFFF",
    // backgroundColor: "rgba(30, 168, 95, 0.5)",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    borderRadius: 8,
    // top: 90,
    // zIndex: 1,
  },
  capacityList: {
    height: 1000,
    width: 1000,
    backgroundColor: "red",
  },
});
