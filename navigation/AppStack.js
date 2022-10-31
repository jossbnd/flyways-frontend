import { View, Text, Pressable, MaterialIcons } from "react-native";
import React from "react";

// Navigation
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

// Import des screens
import HomeScreen from "../screens/HomeScreen";
import NotificationScreen from "../screens/NotificationScreen";
import SearchScreen from "../screens/SearchScreen";
import TripScreen from "../screens/TripScreen";
import SearchParametersScreen from "../screens/SearchParametersScreen";
import CreateTripScreen from "../screens/CreateTrip";
import SettingsScreen from "../screens/SettingsScreen";
import PersonalInformationScreen from "../screens/PersonalInformationScreen";
import SecuritySettingsScreen from "../screens/SecuritySettingsScreen";
import EditDateOfBirthScreen from "../screens/EditDateOfBirth";
import EditGenderScreen from "../screens/EditGender";
import EditLanguagesScreen from "../screens/EditLanguages";
import SearchResultScreen from "../screens/SearchResultScreen";
import ChatScreen from "../screens/ChatScreen";

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

// Composition du bottom tab navigator
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "";

          if (route.name === "My Profile") {
            iconName = "luggage";
          } else if (route.name === "Search") {
            iconName = "search";
          } else if (route.name === "Notification") {
            iconName = "notifications";
          } else if (route.name === "Chat") {
            return <View style={{ display: "none" }}></View>;
          }
          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#1EA85F",
        tabBarInactiveTintColor: "#335561",
        tabBarStyle: { paddingBottom: 10, paddingTop: 5, height: 55 },
        headerShown: false,
        tabBarButton: (props) => {
          if (route.name === "Chat" || route.name === "Trip") {
            return null;
          } else {
            return <Pressable {...props}></Pressable>;
          }
        },
      })}
    >
      <Tab.Screen name="My Profile" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Notification" component={NotificationScreen} />
      <Tab.Screen name="Trip" component={TripScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
    </Tab.Navigator>
  );
};

export default function AppStack() {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="TabNavigator" component={TabNavigator} />

      <Drawer.Screen name="Search" component={SearchScreen} />
      <Drawer.Screen name="SearchResult" component={SearchResultScreen} />
      <Drawer.Screen name="CreateTrip" component={CreateTripScreen} />
      <Drawer.Screen
        name="SearchParameters"
        component={SearchParametersScreen}
      />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen
        name="PersonalInformation"
        component={PersonalInformationScreen}
      />
      <Drawer.Screen
        name="SecuritySettings"
        component={SecuritySettingsScreen}
      />
      <Drawer.Screen name="EditDateOfBirth" component={EditDateOfBirthScreen} />
      <Drawer.Screen name="EditGender" component={EditGenderScreen} />
      <Drawer.Screen name="EditLanguages" component={EditLanguagesScreen} />
    </Drawer.Navigator>
  );
}
