import { Button, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";


// Import des fonts
import StyledRegularText from "../components/StyledBoldText";
import StyledBoldText from "../components/StyledBoldText";

export default function HomeScreen({ navigation }) {
 return (
  <SafeAreaView style={styles.container}>
    <StyledRegularText title='WELCOME ON HOME SCREEN' />


  </SafeAreaView>
 );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})