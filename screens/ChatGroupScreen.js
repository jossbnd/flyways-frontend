import {
  Button,
  StyleSheet,
  View,
  TextInput,
  Touchable,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TopBar from "../components/TopBar";
import ProfilModal from "../components/ProfilModal";
import Discussion from "../components/Discussion";

// Import des fonts
import StyledRegularText from "../components/StyledBoldText";
import StyledBoldText from "../components/StyledBoldText";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// Import icones
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import TripScreen from "./TripScreen";

const BACK_END_ADDRESS = "https://flyways-backend.vercel.app/";

export default function ChatScreen({ navigation, route: { params } }) {
  // récupérer les infos du trip
  const trip = params.props;

  // Etats
  const [modalVisible, setModalVisible] = useState(false);

  // fonction pour déclencher le menu modal
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopBar toggleModal={toggleModal} />

    <View style={styles.header}>


      <ScrollView contentContainerStyle={styles.header} horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.userImage}
            source={require("../assets/profile-picture.jpg")}
            resizeMode="contain"
          />
          <StyledRegularText
            title={
              trip.passengers[0].firstName +
              " " +
              trip.passengers[0].lastName[0] +
              "."
            }
          />
        </View>
        <View style={styles.imageContainer}>
          <Image
            style={styles.userImage}
            source={require("../assets/profile-picture.jpg")}
            resizeMode="contain"
          />
          <StyledRegularText
            title={
              trip.passengers[0].firstName +
              " " +
              trip.passengers[0].lastName[0] +
              "."
            }
          />
        </View>
        <View style={styles.imageContainer}>
          <Image
            style={styles.userImage}
            source={require("../assets/profile-picture.jpg")}
            resizeMode="contain"
          />
          <StyledRegularText
            title={
              trip.passengers[0].firstName +
              " " +
              trip.passengers[0].lastName[0] +
              "."
            }
          />
        </View>
        <View style={styles.imageContainer}>
          <Image
            style={styles.userImage}
            source={require("../assets/profile-picture.jpg")}
            resizeMode="contain"
          />
          <StyledRegularText
            title={
              trip.passengers[0].firstName +
              " " +
              trip.passengers[0].lastName[0] +
              "."
            }
          />
        </View>
        <View style={styles.imageContainer}>
          <Image
            style={styles.userImage}
            source={require("../assets/profile-picture.jpg")}
            resizeMode="contain"
          />
          <StyledRegularText
            title={
              trip.passengers[0].firstName +
              " " +
              trip.passengers[0].lastName[0] +
              "."
            }
          />
        </View>
        <View style={styles.imageContainer}>
          <Image
            style={styles.userImage}
            source={require("../assets/profile-picture.jpg")}
            resizeMode="contain"
          />
          <StyledRegularText
            title={
              trip.passengers[0].firstName +
              " " +
              trip.passengers[0].lastName[0] +
              "."
            }
          />
        </View>
      </ScrollView>
    </View>

      <ProfilModal modalVisible={modalVisible} toggleModal={toggleModal} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  header: {
    height: 100,
    borderBottomWidth: 0.5,
    borderBottomColor: 'black',
  },
  scroll: {

  },
  imageContainer: {
    height: "100%",
    width: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  userImage: {
    height: 64,
    width: 64,
    borderRadius: 50,
    marginBottom: 5,
  },
});
