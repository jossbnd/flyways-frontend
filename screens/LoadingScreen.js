/* COMMENTAIRES:
Page finit dans l'ensemble, il reste a changer le nom des icons, je n ai pas reussi a afficher les bons */

import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import StyledText from "../components/StyledText";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default function LoadingScreen({ navigation }) {
  // fonction pour pouvoir acceder a la page login en appuyant sur le premier logo
  const handleSubmit = () => {
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Image
        style={styles.image}
        source={require("../assets/flyways-logo.png")}
      />
      <View style={styles.titles}>
        <StyledText style={styles.title} title="FlyWays" />
        <StyledText
          style={styles.motto}
          title="Relax, Stress less, save money"
        />
        <View style={styles.icons}>
          <FontAwesome
            name="glass"
            size={20}
            color="#ffffff"
            onPress={() => handleSubmit()}
          />
          <FontAwesome name="rotate-right" size={20} color="#ffffff" />
          <FontAwesome name="money" size={20} color="#ffffff" />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E1E",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 400,
    resizeMode: "contain",
  },
  titles: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 38,
    color: "#FFFFFF",
    marginBottom: 5,
  },
  motto: {
    color: "#1EA85F",
  },
  icons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: 200,
    marginTop: 5,
  },
});
