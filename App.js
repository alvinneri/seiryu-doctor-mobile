import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as StateProvider, useSelector } from "react-redux";
import { View, KeyboardAvoidingView, Platform } from "react-native";
import Navigation from "./navigation";
import Toast from "react-native-toast-message";
import store from "./redux/store";
import { Auth } from "./components/Auth";

export default function App({ navigation }) {
  return (
    <StateProvider store={store}>
      <View style={{ flex: 1, backgroundColor: "#D1EEFE" }}>
        <SafeAreaProvider>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior="padding"
            enabled={Platform.OS === "ios" ? true : false}
          >
            <Navigation />
            <Toast ref={(ref) => Toast.setRef(ref)} />
          </KeyboardAvoidingView>
        </SafeAreaProvider>
      </View>
    </StateProvider>
  );
}
