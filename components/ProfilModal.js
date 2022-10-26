/* Modal qui sera visible lorsque l'utilisateur appuie sur l'icon Bars*/

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
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

// Import des fonts
import StyledRegularText from "../components/StyledRegularText";
import StyledBoldText from "../components/StyledBoldText";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfilModal(props) {
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
            <TouchableOpacity onPress={() => props.toggleModal()}>
              <FontAwesome5 name="times" size={25} style={styles.icon} />
            </TouchableOpacity>
            <FontAwesome5 name="user" size={25} style={styles.icon} />
          </View>
          <View style={styles.bottomLeftModal}>
            <TouchableOpacity
              onPress={() => props.toggleModal()}
              style={styles.bottomButton}
            >
              <MaterialIcons name="settings" size={30} style={styles.icon} />
              <StyledBoldText title="Settings" style={styles.text} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.toggleModal()}
              style={styles.bottomButton}
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
    backgroundColor: "#1E1E1E",
    flexDirection: "row",
  },
  leftModal: {
    width: "80%",
    height: "100%",
  },
  topLeftModal: {
    width: "100%",
    height: "20%",
    backgroundColor: "rgba(30, 168, 95, 0.5)",
  },
  bottomLeftModal: {
    width: "100%",
    height: "80%",
    padding: 10,
  },
  bottomButton: {
    flexDirection: "row",
  },
  rightModal: {
    backgroundColor: "#C9C9C9",
    width: "20%",
    height: "100%",
  },
  modalTitle: {
    color: "#FFFFFF",
  },
  icon: {
    color: "white",
  },
  text: {
    color: "#FFFFFF",
  },
});
