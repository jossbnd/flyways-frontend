import { Button, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TopBar from "../components/TopBar";

// Import des fonts
import StyledRegularText from "../components/StyledBoldText";
import StyledBoldText from "../components/StyledBoldText";

export default function NotificationScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <TopBar></TopBar>
      <StyledRegularText title="NOTIFICATION SCREEN" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
