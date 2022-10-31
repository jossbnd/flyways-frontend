// Composants
import { Pressable, StyleSheet, Text, View } from "react-native";

// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

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
import SearchResultScreen from "./screens/SearchResultScreen";

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

const Stack = createNativeStackNavigator();
// Bottom Tab navigator
const Tab = createBottomTabNavigator();

// Composition du bottom tab navigator
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "";

          if (route.name === "My Trips") {
            iconName = "luggage";
          } else if (route.name === "Search") {
            iconName = "search";
          } else if (route.name === "Notification") {
            iconName = "notifications";
          }
          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#1EA85F",
        tabBarInactiveTintColor: "#335561",
        tabBarStyle: { paddingBottom: 10, paddingTop: 5, height: 55 },
        headerShown: false,
        tabBarButton: (props) => {
          if (route.name === "Trip") {
            return null;
          } else {
            return <Pressable {...props}></Pressable>;
          }
        },
      })}
    >
      <Tab.Screen name="My Trips" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Notification" component={NotificationScreen} />
      <Tab.Screen name="Trip" component={TripScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Loading" component={LoadingScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="Phone" component={PhoneScreen} />
            <Stack.Screen
              name="PhoneVerification"
              component={PhoneVerification}
            />
            <Stack.Screen name="SearchResult" component={SearchResultScreen} />
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({});
