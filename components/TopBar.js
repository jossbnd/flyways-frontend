import React from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  Modal,
} from "react-native";
import { useState } from "react";

// Import icones
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

// Import des fonts
import StyledRegularText from "../components/StyledRegularText";
import StyledBoldText from "../components/StyledBoldText";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TopBar() {
  const [headerModalVisible, setHeaderModalVisible] = useState(false);
  const handleProfilePage = () => {
    navigation.navigate("TabNavigator");
  };

  // fonction contenant le modal
  const profilModal = () => {
    console.log("This is the modal");
    <Modal
      transparent={true}
      animationType="none"
      onRequestClose={() => {
        setHeaderModalVisible(true);
      }}
      visible={headerModalVisible}
    >
      <View style={styles.modalMainContainer}>
        <View style={styles.modalSubContainer}>
          <Text style={styles.modalTitle}>This is the modal</Text>
        </View>
      </View>
    </Modal>;
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
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
      </View>
      {profilModal()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
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
});
