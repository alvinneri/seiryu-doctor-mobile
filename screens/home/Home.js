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

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
    </View>
  );
};

export default HomeScreen;

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
