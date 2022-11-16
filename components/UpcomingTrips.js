import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";

// Import hook Navigation
import { useNavigation } from "@react-navigation/native";

// Import des fonts
import StyledRegularText from "../components/StyledBoldText";
import StyledBoldText from "../components/StyledBoldText";


export default function UpcomingTrips(props) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.navigate("Trip", { tripData: props.dataTrip });
      }}
    >
      <View style={styles.descriptionText}>
        <StyledBoldText title={props.arrival} style={{ fontSize: 18 }} />
        <StyledRegularText
          title={"Passengers: " + props.passengers + "/" + props.capacity}
          style={{ fontSize: 12, fontStyle: 'italic' }}
        />
      </View>
      <View style={styles.dateContainer}>
        <StyledBoldText title={props.date} style={{ fontSize: 16 }} />
        <StyledRegularText title={props.time} style={{ fontSize: 12 }} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 60,
    backgroundColor: "#DCDCDC",
    borderRadius: 5,
    borderBottomWidth: 0.5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  descriptionText: {
    flex: 1,
    width: "60%",
  },
  dateContainer: {
    alignItems: "flex-end",
  },
});
