import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../../../screens/auth/Login";
import CodeScreen from "../../../screens/auth/CodeVerification";
import { Auth } from "../../../components/Auth";
// * stack instance
const AuthStack = createStackNavigator();

export default ({ navigation }) => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
        headerTransparent: true,
        gestureEnabled: false,
        headerStyle: { elevation: 2 },
        cardStyle: { backgroundColor: "#e4fbff" },
      }}
    >
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Code" component={CodeScreen} />
    </AuthStack.Navigator>
  );
};
