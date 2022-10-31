import {
  Button,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TopBar from "../components/TopBar";

// Import des fonts
import StyledRegularText from "../components/StyledBoldText";
import StyledBoldText from "../components/StyledBoldText";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function SecuritySettingsScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <TopBar></TopBar>
      <View style={styles.settingList}>
        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => {
            navigation.navigate("EditDateOfBirth");
          }}
        >
          <Text style={styles.text}>Edit email address</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => {
            navigation.navigate("EditGender");
          }}
        >
          <Text style={styles.text}>Edit password</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => {
            navigation.navigate("EditLanguages");
          }}
        >
          <Text style={styles.text}>Edit payment method</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  settingList: {
    width: windowWidth * 0.9,
  },
  settingItem: {
    fontSize: 20,
    fontFamily: "Lato_400Regular",

    paddingVertical: 20,
    borderBottomColor: "#c6c6c6",
    borderBottomWidth: 1,
  },
  text: {
    fontSize: 20,
    fontFamily: "Lato_400Regular",
  },
});
