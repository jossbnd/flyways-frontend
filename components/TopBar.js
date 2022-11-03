/* Composant de la barre Header avec l'icone menu, le logo et l'icone chat */

import React from "react";
// Import des balises
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";

// Import hook Navigation
import { useNavigation } from "@react-navigation/native";

// Import icones
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

// Import des fonts
import StyledRegularText from "../components/StyledRegularText";
import StyledBoldText from "../components/StyledBoldText";

export default function TopBar(props) {
  // variable qui stocke la methode useNavigation
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          props.toggleModal();
        }}
      >
        <FontAwesome5 name="bars" size={25} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.logo}
        onPress={() => navigation.navigate("My Profile")}
      >
        <Image
          style={styles.image}
          source={require("../assets/flyways-logo.png")}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
        <FontAwesome5 name="comment-dots" size={25} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "stretch",
    height: 52,
    flexDirection: "row", // row
    backgroundColor: "#1EA85F",
    alignItems: "center",
    justifyContent: "space-between", // center, space-around
    paddingLeft: 17,
    paddingRight: 17,
  },
  image: {
    width: 30,
    height: 25,
    resizeMode: "contain",
  },
  logo: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1E1E1E",
    borderRadius: 20,
    width: 38,
    height: 38,
  },
  modal: {
    height: 400,
    width: 200,
  },
});
