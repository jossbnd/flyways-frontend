import {
  Image,
  Platform,
  StyleSheet,
  View,
  Animated,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";

// Import des fonts dans components
import StyledBoldText from "../components/StyledBoldText";
import StyledRegularText from "../components/StyledRegularText";

// Safearea import
import { SafeAreaView } from "react-native-safe-area-context";

export default function EndingScreen({ navigation }) {
  // état pour l'animation
  const [go, setGo] = useState(true);

  // const takeOffAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  const [takeOffAnim, setTakeOffAnim] = useState(new Animated.Value(400));
  const [opacityAnim, setOpacityAnim] = useState(new Animated.Value(0));

  // hoof d'effet pour lancer l'animation sur le style de Animated.View
  useEffect(() => {
    if (go) {
      Animated.timing(takeOffAnim, {
        toValue: 0,
        duration: 3000,
        useNativeDriver: false,
      }).start();
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: false,
      }).start();
    } else {
      // setTakeOffAnim(0)
    }
    return () => {
      setGo(false);
    };
  }, []);

  const handleBack = () => {
    //   setGo(true);
    setTimeout(() => navigation.navigate("My Profile"), 1000);
  };

  return (
    <SafeAreaView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Animated.View style={{ bottom: takeOffAnim }}>
        <Image
          style={styles.image}
          source={require("../assets/flyways-logo.png")}
        />
      </Animated.View>
      <View style={styles.titles}>
        <StyledBoldText style={styles.title} title="FlyWays" />
        <Animated.View style={{ opacity: opacityAnim }}>
          <TouchableOpacity onPress={() => navigation.navigate('My Profile')}>
            <StyledRegularText
              style={styles.thanks}
              title="Thanks for travelling with FlyWays !"
            />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#1E1E1E",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 400,
    resizeMode: "contain",
    bottom: 0,
    top: 50,
  },
  titles: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 38,
    color: "#FFFFFF",
    marginBottom: 5,
    marginBottom: 10,
  },
  thanks: {
    color: "#1EA85F",
    fontSize: 28,
    marginTop: 20,
    textAlign: "center",
    width: 300,
  },
  icons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: 200,
    margin: 10,
  },
  button: {
    borderRadius: 20,
    width: "90%",
    height: 40,
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  green: {
    backgroundColor: "rgba(30, 168, 95, 0.5)",
  },
  go: {
    color: "#ffffff",
  },
});
