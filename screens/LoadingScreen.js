import { Button, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StyledText from "../components/StyledRegularText";

export default function LoadingScreen({ navigation }) {
 return (
   <SafeAreaView style={styles.container}>
    <StyledRegularText title='FlyWays' />
    <Text>FyWays</Text>

   </SafeAreaView>
 );
}

const styles = StyleSheet.create({

})