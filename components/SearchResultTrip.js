import React from "react";
import { Text, Image, StyleSheet, View, TouchableOpacity } from "react-native";

// Import FontAwesome
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

// Import des icones drapeau
import CountryFlag from "react-native-country-flag";

// Import des fonts
import StyledRegularText from "../components/StyledBoldText";
import StyledBoldText from "../components/StyledBoldText";

export default function SearchResultTrip(props) {
  // map d'une icone drapeau par langue parlée
  const languages = props.passengers[0].languagesSpoken.map((language, i) => {
    return (
      <CountryFlag key={i} isoCode={language} style={styles.flag} size={18} />
    );
  });

  const placesLeft = props.capacity - props.passengersNumber; // calcul des places restantes sur le trip
  const leaderProfilePicture = props.passengers[0].profilePicture; // avatar du leader
  const dateJS = new Date(props.date); // créée une date javascript
  
  const dateFormatted = `${dateJS.getDate()}/${
    // formate la date pour qu'elle soit lisible
    dateJS.getMonth() + 1
  } ${dateJS.getHours()}:${dateJS.getMinutes()}`;
  let dist = undefined;

  if (props.distToDestination >= 1) {
    // si la distance to destination est sup ou égale à 1 km, affiche la dist en km
    dist = `${props.distToDestination.toFixed(2)} km`;
  } else {
    // si la distance est en dessous de 1 km, affiche la dist en m
    dist = `${Math.round(props.distToDestination * 1000)} m`;
  }

  return (
    <TouchableOpacity style={styles.container}>
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
              title={
                props.passengers[0].firstName +
                " " +
                props.passengers[0].lastName
              }
              style={styles.nameAndRatingItem}
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
              <View style={styles.flagContainer}>{languages}</View>
            </View>
          </View>
        </View>

        <View style={styles.bottomData}>
          <View style={styles.bottomDataContainer}>
            <StyledRegularText
              title="Departure:"
              style={styles.bottomDataItem}
            />
            <StyledRegularText
              title={`${dateFormatted}`}
              style={styles.bottomDataItem}
            />
          </View>

          <View style={styles.bottomDataContainer}>
            <StyledRegularText
              title="Drop-off distance:"
              style={styles.bottomDataItem}
            />
            <StyledRegularText
              // title={`${props.distToDestination.toFixed(2)} km`}
              title={dist}
              style={styles.bottomDataItem}
            />
          </View>

          <View style={styles.bottomDataContainer}>
            <StyledRegularText
              title="Places left:"
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
    width: "96%",
    height: 140,
    backgroundColor: "#efefef",
    borderRadius: 5,
    borderBottomWidth: 0.5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 6,

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
    flex: 1,
    flexDirection: "row",
    marginTop: 12,
  },
  nameAndRating: {
    flex: 1,
    flexDirection: "column",
  },
  nameAndRatingItem: {
    marginBottom: 6,
    color: "#1B9756",
  },
  flagContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  flag: {
    marginLeft: 6,
    borderRadius: 4,
  },
  userRating: {
    flexDirection: "row",
  },
  bottomData: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 12,
  },
  bottomDataItem: {
    marginRight: 12,
    textAlign: "center",
    color: "#1B9756",
  },
  bottomDataContainer: {
    borderWidth: 1,
    marginRight: 2,
    padding: 4,
    borderRadius: 4,
    borderColor: "#1B9756",
  },
});
