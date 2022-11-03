import {
  Button,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TopBar from "../components/TopBar";
import ProfilModal from "../components/ProfilModal";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { MaterialCommunityIcons } from "@expo/vector-icons";
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
import user from "../reducers/user";
import { usePreventRemoveContext } from "@react-navigation/native";

export default function TripScreen({ navigation, route: { params } }) {
  //ETATS
  const [modalVisible, setModalVisible] = useState(false);
  const [distance, setDistance] = useState();
  const [time, setTime] = useState();
  const [canJoin, setCanJoin] = useState(undefined); // état utilisé pour vérifier si l'utilisateur est déjà sur le trip ou non
  const [message, setMessage] = useState(null);
  const [passengers, setPassengers] = useState(undefined);
  const [leader, setLeader] = useState(undefined);
  const [pressedJoin, setPressedJoin] = useState(0);

  const BACK_END_ADDRESS = "https://flyways-backend.vercel.app";

  const user = useSelector((state) => state.user.value);

  // affichage de la distance en km ou en m
  let dist;
  if (distance >= 1) {
    // si la distance to destination est sup ou égale à 1 km, affiche la dist en km
    dist = `${distance.toFixed(2)} km`;
  } else {
    // si la distance est en dessous de 1 km, affiche la dist en m
    dist = `${Math.round(distance * 1000)} m`;
  }

  // useEffect pour afficher les passagers sous la map
  useEffect(() => {
    setPassengers(
      params.tripData.passengers.map((passenger, i) => {
        return (
          <View key={i}>
            <TouchableOpacity style={styles.passenger} onPress={() => {
              navigation.navigate("Profile", {userToken: passenger.passengerToken})
            }}>
              <Image
                source={{ uri: passenger.profilePicture }}
                style={styles.profilePicture}
                resizeMode="contain"
              />
              <StyledRegularText
                title={passenger.firstName + " " + passenger.lastName[0] + "."}
                style={styles.userText}
              />
            </TouchableOpacity>
          </View>
        );
      })
    );
  }, []);

  // useEffect qui enlève le bouton "join trip" si l'utilisateur est sur le trip ou Leader
  useEffect(() => {
    setLeader(false);
    if (params.tripData.passengers[0].passengerToken === user.token) {
      setLeader(true);
    }
    // vérifie si l'utilisateur fait déjà partie du trip en comparant les tokens
    setCanJoin(true);
    for (let passenger of params.tripData.passengers) {
      // s'il fait déjà partie du trip, cache le bouton "join trip
      passenger.passengerToken === user.token ? setCanJoin(false) : null;
    }
  }, [{ navigation }]);

  useEffect(() => {
    setCanJoin(canJoin);
  }, [canJoin]);

  // mapRef pour le map
  const mapRef = useRef(null);

  //constants de position pour aficher parcour test
  const departureLocation = {
    // où le taxi s'arrête
    latitude: params.tripData.arrivalCoords.latitude,
    longitude: params.tripData.arrivalCoords.longitude,
  };
  // title de marker-depart
  const departureAddress = params.tripData.arrivalCoords.description;

  const arrivalLocation = {
    // où la personne veut arriver
    latitude: user.actualDestination.latitude,
    longitude: user.actualDestination.longitude,
  };

  const dateJS = new Date(params.tripData.date); // créée une date JS
  // formate la date pour qu'elle soit lisible
  const formattedDate = `${dateJS.getDate()}/${
    dateJS.getMonth() + 1
  }/${dateJS.getFullYear()}`;
  // formate l'heure pour qu'elle soit lisible
  const formattedTime = `${dateJS.getHours()}:${dateJS.getMinutes()}`;

  // title de marker-arrival
  const arrivalAddress = user.actualDestination.description;

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const placesLeft =
    params.tripData.capacity - params.tripData.passengers.length; // calcul des places restantes sur le trip

  const handleJoinRequest = () => {
    // envoie le trip Id et le passenger token au backend pour ajouter le passager au trip en db
    setCanJoin(false); // hides the "join trip" button
    setPressedJoin(pressedJoin + 1);
    const joinRequest = {
      tripId: params.tripData.tripId,
      passengerToken: user.token,
    };

    fetch(`${BACK_END_ADDRESS}/trips/addPassenger`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(joinRequest),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.result) {
          setMessage("Trip joined");

          // ajout de l'utilisateur au trip, niveau frontend
          const currentUser = (
            <View key={passengers.length + 1} style={styles.passengerIcon}>
              <TouchableOpacity style={styles.passenger}>
                <Image
                  source={{ uri: user.profilePicture }}
                  style={styles.profilePicture}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <StyledRegularText
                title={user.firstName + " " + user.lastName[0] + "."}
                style={styles.userText}
              />
            </View>
          );
          setPassengers((passengers) => [...passengers, currentUser]);
        } else {
        }
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopBar toggleModal={toggleModal} />
      <View style={styles.card}>
        <StyledRegularText title="Drop-off point :" style={styles.titlecard} />
        <StyledRegularText
          title={params.tripData.arrivalCoords.description}
          style={styles.descripcard}
        />
        <StyledRegularText title="Destination :" style={styles.titlecard2} />
        <StyledRegularText
          title={user.actualDestination.description}
          style={styles.descripcard}
        />
        <Text style={styles.datatrip}>
          {dist} from destination - {Math.ceil(time)} min
        </Text>
        <View style={styles.datecard}>
          <Text style={styles.date}>{formattedDate}</Text>
          <Text style={styles.time}>{formattedTime}</Text>
        </View>
      </View>
      <View style={styles.divtextmap}></View>
      <Text>{message}</Text>
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
        // propietes optionales à activer/desactiver
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
          }}
        />
      </MapView>
      <View style={styles.passengersBar}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {passengers}
          {/* {!leader && placesLeft > 0 && canJoin ? ( */}
          {canJoin && pressedJoin === 0 ? (
            <View style={styles.buttonCard}>
              <TouchableOpacity
                style={styles.Button}
                onPress={() => {
                  handleJoinRequest();
                  setCanJoin(false); // hides the "join trip" button
                }}
              >
                <FontAwesome
                  name="plus"
                  size={25}
                  style={{ color: "#FFFFFF", marginTop: 10 }}
                />
                <Text style={{ fontSize: 8, color: "#FFFFFF" }}>Join trip</Text>
              </TouchableOpacity>
              <Text style={{ fontSize: 12, color: "#000000" }}>
                {placesLeft} seats avail.
              </Text>
            </View>
          ) : (
            <></>
          )}
        </ScrollView>
        {
          leader && (
            <View style={styles.buttonCard}>
              <TouchableOpacity
                style={styles.Button}
                onPress={() => {
                  navigation.navigate("Review", {
                    tripData: params.tripData,
                  });
                  console.log(params.tripData);
                }}
              >
                <FontAwesome
                  name="flag-checkered"
                  size={25}
                  style={{ color: "#FFFFFF", marginTop: 10 }}
                />
                <Text style={{ fontSize: 8, color: "#FFFFFF" }}></Text>
              </TouchableOpacity>
              <Text style={{ fontSize: 12, color: "#000000" }}></Text>
            </View>
          )
          // : (
          //   <View style={styles.buttonCard}>
          //     <TouchableOpacity
          //       style={styles.requestButton}
          //       onPress={() => {
          //         navigation.navigate("Review", { tripData: params.tripData });
          //         console.log(params.tripData);
          //       }}
          //     >
          //       <FontAwesome
          //         name="flag-checkered"
          //         size={25}
          //         style={{ color: "#FFFFFF", marginTop: 10 }}
          //       />
          //       <Text style={{ fontSize: 8, color: "#FFFFFF" }}></Text>
          //     </TouchableOpacity>
          //     <Text style={{ fontSize: 12, color: "#000000" }}></Text>
          //   </View>
          // )
        }
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
  titlecard2: {
    flex: 0.2,
    justifyContent: "flex-start",
    marginLeft: 40,
    marginTop: 10,
    color: "#1B9756",
    fontSize: 20,
  },
  datecard: {
    flex: 0.1,
    position: "absolute",
    marginLeft: 240,
    marginTop: 30,
  },
  date: {
    color: "#1B9756",
  },
  time: {
    marginLeft: 20,
    color: "#1B9756",
  },
  descripcard: {
    flex: 0.1,
    justifyContent: "flex-start",
    marginTop: 2,
    marginLeft: 40,
    color: "#1B9756",
  },
  datatrip: {
    flex: 0.15,
    justifyContent: "flex-start",
    marginTop: 5,
    marginLeft: 40,
    color: "#1EA85F",
    opacity: 0.7,
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
  passenger: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: 80,
  },
  profilePicture: {
    height: 64,
    width: 64,
    borderRadius: 50,
    marginBottom: 5,
  },
  userText: {
    color: "#000000",
  },
  Button: {
    height: 64,
    width: 64,
    borderRadius: 50,
    backgroundColor: "#1B9756",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    marginLeft: 10,
    marginRight: 10,
  },
});
