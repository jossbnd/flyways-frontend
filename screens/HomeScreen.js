import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TopBar from "../components/TopBar";

// Import des fonts
import StyledRegularText from "../components/StyledBoldText";
import StyledBoldText from "../components/StyledBoldText";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// Import FontAwesome
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

// Import composants upcoming trips
import UpcomingTrips from "../components/UpcomingTrips";

const BACK_END_ADDRESS = "https://flyways-backend.vercel.app/";


export default function HomeScreen({ navigation }) {


  const [upcomingTrips, setUpcomingTrips] = useState([]);
  const [test, setTest] = useState(false);


  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    fetch(`${BACK_END_ADDRESS}/users/info/${user.token}`)
    .then(res => res.json())
    .then(data => {
      console.log(data.user.trips);
    })

  }, [test])


  return (
    <SafeAreaView style={styles.container}>
      <TopBar /> 
      <View style={styles.profileContainer}>
        <Image source={require('../assets/profile-picture.jpg')} style={styles.profilePicture}/>
        <StyledBoldText title={user.firstName + ' ' + user.lastName} style={styles.userName} />
        <View style={styles.reviewContainer}>
          <FontAwesome name='star' size={20} style={{ marginRight: 5, color: '#f1c40f' }}/>
          <StyledRegularText title='4.5 / 5 (26 reviews)' style={styles.reviews} />
        </View>
        <TouchableOpacity style={styles.sarchButton} onPress={() => setTest(!test)}>
          <StyledRegularText title='Search for a Trip' style={styles.textButton} />
          <FontAwesome5 name='search' size={38} color='#ffffff' />
        </TouchableOpacity>
        <StyledRegularText title='Upcoming Trips' style={styles.upcomingTripsTitle} />
        <View style={styles.upcomingTripsContainer}>
          <UpcomingTrips arrival='Paris' passengers='2' capacity='5' date='02 Nov 22' time='9h30'  />
          <UpcomingTrips />

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
    justifyContent: 'center',
    marginTop: 5
  },
  reviews: {
    fontSize: 12
  },
  sarchButton: {
    height: 77,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#1EA85F',
    borderRadius: 5,
    paddingHorizontal: 30,
    marginTop: 30
  },
  textButton: {
    color: '#ffffff',
    fontSize: 26,
  },
  upcomingTripsTitle :{
    fontSize: 22,
    marginTop: 30,
  },
  upcomingTripsContainer: {
    width: '90%',
    marginTop: 10,
  }
});
