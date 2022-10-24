import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SignUpScreen({ navigation }) {

  const [email, setEmail] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [dob, setDob] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordCheck, setPasswordCheck] = useState(null);


 return (
   <View>
    <Text style={styles.title}>Create an account</Text>
    <View style={styles.inputsContainer}>
      <TextInput placeholder='E-mail address' onChangeText={(value) => setEmail(value)} value={email} />
      <TextInput placeholder='First Name' onChangeText={(value) => setFirstName(value)} value={firstName}/>
      <TextInput placeholder='Last Name' />
      <TextInput placeholder='Password' />
      <TextInput placeholder='Confirm Password' />
    </View>
    <TouchableOpacity>
      <Text>Continue</Text>
    </TouchableOpacity>
   </View>
 );
}

const styles = StyleSheet.create({

})