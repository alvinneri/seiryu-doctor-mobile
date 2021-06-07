import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import * as React from "react";

import AuthStack from "./stack/auth";
import HomeStack from "./stack/home";
import MainTab from "./tabs";
import { Auth } from "../components/Auth";

const Stack = createStackNavigator();

export default function RootNavigator({ navigation }) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false, gestureEnabled: false }}
      >
        <Stack.Screen name="AuthStack" component={AuthStack} />
        <Stack.Screen name="HomeStack" component={MainTab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
