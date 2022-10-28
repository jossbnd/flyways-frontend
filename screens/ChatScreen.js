import { Button, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TopBar from "../components/TopBar";
import ProfilModal from "../components/ProfilModal";

// Import des fonts
import StyledRegularText from "../components/StyledBoldText";
import StyledBoldText from "../components/StyledBoldText";

export default function ChatScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <TopBar />
      {/* <ProfilModal /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
