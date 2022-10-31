import React from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";

// Import des Fonts
import StyledRegularText from "../components/StyledBoldText";

export default function Discussion(props) {
  const { passengers, discussions } = props;

  let passengersName = [];

  // Fonction pour gérer les différents noms selon si 2, 3 ou + de passagers
  if (passengers.length === 2) {
    passengersName.push(
      <StyledRegularText
        key={0}
        title={passengers[1].firstName + " " + passengers[1].lastName[0] + '.'}
        style={{ fontSize: 18 }}
      />
    );
  } else if (passengers.length === 3) {
    passengersName.push(
      <StyledRegularText
        key={1}
        title={passengers[1].firstName + " " + passengers[1].lastName[0] + '.'}
        style={{ fontSize: 18 }}
      />,
      <StyledRegularText
        key={2}
        title={", " + passengers[2].firstName + " " + passengers[2].lastName[0] + '.'}
        style={{ fontSize: 18 }}
      />
    );
  } else {
    passengersName.push(
      <StyledRegularText
        key={4}
        title={passengers[1].firstName + " " + passengers[1].lastName[0] + '.'}
        style={{ fontSize: 18 }}
      />,
      <StyledRegularText
        key={5}
        title={
          ", " +
          passengers[2].firstName +
          " " +
          passengers[2].lastName[0] + '.' +
          " & others"
        }
        style={{ fontSize: 18 }}
      />
    );
  }

  return (
    <TouchableOpacity style={styles.discussion}>
      {passengers.length < 3 ? (
        <View style={styles.imageContainer}>
          <Image
            style={styles.oneImage}
            source={
              passengers[1].profilePicture
                ? { uri: passengers[1].profilePicture }
                : require("../assets/profile-picture.jpg")
            }
            resizeMode="contain"
          />
        </View>
      ) : (
        <View style={styles.imageContainer}>
          <Image
            style={[styles.twoImage, styles.first]}
            source={
              passengers[1].profilePicture
                ? { uri: passengers[1].profilePicture }
                : require("../assets/profile-picture.jpg")
            }
            resizeMode="contain"
          />
          <Image
            style={[styles.twoImage, styles.second]}
            source={
              passengers[2].profilePicture
                ? { uri: passengers[1].profilePicture }
                : require("../assets/profile-picture.jpg")
            }
            resizeMode="contain"
          />
        </View>
      )}
      <View style={styles.decriptionContainer}>
        <View style={styles.descriptionHeader}>{passengersName}</View>
        <View style={styles.descriptionBody}>
          <StyledRegularText
            key={0}
            title={'"' + discussions[discussions.length - 1].text + '"'}
            style={{ fontSize: 12, fontStyle: "italic" }}
          />
        </View>
      </View>
      <View style={styles.dateContainer}>
        <StyledRegularText
          key={0}
          title={"Paris, France".slice(0, 10) + "..."}
          style={{ fontSize: 16 }}
        />
        <StyledRegularText
          key={1}
          title={"26 Feb 22"}
          style={{ fontSize: 14, fontStyle: "italic", marginTop: 5 }}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  discussion: {
    width: "100%",
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    height: 100,
    flexDirection: "row",
  },
  imageContainer: {
    height: "100%",
    width: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  oneImage: {
    height: 64,
    width: 64,
    borderRadius: 50,
  },
  twoImage: {
    height: 48,
    width: 48,
    borderRadius: 50,
  },
  first: {
    top: 10,
    right: 10,
  },
  second: {
    bottom: 10,
    left: 10,
  },
  decriptionContainer: {
    height: "100%",
    width: "50%",
  },
  descriptionHeader: {
    flexDirection: "row",
    width: "100%",
    height: "35%",
    alignItems: "flex-end",
  },
  descriptionBody: {
    marginTop: 5,
    width: "100%",
    height: "50%",
  },
  dateContainer: {
    height: "100%",
    width: "27%",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    paddingTop: 15,
  },
});
