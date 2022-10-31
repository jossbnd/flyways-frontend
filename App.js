import 'react-native-gesture-handler';

// Composants
import { Pressable, StyleSheet, Text, View } from "react-native";

// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Import de la navigation
import AuthStack from "./navigation/AuthStack";
import AppStack from "./navigation/AppStack";

// Import des screens
import LoadingScreen from "./screens/LoadingScreen";
import LoginScreen from "./screens/LoginScreen";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import PhoneScreen from "./screens/PhoneScreen";
import PhoneVerification from "./screens/PhoneVerification";
import HomeScreen from "./screens/HomeScreen";
import NotificationScreen from "./screens/NotificationScreen";
import SearchScreen from "./screens/SearchScreen";
import TripScreen from "./screens/TripScreen";
import SearchParametersScreen from "./screens/SearchParametersScreen";
import CreateTripScreen from "./screens/CreateTrip";
import SettingsScreen from "./screens/SettingsScreen";
import PersonalInformationScreen from "./screens/PersonalInformationScreen";
import SecuritySettingsScreen from "./screens/SecuritySettingsScreen";
import EditDateOfBirthScreen from "./screens/EditDateOfBirth";
import EditGenderScreen from "./screens/EditGender";
import EditLanguagesScreen from "./screens/EditLanguages";

// Import icons
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

// redux imports
import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import user from "./reducers/user";

// redux-persist imports
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

const reducers = combineReducers({ user });
const persistConfig = {
  key: "flyways",
  storage: AsyncStorage,
};

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator>
            <StackScreen name='AuthStack' component={AuthStack} />
            {/* <StackScreen name='AppStack' component={AppStack} /> */}
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({});
