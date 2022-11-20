import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TopBar from "../components/TopBar";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function SettingsScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <TopBar></TopBar>
      <View style={styles.settingList}>
        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => {
            navigation.navigate("PersonalInformation");
          }}
        >
          <Text style={styles.text}>Edit personal information</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => {
            console.log("yes");
          }}
        >
          <Text style={styles.text}>Verify your phone number</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => {
            navigation.navigate("SecuritySettings");
          }}
        >
          <Text style={styles.text}>Security settings</Text>
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
