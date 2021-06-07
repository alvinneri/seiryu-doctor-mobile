import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SettingsScreen from "../../../screens/settings";
// * stack instance
const SettingStack = createStackNavigator();

export default ({ navigation }) => {
  return (
    <SettingStack.Navigator
      screenOptions={{
        headerShown: false,
        headerTransparent: true,
        gestureEnabled: false,
        headerStyle: { elevation: 2 },
        cardStyle: { backgroundColor: "#e4fbff" },
      }}
    >
      <SettingStack.Screen name="Settings" component={SettingsScreen} />
    </SettingStack.Navigator>
  );
};
