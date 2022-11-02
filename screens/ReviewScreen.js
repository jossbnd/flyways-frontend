/* A FAIRE */
// à la place des infos en dur, mettre params.trips.passengers
/* ******************** */

import React from "react";

// Import Composants
import TopBar from "../components/TopBar";
import ProfilModal from "../components/ProfilModal";
import Review from "../components/Review";

// Import des fonts
import StyledRegularText from "../components/StyledBoldText";
import StyledBoldText from "../components/StyledBoldText";

// Import balises
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

//Import hooks + redux
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// adresse déploiement
const BACK_END_ADDRESS = "https://flyways-backend.vercel.app/";

export default function ReviewScreen({ navigation, route: { params } }) {
  console.log(params);
  /****** STORE REDUX ******/
  const user = useSelector((state) => state.user.value);
  /* ******************** */
  /****** ETATS ******/
  // Etat pour déclencher la modale
  const [modalVisible, setModalVisible] = useState(false);
  // Etat qui est envoyé en props à l'enfant pour compter le nombre d'avis
  const [count, setCount] = useState(1);

  // Etat qui déclare un tableau vide pour les reviews
  const [passengers, setPassengers] = useState([
    {
      passengerToken: "i_n2UJ95rEk4NIUQTYB3TDAUj345-EXM",
      firstName: "Keyser",
      lastName: "Soze",
      profilePicture: "profile-picture.jpg",
    },
    {
      passengerToken: "tPGNf15pQLPAb_byqpj8Qoi9MsLfMb1V",
      firstName: "John",
      lastName: "S",
      profilePicture: "profile-picture.jpg",
    },
    {
      passengerToken: "UoswI6AR19Q6vO5sbn4YvbWzj5uqlNn3",
      firstName: "John",
      lastName: "S",
      profilePicture: "profile-picture.jpg",
    },
  ]);
  /* ******************** */

  /****** FONCTIONS ******/
  // Fonction pour déclencher le menu modal
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleFinish = () => {
    console.log(passengersData);
    if (count === passengersData.length) {
      navigation.navigate("My Profile");
    }
  };

  const addCount = () => {
    setCount(count + 1);
  };

  /* ******************** */

  /****** VARIABLES ******/
  let passengersData = passengers.map((passenger, i) => {
    if (user.token === passenger.passengerToken) {
      return;
    } else {
      return (
        <Review key={i} {...passenger} isDone={false} addCount={addCount} />
      );
    }
  });

  /* ******************** */

  /* RETURN de la fonction REVIEWSCREEN */
  return (
    <SafeAreaView style={styles.container}>
      <TopBar toggleModal={toggleModal} />
      <View style={styles.topContainer}>
        <StyledBoldText
          title="Did you enjoy your trip?"
          style={{ fontSize: 40 }}
        />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.reviewContainer}>{passengersData}</View>
        <View style={styles.finishView}>
          <TouchableOpacity
            onPress={() => handleFinish()}
            style={styles.finishButton}
          >
            <StyledBoldText title="FINISH" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <ProfilModal modalVisible={modalVisible} toggleModal={toggleModal} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
  },
  scrollContainer: {
    width: "85%",
    paddingBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  topContainer: {
    height: "20%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    padding: 10,
  },
  reviewContainer: {
    marginTop: 20,
  },
  finishView: {
    width: 200,
  },
  finishButton: {
    borderRadius: 20,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#1EA85F",
    padding: 10,
  },
});
