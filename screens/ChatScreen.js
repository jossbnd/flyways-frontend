import {
  Button,
  StyleSheet,
  View,
  TextInput,
  Touchable,
  TouchableOpacity,
  Image,
  ScrollView,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TopBar from "../components/TopBar";
import ProfilModal from "../components/ProfilModal";
import Discussion from "../components/Discussion";

// Import des fonts
import StyledRegularText from "../components/StyledBoldText";
import StyledBoldText from "../components/StyledBoldText";
import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";

// Import icones
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const BACK_END_ADDRESS = "https://flyways-backend.vercel.app/";

<<<<<<< HEAD
=======
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

>>>>>>> 1a029290ba72da59618f565608e1b31e10315c97
export default function ChatScreen({ navigation }) {
  // Etats
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState(null);
<<<<<<< HEAD
  const [messages, setMessages] = useState([
    {
      userToken: "rV_x_NcHrhZgXbkbJ34VMih_8aK3CIPg",
      firstName: "John",
      lastName: "Doe",
      text: "Hello",
    },
    {
      userToken: "tPGNf15pQLPAb_byqpj8Qoi9MsLfMb1V",
      firstName: "Joss",
      lastName: "Bon",
      text: "I should be there in a minute, see you there guys",
    },
    {
      userToken: "UoswI6AR19Q6vO5sbn4YvbWzj5uqlNn3",
      firstName: "Chiri",
      lastName: "Kitsu",
      text: "I should be there in a minute, see you guys",
    },
  ]);
=======

>>>>>>> 1a029290ba72da59618f565608e1b31e10315c97
  const [trips, setTrips] = useState([]);
  const user = useSelector((state) => state.user.value);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  // A l'initialisation, récupérer tous les trips associées (avec >1 passengers) au User et afficher les discussions
  useEffect(() => {
    fetch(`${BACK_END_ADDRESS}/users/info/${user.token}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          let tripsTemp = [];
          for (let trip of data.user.trips) {
            if (trip.passengers.length > 1) {
              tripsTemp.push(trip);
            }
          }
          setTrips(tripsTemp);
        }
      });
  }, [refreshing]);

  // Fonction pour déclencher le menu modal
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  let tripsDiscussions = trips.map((trip, i) => {
<<<<<<< HEAD
    return <Discussion key={i} {...trip} messages={messages} />;
=======
    return <Discussion key={i} {...trip} />;
>>>>>>> 1a029290ba72da59618f565608e1b31e10315c97
  });

  return (
    <SafeAreaView style={styles.container}>
      <TopBar toggleModal={toggleModal} />

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search in your discussions"
          onChangeText={(value) => setSearch(value)}
          value={search}
        />
        <TouchableOpacity>
          <FontAwesome5 name="search" size={25} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.discussionsContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {tripsDiscussions}
      </ScrollView>

      <ProfilModal modalVisible={modalVisible} toggleModal={toggleModal} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  searchContainer: {
    flexDirection: "row",
    width: "90%",
    borderBottomWidth: 1,
    height: "10%",
    minHeight: 40,
    margin: 3,
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    width: "90%",
    height: "100%",
  },
  discussionsContainer: {
    width: "100%",
    marginTop: 30,
  },
  discussion: {
    width: "100%",
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    height: 100,
    flexDirection: "row",
  },
  imageContainer: {
    height: "100%",
    width: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  oneImage: {
    height: 64,
    width: 64,
    borderRadius: 50,
  },
  twoImage: {
    height: 48,
    width: 48,
    borderRadius: 50,
  },
  first: {
    top: 10,
    right: 10,
  },
  second: {
    bottom: 10,
    left: 10,
  },
  decriptionContainer: {
    height: "100%",
    width: "50%",
  },
  descriptionHeader: {
    flexDirection: "row",
    width: "100%",
    height: "35%",
    alignItems: "flex-end",
  },
  descriptionBody: {
    marginTop: 5,
    width: "100%",
    height: "50%",
  },
  dateContainer: {
    height: "100%",
    width: "27%",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    paddingTop: 15,
  },
});
