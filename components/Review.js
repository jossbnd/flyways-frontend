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
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

//Import hooks + redux
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// adresse déploiement
const BACK_END_ADDRESS = "https://flyways-backend.vercel.app";

export default function Review(props) {
  /****** STORE REDUX ******/
  const user = useSelector((state) => state.user.value);
  /****** ETATS ******/
  const [text, setText] = useState(null);
  // Etat pour la photo de profil
  const [profilePicture, setProfilePicture] = useState(null);
  // Etat pour la note de chaque passager
  const [score, setScore] = useState(0);
  const [isDone, setIsDone] = useState(props.isDone);
  /* ******************** */

  // Mise en place de la note
  const personalStars = [];
  for (let i = 0; i < 5; i++) {
    let style = { color: "#f1c40f", fontSize: 28 };
    let name = "star-o";
    if (i < score) {
      style = { color: "#f1c40f", fontSize: 28 };
      name = "star";
    }
    personalStars.push(
      <FontAwesome
        key={i}
        name={name}
        onPress={() => setScore(i + 1)}
        style={style}
      />
    );
  }
  /* ******************** */

  /****** FONCTIONS ******/
  // fonction sur le done
  const handleDone = () => {
    console.log("review done");
    const date = new Date();
    const newReview = {
      authorToken: user.token, // utilisateur qui laisse l'avis
      score: score,
      text: text,
      date: date,
    };

    fetch(`${BACK_END_ADDRESS}/reviews/post/${props.passengerToken}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newReview),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
    setIsDone(true);
    props.addCount();
  };

  if (isDone) {
    return;
  }

  /* ******************** */

  /* RETURN de la fonction REVIEW */
  return (
    <View style={styles.card}>
      <View style={styles.topCard}>
        <TouchableOpacity>
          <Image
            style={styles.profilePicture}
            source={
              props.profilePicture
                ? { uri: props.profilePicture }
                : require("../assets/profile-picture.jpg")
            }
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View style={styles.topCardName}>
          <StyledRegularText
            title={`${props.firstName} ${props.lastName[0]}.`}
          />
        </View>
        <View style={styles.notation}>
          <View style={styles.starsView}>{personalStars}</View>
          <View style={styles.scoreView}>
            <StyledBoldText title={`${score}/5`} />
          </View>
        </View>
      </View>
      <View style={styles.bottomCard}>
        <View>
          <TextInput
            style={styles.commentInput}
            placeholder="Leave a comment..."
            onChangeText={(value) => setText(value)}
            value={text}
          ></TextInput>
        </View>
        <View style={styles.buttonsView}>
          <TouchableOpacity
            style={styles.doneButton}
            onPress={() => handleDone()}
          >
            <StyledBoldText title="DONE" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 200,
    width: "90%",
    marginTop: 5,
    marginBottom: 20,
    borderColor: "rgba(30, 168, 95, 0.5)",
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
  },
  topCard: {
    width: "90%",
    marginTop: 10,
    marginLeft: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  topCardName: {
    flexDirection: "row",
    marginLeft: 10,
    width: '30%',
  },
  profilePicture: {
    height: 48,
    width: 48,
    borderRadius: 50,
    marginBottom: 5,
  },
  bottomCard: {
    width: "100%",
    height: "60%",
    marginTop: 10,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  buttonsView: {
    width: '100%',
    justifyContent: "center",
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  doneButton: {
    width: 100,
    borderColor: "#1EA85F",
    backgroundColor: "rgba(30, 168, 95, 0.5)",
    borderWidth: 1,
    borderRadius: 20,
    padding: 5,
    alignItems: "center",
  },
  commentInput: {
    height: "80%",
    width: 300,
    borderColor: "rgba(0, 0, 0, 0.4)",
    borderWidth: 1,
    marginTop: 15,
    padding: 5,
  },
  starsView: {
    width: "65%",
    height: "100%",
    borderRadius: 10,
    padding: 5,
    flexDirection: "row",
    justifyContent: "center",
  },
  scoreView: {
    marginLeft: 30
  },
  notation: {
    flexDirection: "row",
    alignItems: "center",
    width: "60%",
  },
});
