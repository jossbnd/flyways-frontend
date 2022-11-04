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

import { BACK_END_ADDRESS } from "../environmentVar";

// Import des fonts
import StyledRegularText from "../components/StyledBoldText";
import StyledBoldText from "../components/StyledBoldText";

// Import icones
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

// Import de la dropdown list
import SelectList from "react-native-dropdown-select-list";

export default function EditGenderScreen({ navigation }) {
  const [gender, setGender] = useState(null);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState(null);

  //  variables dropdown list
  const [selected, setSelected] = useState("");
  const data = [
    { key: "1", value: "male" },
    { key: "2", value: "female" },
  ];

  const user = useSelector((state) => state.user.value);

  const handleSubmit = () => {
    fetch(`${BACK_END_ADDRESS}/users/update/${user.token}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ gender }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          setMsg("User gender has been updated");
        }
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopBar></TopBar>
      <StyledRegularText title="Edit gender :" style={styles.text} />

      <View style={styles.inputContainer}>
        <View style={styles.dateAndCalendar}>
          <SelectList
            setSelected={setSelected}
            data={data}
            onSelect={() => {
                setGender(data[selected-1].value) // -1 parce que le tableau "data" est indexé sur 0
            }}
          />
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
