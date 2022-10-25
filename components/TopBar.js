import React from "react";
// Import des balises
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { useState } from "react";

// Import du/des composant(s)
import ProfilModal from "./ProfilModal";

// Import icones
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

// Import des fonts
import StyledRegularText from "../components/StyledRegularText";
import StyledBoldText from "../components/StyledBoldText";

export default function TopBar() {
  // etat pour afficher le modal
  const [headerModalVisible, setHeaderModalVisible] = useState(false);
  const handleProfilePage = () => {
    navigation.navigate("TabNavigator");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          setHeaderModalVisible(true);
        }}
      >
        <FontAwesome5 name="bars" size={25} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.logo}>
        <Image
          style={styles.image}
          source={require("../assets/flyways-logo.png")}
          onPress={() => handleProfilePage()}
        />
      </TouchableOpacity>
      <FontAwesome5 name="comment-dots" size={25} />
      <ProfilModal
        visible={headerModalVisible}
        style={styles.modal}
      ></ProfilModal>
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
  modalMainContainer: {
    flex: 1,
    backgroundColor: "#1E1E1E",
  },
  modalSubContainer: {
    width: "80%",
    height: "100%",
  },
  modalTitle: {
    color: "red",
  },
  modal: {
    height: 400,
  },
});
