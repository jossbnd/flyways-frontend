import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Import composants upcoming trips
import ProfilModal from "../components/ProfilModal";
import TopBar from "../components/TopBar";
import UpcomingTrips from "../components/UpcomingTrips";

// Import des fonts
import StyledRegularText from "../components/StyledBoldText";
import StyledBoldText from "../components/StyledBoldText";

//Import hooks + redux
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateProfilePicture } from "../reducers/user";
import { useIsFocused } from "@react-navigation/native";

import { BACK_END_ADDRESS } from "../environmentVar";

// Import FontAwesome
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

// Format Date
import moment from "moment";

// Image Picker
import * as ImagePicker from "expo-image-picker";

// Cloudinary
import { CLOUDINARY_CLOUD_NAME } from "../environmentVar";

export default function HomeScreen({ navigation }) {
  // Etats
  const [upcomingTrips, setUpcomingTrips] = useState([]);
  const [test, setTest] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [averageRating, setAverageRating] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const isFocused = useIsFocused();

  // fonction pour déclencher le menu modal
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  // A l'initialisation de la page, fetch pour récupérer les infos du User
  useEffect(() => {
    fetch(`${BACK_END_ADDRESS}/users/info/${user.token}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          // Récupérer Profile Pic, averageRating, reviews
          setProfilePicture(data.user.profilePicture);
          setAverageRating(data.user.averageRating);
          setReviews(data.user.reviews);

          // mettre à jour le reducer avec la photo du user
          dispatch(updateProfilePicture(data.user.profilePicture));

          // Récupérer les trips, les stoker dans un états UpcomingTrips
          let tripsTemp = [];
          for (let trip of data.user.trips) {
            if (!trip.isDone) {
              let upcomingTrip = {
                dataTrip: trip,
                arrival:
                  trip.departureCoords.description.length < 15
                    ? trip.departureCoords.description
                    : trip.departureCoords.description.slice(0, 15) + "...",
                passengers: trip.passengers.length,
                capacity: trip.capacity,
                date: moment(trip.date).format("ll"),
                time: moment(trip.date).format("LT"),
              };
              tripsTemp.push(upcomingTrip);
            }
          }
          setUpcomingTrips(tripsTemp);
        }
      });
  }, [isFocused]);

  // Fonction pour déclencher le Image Picker, uploader dans cloudinary et récupérer l'url à enregistrer dans le reducer
  const pickImage = async () => {
    // Il n'y a pas besoin de demander à l'utilisateur pour ouvrir sa bibliothèque d'image
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    // Si l'utilisateur choisit une image:
    if (!result.cancelled) {
      setProfilePicture(result.uri);

      // save url in the reducer
      dispatch(updateProfilePicture(result.uri));

      const file = {
        uri: result.uri,
        name: "photo.jpg",
        type: "image/jpeg",
      };

      // formater la donnée à envoyer à Cloudinary
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "flyways");
      data.append("cloud_name", CLOUDINARY_CLOUD_NAME);

      // Post vers cloudinary
      fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "post",
          body: data,
        }
      )
        .then((res) => res.json())
        .then((cloudinaryData) => {
          fetch(`${BACK_END_ADDRESS}/users/update/${user.token}`, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ profilePicture: cloudinaryData.secure_url }),
          });
        });
    }
  };

  // Map pour afficher la liste des trips
  const upcomingTripsData = upcomingTrips.map((trip, i) => {
    return <UpcomingTrips key={i} {...trip} />;
  });

  const handleSearchScreen = () => {
    navigation.navigate("Search");
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopBar toggleModal={toggleModal} />

      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={
              profilePicture
                ? { uri: profilePicture }
                : require("../assets/profile-picture.jpg")
            }
            style={styles.profilePicture}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <StyledBoldText
          title={user.firstName + " " + user.lastName}
          style={styles.userName}
        />
        <View style={styles.reviewContainer}>
          <FontAwesome
            name="star"
            size={15}
            style={{ marginRight: 5, color: "#f1c40f" }}
          />
          <StyledRegularText
            title={`${averageRating ? averageRating : "-"} / 5`}
            style={styles.reviews}
          />

          <StyledRegularText title={` (`} style={styles.reviews} />
          <TouchableOpacity>
            <StyledRegularText
              title={`${reviews ? reviews.length : "no"} reviews`}
              style={[styles.reviews, styles.underline]}
            />
          </TouchableOpacity>
          <StyledRegularText title={`)`} style={styles.reviews} />
        </View>
        <TouchableOpacity
          style={styles.sarchButton}
          onPress={() => handleSearchScreen()}
        >
          <StyledRegularText
            title="Search for a Trip"
            style={styles.textButton}
          />
          <FontAwesome5 name="search" size={38} color="#ffffff" />
        </TouchableOpacity>
        <StyledRegularText
          title="Upcoming Trips"
          style={styles.upcomingTripsTitle}
        />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {upcomingTripsData.length ? (
            <View style={styles.upcomingTripsContainer}>
              {upcomingTripsData}
            </View>
          ) : (
            <StyledRegularText
              title="No upcoming trips yet"
              style={{ marginTop: 20, fontSize: 12, fontStyle: "italic" }}
            />
          )}
        </ScrollView>
      </View>
      <ProfilModal modalVisible={modalVisible} toggleModal={toggleModal} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  profileContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  profilePicture: {
    height: 150,
    width: 150,
    borderRadius: 100,
    marginTop: 50,
  },
  userName: {
    marginTop: 20,
    fontSize: 20,
  },
  reviewContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },
  reviews: {
    fontSize: 12,
  },
  sarchButton: {
    height: 77,
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#1EA85F",
    borderRadius: 5,
    paddingHorizontal: 30,
    marginTop: 30,
  },
  textButton: {
    color: "#ffffff",
    fontSize: 26,
  },
  upcomingTripsTitle: {
    fontSize: 22,
    marginTop: 30,
  },
  upcomingTripsContainer: {
    width: "90%",
    marginTop: 10,
  },
  scrollContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 150,
  },
  underline: {
    textDecorationLine: "underline",
  },
});
