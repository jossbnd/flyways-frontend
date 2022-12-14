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

// Import Font Awesome
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default function LoadingScreen({ navigation }) {
  // état pour l'animation
  const [go, setGo] = useState(false);

  // const takeOffAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  const [takeOffAnim, setTakeOffAnim] = useState(new Animated.Value(0));

  // hoof d'effet pour lancer l'animation sur le style de Animated.View
  useEffect(() => {
    if (go) {
      Animated.timing(takeOffAnim, {
        toValue: 400,
        duration: 2000,
        useNativeDriver: false,
      }).start();
    } else {
      // setTakeOffAnim(0)
    }
    return () => {
      setGo(false);
    };
  }, [go]);

  const handleGo = () => {
    setGo(true);
    setTimeout(() => navigation.navigate("Login"), 1000);
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
        <StyledRegularText
          style={styles.motto}
          title="Relax More, Stress less, Save Money"
        />
        <View style={styles.icons}>
          <FontAwesome5 name="glass-martini" size={20} color="#ffffff" />
          <FontAwesome5 name="globe-americas" size={20} color="#ffffff" />
          <FontAwesome5 name="money-bill-alt" size={20} color="#ffffff" />
        </View>
      </View>
      <TouchableOpacity
        style={[styles.button, styles.green]}
        onPress={handleGo}
      >
        <StyledBoldText title="LET'S GO !" style={styles.go} />
      </TouchableOpacity>
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
  },
  titles: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 38,
    color: "#FFFFFF",
    marginBottom: 5,
    margin: 10,
  },
  motto: {
    color: "#1EA85F",
    margin: 10,
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
