import { useState } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TopBar from "../components/TopBar";

import DateTimePicker from "@react-native-community/datetimepicker";
import formatDate from "../modules/formatDate";

import { BACK_END_ADDRESS } from "../environmentVar";

// Import des fonts
import StyledRegularText from "../components/StyledBoldText";
import StyledBoldText from "../components/StyledBoldText";

// Import icones
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";


export default function EditDateOfBirthScreen({ navigation }) {
  const [dob, setDob] = useState(null);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState(null);

  const user = useSelector((state) => state.user.value);

  const handleDatePicker = (el) => {
    if (el.type == "set") {
      setDate(new Date(el.nativeEvent.timestamp));
      setOpen(false);
      setDob(formatDate(new Date(el.nativeEvent.timestamp)));
      return;
    } else {
      setOpen(false);
      return;
    }
  };

  const handleSubmit = () => {
    fetch(`${BACK_END_ADDRESS}/users/update/${user.token}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ dob }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          setMsg("Date of birth has been updated");
        }
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopBar></TopBar>
      <StyledRegularText
        title="Edit your date of birth :"
        style={styles.text}
      />

      <View style={styles.inputContainer}>
        <View style={styles.dateAndCalendar}>
          <TextInput
            placeholder="Date of Birth DD/MM/YYYY"
            onChangeText={(value) => setDob(value)}
            value={dob}
          />
          <TouchableOpacity onPress={() => setOpen(true)}>
            <FontAwesome5 name="calendar-alt" size={25} />
          </TouchableOpacity>
        </View>
      </View>

      {msg && <Text>{msg}</Text>}

      <TouchableOpacity onPress={() => handleSubmit()} style={styles.button}>
        <Text>Submit</Text>
      </TouchableOpacity>

      {open && (
        <DateTimePicker
          value={date}
          onChange={handleDatePicker}
          onTouchCancel={() => setOpen(false)}
          mode="date"
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
  },
  dateAndCalendar: {
    flexDirection: "row",
  },
  button: {
    width: "75%",
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(30, 168, 95, 0.5)",
  },
});
