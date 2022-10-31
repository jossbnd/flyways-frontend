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
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const BACK_END_ADDRESS = "https://flyways-backend.vercel.app/";

export default function ChatScreen({ navigation, route: { params } }) {
  // récupérer les infos du trip
  const trip = params.props;

  // Etats
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState(null);

  // fonction pour déclencher le menu modal
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const passengersData = trip.passengers.map((passenger, i) => {
    return (
      <View key={i} style={styles.imageContainer}>
        <TouchableOpacity>
          <Image
            style={styles.userImage}
            source={
              passenger.profilePicture
                ? { uri: passenger.profilePicture }
                : require("../assets/profile-picture.jpg")
            }
            resizeMode="contain"
          />
          <StyledRegularText
            title={passenger.firstName + " " + passenger.lastName[0] + "."}
          />
        </TouchableOpacity>
      </View>
    );
  });

  return (
    <SafeAreaView style={styles.container}>
      <TopBar toggleModal={toggleModal} />

      <View style={styles.header}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {passengersData}
        </ScrollView>
      </View>
      <View style={styles.discussionContainer}></View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Send a message..."
          onChangeText={(value) => setMessage(value)}
          value={message}
        />
        <TouchableOpacity
          style={styles.sendButton}
        >
          <MaterialIcons name="send" color="#ffffff" size={24} />
        </TouchableOpacity>
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
    borderBottomColor: "black",
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
  discussionContainer: {
    width: "100%",
    borderWidth: 1,
    flex: 1,
  },
  inputContainer: {
    width: "100%",
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'center'
  },
  input: {
    width: "75%",
    height: 57,
    borderWidth: 1,
    borderColor: "#1EA85F",
    borderRadius: 20,
    marginRight: 15,
    backgroundColor: '#ffffff',
    paddingHorizontal: 10

  },
  sendButton: {
    borderRadius: 50,
    padding: 16,
    backgroundColor: "#1EA85F",
    alignItems: "center",
    justifyContent: "center",
  },
});
