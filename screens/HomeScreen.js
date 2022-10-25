import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TopBar from "../components/TopBar";

// Import des fonts
import StyledRegularText from "../components/StyledBoldText";
import StyledBoldText from "../components/StyledBoldText";
import { useSelector } from "react-redux";

// Import FontAwesome
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function HomeScreen({ navigation }) {

  const user = useSelector((state) => state.user.value);




  return (
    <SafeAreaView style={styles.container}>
      <TopBar /> 
      <View style={styles.profileContainer}>
        <Image source={require('../assets/profile-picture.jpg')} style={styles.profilePicture}/>
        <StyledBoldText title={user.firstName + ' ' + user.lastName} style={styles.userName} />
        <View style={styles.reviewContainer}>
          <FontAwesome name='star' size={20} style={{ marginRight: 5, color: '#f1c40f' }}/>
          <StyledRegularText title='4.5 / 5 (26 reviews)' />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  profileContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  profilePicture: {
    height: 150,
    width: 150,
    borderRadius: 100,
    marginTop: 50
  },
  userName: {
    marginTop: 20,
    fontSize: 20,
  },
  reviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
