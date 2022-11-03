import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TopBar from "../components/TopBar";
import ProfilModal from "../components/ProfilModal";

// Import des fonts
import StyledRegularText from "../components/StyledBoldText";
import StyledBoldText from "../components/StyledBoldText";

// Import des hooks
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";

import { BACK_END_ADDRESS } from "../environmentVar";

// Import FontAwesome
import FontAwesome from "react-native-vector-icons/FontAwesome";

// Import des icones drapeau
import CountryFlag from "react-native-country-flag";

// Import Moment to format date
import moment from "moment";

// Pour styliser la Scrollview Reviews
import { Dimensions } from "react-native";

export default function ProfileScreen({ navigation, route: { params } }) {
  // Récupérer le token de l'utilisateur - le fetch sera fait à partir de ça
  const { userToken } = params;

  // Définition des états
  const [profilePicture, setProfilePicture] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [averageRating, setAverageRating] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [languagesSpoken, setLanguagesSpoken] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  // Pour refetch quand on change de user
  const isFocused = useIsFocused();

  // Pour récupérer les infos du user en question
  useEffect(() => {
    fetch(`${BACK_END_ADDRESS}/users/info/${userToken}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          setProfilePicture(data.user.profilePicture);
          setFirstName(data.user.firstName);
          setLastName(data.user.lastName);
          setAverageRating(data.user.averageRating);
          setReviews(data.user.reviews);
          setLanguagesSpoken(data.user.languagesSpoken);
        }
      });
  }, [isFocused]);

  // Fonction pour déclencher le menu modal
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  // Constituer les composants drapeaux
  const languagesSpokenData = languagesSpoken.map((languageSpoken, i) => {
    return (
      <CountryFlag
        key={i}
        isoCode={languageSpoken}
        style={styles.flag}
        size={30}
      />
    );
  });

  // Constituer les composants reviews
  const reviewsData = reviews.map((review, i) => {
    return (
      <View key={i} style={styles.reviewDetailContainer}>
        <View style={styles.reviewHeader}>
          <FontAwesome
            name="star"
            size={15}
            style={{ marginRight: 5, color: "#f1c40f" }}
          />
          <StyledRegularText
            title={
              review.score + "/5 on " + moment(review.date).format("ll") + ":"
            }
          />
        </View>
        {review.text && (
          <StyledRegularText
            title={"'" + review.text + "'"}
            style={{ fontStyle: "italic" }}
          />
        )}
      </View>
    );
  });

  return (
    <SafeAreaView style={styles.container}>
      <TopBar toggleModal={toggleModal} />

      <View style={styles.profileContainer}>
        <View>
          <Image
            source={
              profilePicture
                ? { uri: profilePicture }
                : require("../assets/profile-picture.jpg")
            }
            style={styles.profilePicture}
            resizeMode="contain"
          />
        </View>
        <StyledBoldText
          title={firstName + " " + lastName}
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
        <View style={styles.languages}>
          <StyledRegularText
            title="Languages spoken:"
            style={[styles.languageTitles, styles.underline]}
          />
          <View style={styles.flagContainer}>
            {languagesSpokenData.length ? (
              languagesSpokenData
            ) : (
              <StyledRegularText
                title="no spoken languages specified"
                style={{ fontStyle: "italic", marginBottom: 20 }}
              />
            )}
          </View>
        </View>
      </View>
      <View style={styles.reviewsDetails}>
        <StyledRegularText title={firstName + "'s last reviews:"} />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {reviewsData.length ? (
            reviewsData
          ) : (
            <StyledRegularText
              title="No reviews"
              style={{ fontStyle: "italic" }}
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
    width: "100%",
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
  underline: {
    textDecorationLine: "underline",
  },
  languages: {
    height: 80,
    width: "90%",
    alignContent: "center",
    marginTop: 20,
    borderBottomWidth: 0.5,
  },
  languageTitles: {
    textAlign: "center",
    fontSize: 18,
  },
  flagContainer: {
    flex: 1,
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  flag: {
    margin: 5,
  },
  reviewsDetails: {
    width: "90%",
    marginTop: 20,
    alignItems: "center",
    marginBottom: 450,
  },
  scrollContainer: {
    width: Dimensions.get("window").width * 0.9,
    marginTop: 10,
    paddingBottom: 20,
  },
  reviewDetailContainer: {
    width: "100%",
    borderWidth: 0.5,
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  reviewHeader: {
    widht: "100%",
    flexDirection: "row",
    marginBottom: 5,
  },
});
