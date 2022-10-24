import { Image, Platform, StyleSheet, View } from "react-native";

// import des fonts dans components
import StyledBoldText from "../components/StyledBoldText";
import StyledRegularText from "../components/StyledRegularText";
// Safearea import
import { SafeAreaView } from "react-native-safe-area-context";
// import Font Awesome
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
        <StyledBoldText style={styles.title} title="FlyWays" />
        <StyledRegularText
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
          {/* Icon name à changer */}
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
