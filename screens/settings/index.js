import React, { useState, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Input, Button, Avatar } from "react-native-elements";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { Logo } from "../../assets";
import firebase, { auth, db } from "../../firebase/config";
import Toast from "react-native-toast-message";

const SettingsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Settings</Text>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: "#D1EEFE",
  },
});
