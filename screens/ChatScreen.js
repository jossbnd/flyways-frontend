import {
  Button,
  StyleSheet,
  View,
  TextInput,
  Touchable,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TopBar from "../components/TopBar";
import ProfilModal from "../components/ProfilModal";

// Import des fonts
import StyledRegularText from "../components/StyledBoldText";
import StyledBoldText from "../components/StyledBoldText";
import { useState } from "react";

// Import icones
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default function ChatScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState(null);
  const [discussions, setDiscussions] = useState([
    { text: "Hello" },
    { text: "I should be there in a minute, see you there guys" },
  ]);

  const [passengers, setPassengers] = useState([
    {
      firstName: "Joss",
      lastName: "B.",
      profilePicture:
        "https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg",
    },
    {
      firstName: "Joss",
      lastName: "B.",
      profilePicture:
        "https://res.cloudinary.com/dkx7bnj5n/image/upload/v1666889927/typgtzysqhbpb6khde9g.jpg",
    },
    {
      firstName: "Chiri",
      lastName: "C.",
      profilePicture: null,
    },
    {
        firstName: "Chiri",
        lastName: "C.",
        profilePicture: null,
      },
  ]);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  let passengersName = [];

  if (passengers.length === 2) {
    passengersName.push(
      <StyledRegularText
        key={0}
        title={passengers[1].firstName + " " + passengers[1].lastName}
        style={{ fontSize: 18 }}
      />
    );
  } else if (passengers.length === 3) {
    passengersName.push(
      <StyledRegularText
        key={1}
        title={passengers[1].firstName + " " + passengers[1].lastName}
        style={{ fontSize: 18 }}
      />,
      <StyledRegularText
        key={2}
        title={", " + passengers[2].firstName + " " + passengers[2].lastName}
        style={{ fontSize: 18 }}
      />
    );
  } else {
    passengersName.push(
      <StyledRegularText
        key={4}
        title={passengers[1].firstName + " " + passengers[1].lastName}
        style={{ fontSize: 18 }}
      />,
      <StyledRegularText
        key={5}
        title={
          ", " +
          passengers[2].firstName +
          " " +
          passengers[2].lastName +
          " & others"
        }
        style={{ fontSize: 18 }}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <TopBar toggleModal={toggleModal} navigation={navigation} />

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

      <View style={styles.discussionsContainer}>
        <TouchableOpacity style={styles.discussion}>
          {passengers.length < 3 ? (
            <View style={styles.imageContainer}>
              <Image
                style={styles.oneImage}
                source={
                  passengers[1].profilePicture
                    ? { uri: passengers[1].profilePicture }
                    : require("../assets/profile-picture.jpg")
                }
                resizeMode="contain"
              />
            </View>
          ) : (
            <View style={styles.imageContainer}>
              <Image
                style={[styles.twoImage, styles.first]}
                source={
                  passengers[1].profilePicture
                    ? { uri: passengers[1].profilePicture }
                    : require("../assets/profile-picture.jpg")
                }
                resizeMode="contain"
              />
              <Image
                style={[styles.twoImage, styles.second]}
                source={
                  passengers[2].profilePicture
                    ? { uri: passengers[1].profilePicture }
                    : require("../assets/profile-picture.jpg")
                }
                resizeMode="contain"
              />
            </View>
          )}
          <View style={styles.decriptionContainer}>
            <View style={styles.descriptionHeader}>{passengersName}</View>
            <View style={styles.descriptionBody}>
              <StyledRegularText
                key={0}
                title={'"' + discussions[discussions.length - 1].text + '"'}
                style={{ fontSize: 12, fontStyle: "italic" }}
              />
            </View>
          </View>
          <View style={styles.dateContainer}>
            <StyledRegularText
              key={0}
              title={"Paris, France".slice(0, 10) + '...'}
              style={{ fontSize: 16 }}
            />
            <StyledRegularText
              key={1}
              title={"26 Feb 22"}
              style={{ fontSize: 14, fontStyle: "italic", marginTop: 5 }}
            />
          </View>
        </TouchableOpacity>
        <View style={styles.discussion}></View>
        <View style={styles.discussion}></View>
      </View>

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
    alignItems: 'flex-end',
    paddingTop: 15,
  },
});
