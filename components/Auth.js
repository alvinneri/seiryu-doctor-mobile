import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { db, auth } from "../firebase/config";
import { setUser } from "../redux/public/actions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";

export const Auth = ({ children }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  console.log(navigation, "navigation");
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      try {
        console.log(user.uid, "auth change");
        dispatch(setUser(user.uid));
        try {
          await AsyncStorage.setItem("user", JSON.stringify(user));
          navigation.navigate("Home");
        } catch (error) {
          Toast.show({
            position: "top",
            text1: error.message,
          });
          console.log(error);
        }
      } catch (err) {
        console.log(err);
      }
    });
  }, []);

  return <React.Fragment>{children}</React.Fragment>;
};
