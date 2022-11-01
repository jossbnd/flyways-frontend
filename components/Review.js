import React from "react";
// Import des balises
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";

// Import des fonts
import StyledRegularText from "../components/StyledBoldText";
import StyledBoldText from "../components/StyledBoldText";

// Import icones
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";

//Import hooks + redux
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Review(props) {
  const [personalNote, setPersonalNote] = useState(0);

  // Personal note
  const personalStars = [];
  for (let i = 0; i < 5; i++) {
    let style = { color: "#f1c40f", fontSize: 32 };
    let name = "star-o";
    if (i < personalNote) {
      style = { color: "#f1c40f", fontSize: 32 };
      name = "star";
    }
    personalStars.push(
      <FontAwesome
        key={i}
        name={name}
        onPress={() => setPersonalNote(i + 1)}
        style={style}
      />
    );
  }
  return (
    <View style={styles.card}>
      <View style={styles.topCard}>
        <TouchableOpacity>
          <Image source={props.profilePicture} style={styles.profilePicture} />
        </TouchableOpacity>
        <View style={styles.topCardName}>
          <StyledRegularText title={`${props.firstName}`} />
          <StyledRegularText title={`${props.lastName}`} />
        </View>
        <View style={styles.notation}>
          <View style={styles.starsView}>{personalStars}</View>
          <View>
            <StyledBoldText title={`${personalNote}/5`} />
          </View>
        </View>
      </View>
      <View style={styles.bottomCard}>
        <View style={styles.commentView}>
          <StyledBoldText title="Leave a comment" />
        </View>
        <View>
          <TextInput style={styles.commentInput}></TextInput>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 200,
    width: "100%",
    marginTop: 5,
    marginBottom: 20,
    borderColor: "#1EA85F",
    borderWidth: 1,
    borderRadius: 8,
  },
  topCard: {
    width: "100%",
    marginTop: 10,
    marginLeft: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  topCardName: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: 100,
  },

  profilePicture: {
    height: 50,
    width: 50,
    borderWidth: 1,
    borderColor: "black",
  },
  bottomCard: {
    width: "100%",
    height: "60%",
    marginTop: 10,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  commentView: {
    borderColor: "#1EA85F",
    backgroundColor: "rgba(30, 168, 95, 0.5)",
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    width: "40%",
    alignItems: "center",
  },
  commentInput: {
    height: "80%",
    width: 300,
    backgroundColor: "rgba(30, 168, 95, 0.5)",
    borderWidth: 1,
    marginTop: 15,
  },
  starsView: {
    width: "65%",
    height: "100%",
    borderRadius: 10,
    padding: 5,
    flexDirection: "row",
    justifyContent: "center",
  },
  notation: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "60%",
    paddingRight: 15,
  },
});
