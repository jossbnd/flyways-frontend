/* Modal qui sera visible lorsque l'utilisateur appuie sur l'icon Bars*/

import React from "react";
import { StyleSheet, View, TouchableOpacity, Modal, Image } from "react-native";

// import de navigation pour naviguer vers login quand l'utiliateur appuie sur log out
import { useNavigation } from "@react-navigation/native";

// Import icones
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

// Import des fonts
import StyledRegularText from "../components/StyledRegularText";
import StyledBoldText from "../components/StyledBoldText";

// Import store redux et fonction redux
import { useDispatch, useSelector } from "react-redux";

// import fonction logout du reducer
import { logout } from "../reducers/user";

export default function ProfilModal(props) {
  // selector et dispatch du store pour afficher le nom de l'utilisateur et faire fonctionner le log out
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  // variable qui stocke la methode useNavigation
  const navigation = useNavigation();

  // fonction pour le fonctionnement du log out
  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate("Login");
  };

  const goToSettings = () => {
    navigation.navigate("Settings");
  };

  return (
    <Modal
      transparent={true}
      animationType="none"
      onRequestClose={() => {
        setHeaderModalVisible(true);
      }}
      visible={props.modalVisible}
    >
      <View style={styles.modalMainContainer}>
        <View style={styles.leftModal}>
          <View style={styles.topLeftModal}>
            <TouchableOpacity
              onPress={() => props.toggleModal()}
              style={styles.topButton}
            >
              <FontAwesome5 name="times" size={25} style={styles.icon} />
            </TouchableOpacity>
            <View style={styles.userView}>
              <Image
                source={
                  user.profilePicture
                    ? { uri: user.profilePicture }
                    : require("../assets/profile-picture.jpg")
                }
                style={styles.profilePicture}
                resizeMode="contain"
              />
              <StyledRegularText
                title={user.firstName + " " + user.lastName}
                style={styles.userText}
              />
            </View>
          </View>
          <View style={styles.bottomLeftModal}>
            <TouchableOpacity
              style={styles.bottomButton}
              onPress={() => goToSettings()}
            >
              <MaterialIcons name="settings" size={30} style={styles.icon} />
              <StyledBoldText title="Settings" style={styles.text} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.bottomButton}
              onPress={() => handleLogout()}
            >
              <MaterialIcons name="logout" size={30} style={styles.icon} />
              <StyledBoldText title="Log Out" style={styles.text} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.rightModal}></View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalMainContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
  },
  leftModal: {
    width: "80%",
    height: "100%",
  },
  topLeftModal: {
    width: "100%",
    height: "20%",
    backgroundColor: "rgba(30, 168, 95, 1)",
    padding: 15,
  },
  userView: {
    width: "100%",
    height: "80%",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
  },
  profilePicture: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  userText: {
    color: "#FFFFFF",
    marginTop: 10,
  },
  bottomLeftModal: {
    width: "100%",
    height: "80%",
    padding: 15,
    backgroundColor: "rgba(30, 30, 30, 1)",
  },
  topButton: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  bottomButton: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
  rightModal: {
    backgroundColor: "rgba(30, 30, 30, 0.5)",
    width: "20%",
    height: "100%",
  },
  modalTitle: {
    color: "#FFFFFF",
  },
  icon: {
    color: "#FFFFFF",
  },
  text: {
    color: "#FFFFFF",
    marginLeft: 10,
  },
});
