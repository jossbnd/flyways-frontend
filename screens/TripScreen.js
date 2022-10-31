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

//import redux
import { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

// import de mapview et du provider Google necessaire pour le fonctionnement de map
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

import { GOOGLE_API_KEY } from "../environmentVar";

// Import des fonts
import StyledRegularText from "../components/StyledBoldText";
import StyledBoldText from "../components/StyledBoldText";

export default function TripScreen({ navigation }) {
  //ETATS
  const [modalVisible, setModalVisible] = useState(false);
  const [distance, setDistance] = useState();

  const user = useSelector((state) => state.user.value);

  // mapRef pour le map
  const mapRef = useRef(null);

  //constantes de position pour aficher parcour test
  const departureLocation = {
    latitude: 48.85871119999999,
    longitude: 2.3536298,
  };
  const arrivalLocation = {
    latitude: 48.8629287,
    longitude: 2.364912,
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopBar toggleModal={toggleModal} />
      <View style={styles.card}>
        <StyledRegularText title="Name of trip" style={styles.titlecard} />
        <StyledRegularText title="Destination:" style={styles.descripcard} />
        <Text style={styles.descripcard}>2 rue du Temple 75004 ,Paris</Text>
        <Text style={styles.distance}>
          {distance * 1000} m from destination
        </Text>
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
            console.log(data.distance, data.duration);
          }}
        />
      </MapView>
      <View style={styles.passengersBar}>
        <View style={styles.passengerIcon}>
          <TouchableOpacity style={styles.passenger}>
            <Image
              source={user.profilePicture}
              style={styles.profilePicture}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <StyledRegularText
            title={user.firstName + " " + user.lastName}
            style={styles.userText}
          />
        </View>
        <View style={styles.buttonIcon}>
          <TouchableOpacity style={styles.addButton}>
            <FontAwesome
              name="plus"
              size={25}
              style={{ color: "#FFFFFF", marginTop: 10 }}
            />
            <Text style={{ fontSize: 8, color: "#FFFFFF" }}>Send request</Text>
          </TouchableOpacity>

          <Text style={{ fontSize: 12, color: "#000000" }}>2 seat avail.</Text>
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
  descripcard: {
    flex: 0.2,
    justifyContent: "flex-start",
    marginLeft: 40,
    color: "#1B9756",
  },
  distance: {
    flex: 0.2,
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
    borderWidth: 10,
  },
  profilePicture: {
    height: 50,
    width: 50,
    resizeMode: "contain",
  },
  userText: {
    color: "#000000",
  },
  buttonIcon: {
    height: "100%",
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  addButton: {
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
