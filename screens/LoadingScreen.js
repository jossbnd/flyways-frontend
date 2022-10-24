import { Button, StyleSheet, Text, View } from 'react-native';
import StyledText from "../components/StyledText";

export default function LoadingScreen({ navigation }) {
 return (
   <View style={styles.container}>
    <StyledText title='HELLO WORLD' />
    <Text>HELLO WORLD</Text>

   </View>
 );
}

const styles = StyleSheet.create({
  
})