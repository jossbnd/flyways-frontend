import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TopBar from "../components/TopBar";
import ProfilModal from "../components/ProfilModal";

// Import des fonts
import StyledRegularText from "../components/StyledBoldText";
import StyledBoldText from "../components/StyledBoldText";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// Import icones
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const BACK_END_ADDRESS = "https://flyways-backend.vercel.app/";

export default function ChatScreen({ navigation, route: { params } }) {
  // Récupérer les infos du trip
  const trip = params.props;

  // Etats
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState(null);

  // Récupérer les infos du main user (en particulier son token)
  const user = useSelector((state) => state.user.value);

  // Fonction pour déclencher le menu modal
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  //   Fonction au clic sur 'send message'
  const handleMessage = () => {
    setMessage(null);
  };

  // Conception des composants image du profil en header du screen
  const passengersData = trip.passengers.map((passenger, i) => {
    return (
      <View key={i}>
        <TouchableOpacity style={styles.imageContainer}>
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

  // Conception des composants messages
  const messagesData = trip.messages.map((message, i) => {
    return (
      <View
        key={i}
        style={[
          styles.messageWrapper,
          {
            ...(message.userToken === user.token
              ? styles.messageSent
              : styles.messageReceived),
          },
        ]}
      >
        <View
          style={[
            styles.message,
            {
              ...(message.userToken === user.token
                ? styles.messageSentBg
                : styles.messageReceivedBg),
            },
          ]}
        >
          <StyledRegularText style={styles.messageText} title={message.text} />
        </View>
        <StyledRegularText
          style={styles.timeText}
          title={
            message.firstName +
            " " +
            message.lastName[0] +
            "." +
            " - 31/10 at 7:00pm"
          }
        />
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
      <ScrollView style={styles.discussionContainer}>{messagesData}</ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Send a message..."
          onChangeText={(value) => setMessage(value)}
          value={message}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleMessage}>
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
    width: 90,
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
    borderBottomWidth: 0.5,
    flex: 1,
    padding: 10,
  },
  message: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingRight: 20,
    paddingLeft: 20,
    borderRadius: 24,
    alignItems: "flex-end",
    justifyContent: "center",
    maxWidth: "65%",
  },
  messageWrapper: {
    alignItems: "flex-end",
    marginBottom: 20,
  },
  messageReceived: {
    alignSelf: "flex-start",
    alignItems: "flex-start",
  },
  messageSent: {
    alignSelf: "flex-end",
    alignItems: "flex-end",
  },
  messageSentBg: {
    backgroundColor: "rgba(30, 168, 95, 0.5)",
  },
  messageReceivedBg: {
    backgroundColor: "#ffffff",
  },
  messageText: {
    fontSize: 14,
  },
  timeText: {
    fontSize: 8,
    marginHorizontal: 10,
    fontStyle: "italic",
  },
  inputContainer: {
    width: "100%",
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "75%",
    height: 57,
    borderWidth: 1,
    borderColor: "#1EA85F",
    borderRadius: 20,
    marginRight: 15,
    backgroundColor: "#ffffff",
    paddingHorizontal: 10,
  },
  sendButton: {
    borderRadius: 50,
    padding: 16,
    backgroundColor: "#1EA85F",
    alignItems: "center",
    justifyContent: "center",
  },
});
