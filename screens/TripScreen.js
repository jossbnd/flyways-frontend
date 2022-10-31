import {
  Button,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TopBar from "../components/TopBar";
import ProfilModal from "../components/ProfilModal";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Marker } from "react-native-maps";

//import redux
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

// import de mapview et du provider Google necessaire pour le fonctionnement de map
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

import { GOOGLE_API_KEY } from "../environmentVar";

// Import des fonts
import StyledRegularText from "../components/StyledBoldText";
import StyledBoldText from "../components/StyledBoldText";
import { useEffect } from "react";

export default function TripScreen({ navigation, route: { params } }) {
  //ETATS
  const [modalVisible, setModalVisible] = useState(false);
  const [distance, setDistance] = useState();
  const [time, setTime] = useState();
  const [request, setRequest] = useState(true);

  const user = useSelector((state) => state.user.value);

  let dist;
  if (distance >= 1) {
    // si la distance to destination est sup ou égale à 1 km, affiche la dist en km
    dist = `${distance.toFixed(2)} km`;
  } else {
    // si la distance est en dessous de 1 km, affiche la dist en m
    dist = `${Math.round(distance * 1000)} m`;
  }

  // mapRef pour le map
  const mapRef = useRef(null);

  //constants de position pour aficher parcour test
  const departureLocation = {
    // où le taxi s'arrête
    latitude: params.tripData.arrivalCoords.latitude,
    longitude: params.tripData.arrivalCoords.longitude,
  };
  // title de marker-depart
  const departureAddress = "2 Rue du Temple";

  const arrivalLocation = {
    // où la personne veut arriver
    latitude: 48.8629287,
    longitude: 2.364912,
  };

  // title de marker-arrival
  const arrivalAddress = "110 Rue de Turenne";

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  //const placesLeft = props.capacity - props.passengersNumber; // calcul des places restantes sur le trip

  const placesLeft = 2;

  useEffect(() => {
    if (placesLeft === 0) {
      setRequest(false);
    }
  }, []);

  const passengers = params.tripData.passengers.map((passenger, i) => {
    return (
      <View key={i} style={styles.passengerIcon}>
        <TouchableOpacity style={styles.passenger}>
          <Image
            // source={{ uri: passenger[i].profilePicture }}
            source={{ uri: passenger.profilePicture }}
            style={styles.profilePicture}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <StyledRegularText
          // title={passenger[i].firstName + " " + passenger[i].lastName}
          style={styles.userText}
        />
      </View>
    );
  });

  return (
    <SafeAreaView style={styles.container}>
      <TopBar toggleModal={toggleModal} />
      <View style={styles.card}>
        <StyledRegularText title="Destination" style={styles.titlecard} />
        {/* <StyledRegularText title={params.tripData.arrivalCoords.description} style={styles.descripcard} /> */}
        <View style={styles.datecard}>
          <Text style={styles.date}>{params.tripData.date}</Text>
          <Text style={styles.date}>10:30 am</Text>
        </View>
        {/* <Text style={styles.descripcard}>{params.tripData.arrivalCoords.description}</Text> */}
        <Text style={styles.datatrip}>{dist} from destination</Text>
        <Text style={styles.datatrip}>{Math.ceil(time)} min</Text>
      </View>
      <View style={styles.divtextmap}>
        <Text style={styles.titlemap}>Distance to your destination</Text>
      </View>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: arrivalLocation.latitude,
          longitude: arrivalLocation.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        // une fois le map generé,on fixe la vue aux coordones rendus dans le maps avec onLayout et le method fitToCoordinates
        onLayout={() =>
          mapRef.current.fitToCoordinates(
            [
              {
                latitude: arrivalLocation.latitude,
                longitude: arrivalLocation.longitude,
              },
              {
                latitude: departureLocation.latitude,
                longitude: departureLocation.longitude,
              },
            ],
            {
              //encadrement de vue
              edgePadding: { top: 30, right: 30, bottom: 30, left: 30 },
              animated: false,
            }
          )
        }
        // propietes optionales à activer/ desactiver
        // zoomEnabled={false}
        // scrollEnabled={false}
      >
        <Marker title={departureAddress} coordinate={departureLocation}>
          <View style={styles.marker}>
            <FontAwesome5 name="walking" size={30} />
          </View>
        </Marker>
        <Marker title={arrivalAddress} coordinate={arrivalLocation}>
          <View style={styles.marker}>
            <FontAwesome name="flag-checkered" size={30} />
          </View>
        </Marker>

        <MapViewDirections
          origin={departureLocation}
          destination={arrivalLocation}
          apikey={GOOGLE_API_KEY}
          mode="WALKING"
          strokeWidth={9}
          lineDashPattern={[60, 10]}
          strokeColor="#1EA85F"
          timePrecision="now"
          onReady={(data) => {
            setDistance(data.distance);
            setTime(data.duration);
            console.log(data.distance, data.duration);
          }}
        />
      </MapView>
      <View style={styles.passengersBar}>
        {passengers}

        <View style={styles.buttonCard}>
          <TouchableOpacity
            style={styles.requestButton}
            onPress={() => {
              console.log(params.tripData.date);
            }}
          >
            <FontAwesome
              name="plus"
              size={25}
              style={{ color: "#FFFFFF", marginTop: 10 }}
            />
            <Text style={{ fontSize: 8, color: "#FFFFFF" }}>Send request</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 12, color: "#000000" }}>
            {placesLeft} seat avail.
          </Text>
        </View>
      </View>
      <ProfilModal modalVisible={modalVisible} toggleModal={toggleModal} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-start",
  },
  card: {
    alignItems: "flex-start",
    height: "30%",
    width: "90%",
    marginTop: 20,
    marginBottom: 20,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    elevation: 4,
    shadowRadius: 4,
    borderRadius: 8,
    color: "#1B9756",
  },
  titlecard: {
    flex: 0.2,
    justifyContent: "flex-start",
    marginLeft: 40,
    marginTop: 40,
    color: "#1B9756",
    fontSize: 20,
  },
  datecard: {
    flex: 0.2,
    position: "absolute",
    marginLeft: 220,
    marginTop: 40,
  },
  date: {
    color: "#1B9756",
  },
  descripcard: {
    flex: 0.2,
    justifyContent: "flex-start",
    marginLeft: 40,
    color: "#1B9756",
  },
  datatrip: {
    flex: 0.1,
    justifyContent: "flex-start",
    marginLeft: 40,
    color: "#1EA85F",
    opacity: 0.5,
  },
  divtextmap: {
    width: "85%",
    alignItems: "flex-start",
  },
  map: {
    height: "38%",
    width: "100%",
    backgroundColor: "gray",
    alignItems: "center",
    justifyContent: "center",
  },
  passengersBar: {
    height: "16%",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  passengerIcon: {
    height: "100%",
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  passenger: {
    alignItems: "center",
    justifyContent: "center",
    height: 70,
    width: 70,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 35,
    borderColor: "#1EA85F",
    borderWidth: 2,
  },
  profilePicture: {
    height: 70,
    width: 70,
    borderRadius: 40,
    resizeMode: "contain",
  },
  userText: {
    color: "#000000",
  },
  buttonCard: {
    height: "100%",
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  requestButton: {
    height: 70,
    width: 70,
    borderRadius: 35,
    backgroundColor: "#1B9756",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
});
