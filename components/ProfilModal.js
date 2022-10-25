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

// Import des fonts
import StyledRegularText from "../components/StyledRegularText";
import StyledBoldText from "../components/StyledBoldText";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfilModal() {
  const [headerModalVisible, setHeaderModalVisible] = useState(false);

  return (
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
    </Modal>
  );
}

const styles = StyleSheet.create({
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
