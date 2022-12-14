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

import { BACK_END_ADDRESS } from "../environmentVar";

// Import des fonts
import StyledRegularText from "../components/StyledBoldText";

// Import des hooks
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";

// Import icones
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

// Pusher Config
import { PUSHER_KEY, PUSHER_CLUSTER } from "../environmentVar";
import Pusher from "pusher-js/react-native";

// Import Moment to format date
import moment from "moment";

export default function ChatGroupScreen({ navigation, route: { params } }) {
  // Récupérer les infos du trip
  const trip = params.props;

  // Etats
  const [modalVisible, setModalVisible] = useState(false);
  const [messageText, setMessageText] = useState(null);
  const [messages, setMessages] = useState(trip.messages);

  // Ref de la scroll view de la discussion pour pouvoir scroll to end à chaque message
  const scrollViewRef = useRef();

  // Récupérer les infos du main user (en particulier son token)
  const user = useSelector((state) => state.user.value);

  // Fonction pour déclencher le menu modal
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  // Scroll to end à l'initialisation de la page (animated false pour scroll instantané)
  useEffect(() => {
    // Scroll à la fin des messages au chargement
    scrollViewRef.current.scrollToEnd({ animated: false });

    // Initialiser objet pusher
    const pusher = new Pusher(PUSHER_KEY, { cluster: PUSHER_CLUSTER });

    // L'utilisateur rejoint le channel
    fetch(`${BACK_END_ADDRESS}/trips/joinchat/${trip.token}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...user }),
    });

    // Mise en place des écoutes des nouveaux messages
    const subscription = pusher.subscribe(trip.token);
    subscription.bind("pusher:subscription_succeeded", () => {
      subscription.bind("message", handleReceiveMessage);
    });

    // Se déconnecter quand l'écran se détruit
    return () => {
      fetch(`${BACK_END_ADDRESS}/trips/leavechat/${trip.token}`, {
        method: "DELETE",
      });
      pusher.disconnect();
    };
  }, []);

  // Fonction sui se déclenche quand il y a un nouveau message détecté sur Pusher
  const handleReceiveMessage = (data) => {
    scrollViewRef.current.scrollToEnd({ animated: true });
    setMessages((messages) => [...messages, data]);
  };

  // Fonction au clic sur 'send message'
  const handlePostMessage = () => {
    // Scroll to end quand nouveau message (animated true pour scroll progressif)
    scrollViewRef.current.scrollToEnd();

    // Création de l'objet newMessage à envoyer dans le back end
    if (messageText) {
      const newMessage = {
        userToken: user.token,
        firstName: user.firstName,
        lastName: user.lastName,
        text: messageText,
        date: new Date(),
      };

      // Route pour poster un nouveau message
      fetch(`${BACK_END_ADDRESS}/trips/postmessage/${trip.token}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(newMessage),
      });

      // Vider l'input messageText
      setMessageText(null);
    } else {
      return;
    }
  };

  // Conception des composants image du profil en header du screen
  const passengersData = trip.passengers.map((passenger, i) => {
    return (
      <View key={i}>
        <TouchableOpacity style={styles.imageContainer} onPress={() => navigation.navigate('Profile', { userToken: passenger.passengerToken })}>
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
  const messagesData = messages.map((message, i) => {
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
            ". - " +
            moment(message.date).calendar()
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
      <ScrollView style={styles.discussionContainer} ref={scrollViewRef}>
        {messagesData}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Send a message..."
          onChangeText={(value) => setMessageText(value)}
          value={messageText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handlePostMessage}>
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
    padding: 10,
    height: "100%",
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
