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

export default function ReviewScreen({}) {
  /****** STORE REDUX ******/
  const user = useSelector((state) => state.user.value);
  /* ******************** */
  /****** ETATS ******/
  // Etat pour déclencher la modale
  const [modalVisible, setModalVisible] = useState(false);

  /* A FAIRE */
  // à la place des infos en dur, mettre params.trips.passengers
  // afficher dernière lettre du nom de famille
  // déplacer étoiles en haut à droite
  // input à la place de bouton pour leave a comment
  // faire disparaître les views avec les avis une fois l'avis donné
  /* ******************** */

  // Etat qui déclare un tableau vide pour les reviews
  const [passengersData, setPassengersData] = useState([
    {
      passengerToken: "i_n2UJ95rEk4NIUQTYB3TDAUj345-EXM",
      firstName: "John",
      lastName: "S",
      profilePicture: "profile-picture.jpg",
    },
    {
      passengerToken: "i_n2UJ95rEk4NIUQTYB3TDAUj345-EXM",
      firstName: "John",
      lastName: "S",
      profilePicture: "profile-picture.jpg",
    },
    {
      passengerToken: "i_n2UJ95rEk4NIUQTYB3TDAUj345-EXM",
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

  /****** VARIABLES ******/
  let reviewsTable = passengersData.map((passengers, i) => {
    return <Review key={i} {...passengers} />;
  });

  /* ******************** */

  // A l'initialisation, récupérer le dernier trip terminé par le User et afficher les participants
  /* USE EFFECT pour noter les participants */

  return (
    <SafeAreaView style={styles.container}>
      <TopBar toggleModal={toggleModal} />
      <ScrollView contentContainerStyle={styles.reviewsContainer}>
        <View style={styles.topContainer}>
          <StyledBoldText
            title="Did you enjoy your trip?"
            style={{ fontSize: 40 }}
          />
        </View>
        <View>{reviewsTable}</View>
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
  reviewsContainer: {
    width: "85%",
  },
  topContainer: {
    height: "20%",
    borderColor: "#1EA85F",
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
  },
});
