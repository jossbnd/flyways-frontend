import React from "react";
import {
  Text,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";

// Import FontAwesome
import FontAwesome from "react-native-vector-icons/FontAwesome";

// Import hook Navigation
import { useNavigation } from "@react-navigation/native";

// Import des icones drapeau
import CountryFlag from "react-native-country-flag";

// Import des fonts
import StyledRegularText from "../components/StyledBoldText";

const windowWidth = Dimensions.get("window").width;

export default function SearchResultTrip(props) {
  // variable qui stocke la methode useNavigation
  const navigation = useNavigation();

  // map une icone drapeau par langue parlée
  const languages = props.passengers[0].languagesSpoken.map((language, i) => {
    return (
      <CountryFlag key={i} isoCode={language} style={styles.flag} size={18} />
    );
  });

  let languagesSpokenCheck = true;
  if (props.passengers[0].languagesSpoken.length === 0) {
    // si l'utilisateur n'a pas renseigné de langues parlées, permet de ne rien afficher
    languagesSpokenCheck = false;
  }

  const placesLeft = props.capacity - props.passengersNumber; // calcul des places restantes sur le trip
  const leaderProfilePicture = props.passengers[0].profilePicture; // avatar du leader
  const dateJS = new Date(props.date); // créée une date javascript

  // ajoute un zéro si les minutes sont sous 10 (affiche 7:05 au lieu de 7:5)
  let minutesFormatted = dateJS.getMinutes();
  minutesFormatted < 10 ? minutesFormatted = `0${minutesFormatted}` : null

  const dateFormatted = `${dateJS.getDate()}/${
    // formate la date pour qu'elle soit lisible
    dateJS.getMonth() + 1
  } ${dateJS.getUTCHours()}:${minutesFormatted}`;
  let dist = undefined;

  if (props.distToDestination >= 1) {
    // si la distance to destination est sup ou égale à 1 km, affiche la dist en km
    dist = `${props.distToDestination.toFixed(2)} km`;
  } else {
    // si la distance est en dessous de 1 km, affiche la dist en m
    dist = `${Math.round(props.distToDestination * 1000)} m`;
  }

  return (
      <TouchableOpacity
      // navigation={navigation}
      style={styles.container}
      onPress={() => {
        navigation.navigate("Trip", { tripData: props });
      }}
    >
      <View style={styles.descriptionText}>
        <View style={styles.leaderData}>
          {/* leaderData contient avatar, name, rating dans un bloc*/}
          <Image
            source={
              leaderProfilePicture
                ? { uri: leaderProfilePicture }
                : require("../assets/profile-picture.jpg")
            }
            style={{ width: 64, height: 64, borderRadius: 32 }}
          />

          <View style={styles.nameAndRating}>
            {/* contient name et rating, pour les afficher verticalement*/}
            <StyledRegularText
              title={`${props.passengers[0].firstName} ${props.passengers[0].lastName[0]}.`}
              style={styles.name}
            />
            <View style={styles.userRating}>
              <FontAwesome
                name="star"
                size={15}
                style={{ marginRight: 5, color: "#f1c40f" }}
              />
              <StyledRegularText
                title={`${props.passengers[0].rating} / 5`}
                style={styles.nameAndRatingItem}
              />
            </View>
          </View>
          {/* si l'utilisateur n'a pas renseigné de langues parlées, n'affiche rien */}
          {languagesSpokenCheck ? (
            <View style={styles.languages}>
              <StyledRegularText style={styles.greenText} title="speaks : " />
              {languages}
            </View>
          ) : (
            <></>
          )}
        </View>

        <View style={styles.fromToContainer}>
          <View style={styles.fromTo}>
            <StyledRegularText title={`FROM`} style={styles.fromToItem} />
            <Text numberOfLines={1} >{props.departureCoords.description}</Text>
          </View>
          <View style={styles.fromTo}>
            <StyledRegularText title={`TO`} style={styles.fromToItem} />
            <Text numberOfLines={1} >{props.arrivalCoords.description}</Text>
          </View>
        </View>

        <View style={styles.bottomData}>
          <View style={styles.bottomDataContainer}>
            <StyledRegularText
              title="Departure"
              style={styles.bottomDataItem}
            />
            <StyledRegularText
              title={`${dateFormatted}`}
              style={styles.bottomDataItem}
            />
          </View>

          <View style={styles.bottomDataContainer}>
            <StyledRegularText
              title="Drop-off distance"
              style={styles.bottomDataItem}
            />
            <StyledRegularText title={dist} style={styles.bottomDataItem} />
          </View>

          <View style={styles.bottomDataContainer}>
            <StyledRegularText
              title="Places left"
              style={styles.bottomDataItem}
            />
            <StyledRegularText
              title={placesLeft}
              style={styles.bottomDataItem}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  // TODO:
  container: {
    width: windowWidth*0.9,
    backgroundColor: "#efefef",
    borderRadius: 5,
    paddingHorizontal: 6,
    marginBottom: 6,
    borderWidth: 0.5,

    // shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  leaderData: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    marginLeft: 8,
  },
  nameAndRating: {
    marginLeft: 8,
  },
  nameAndRatingItem: {
    // color: "#1B9756",
  },
  name: {
    fontSize: 16,
  },
  flag: {
    marginLeft: 2,
    borderRadius: 4,
  },
  languages: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  userRating: {
    flexDirection: "row",
  },
  fromToContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    marginLeft: 8,
    marginVertical: 4,
  },
  fromTo: {
    // marginTop: 8,
    // marginRight: 10,
  },
  fromToItem: {
    // textAlign: "center",
    // marginBottom: 6,
  },
  bottomData: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 8,
    // borderWidth: 1,
  },
  bottomDataItem: {
    // marginRight: 12,
    textAlign: "center",
    color: "#1B9756",
  },
  bottomDataContainer: {
    borderWidth: 1,
    // marginRight: 2,
    padding: 4,
    borderRadius: 4,
    borderColor: "#1B9756",
  },
});
