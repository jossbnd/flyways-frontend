import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TopBar from "../components/TopBar";

// Import des fonts
import StyledRegularText from "../components/StyledBoldText";
import StyledBoldText from "../components/StyledBoldText";
import { useState } from "react";
// Import du/des composant(s)
import ProfilModal from "../components/ProfilModal";

export default function HomeScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  return (
    <SafeAreaView style={styles.container}>
      <TopBar toggleModal={toggleModal} />
      <StyledRegularText title="WELCOME ON HOME SCREEN" />
      <ProfilModal modalVisible={modalVisible} toggleModal={toggleModal} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  profileContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  profilePicture: {
    height: 150,
    width: 150,
    borderRadius: 100,
    marginTop: 50,
  },
  userName: {
    marginTop: 20,
    fontSize: 20,
  },
  reviewContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
