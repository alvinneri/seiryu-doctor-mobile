import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Input, Button, Avatar } from "react-native-elements";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { Logo } from "../../assets";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import firebase, { auth, db } from "../../firebase/config";
import PhoneInput from "react-native-phone-number-input";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setUser } from "../../redux/public/actions";
import { useDispatch } from "react-redux";
import { useIsFocused } from "@react-navigation/core";
import { Auth } from "../../components/Auth";

const LoginScreen = ({ navigation }) => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [code, setCode] = useState("");
  const dispatch = useDispatch();
  const [isSend, setIsSend] = useState(false);
  const recaptchaVerifier = useRef(null);
  const phoneInput = useRef(null);
  const userRef = db.collection("users");
  const isFocused = useIsFocused();

  useEffect(() => {
    (async () => {
      const user = await AsyncStorage.getItem("user");
      console.log(user, "user");
      if (user) {
        dispatch(setUser(JSON.parse(user)));
        navigation.navigate("HomeStack", { screen: "Home" });
      }
    })();
  }, [isFocused]);

  const handleLogin = async () => {
    const snapshot = await userRef
      .where("mobileNumber", "==", mobileNumber.substring(1))
      .get();

    if (snapshot.empty) {
      Toast.show({
        position: "top",
        text1: "Phone number is not registered.",
      });
      return;
    }

    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider
      .verifyPhoneNumber(mobileNumber, recaptchaVerifier.current)
      .then((res) => {
        navigation.navigate("Code", {
          _verificationId: res,
          mobileNumber: mobileNumber,
        });
      })
      .catch((err) => {
        Toast.show({
          position: "top",
          text1: err.message,
        });
      });
  };

  return (
    <Auth>
      <View style={styles.container}>
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={firebase.app().options}
        />
        <View>
          <View
            style={{
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              marginBottom: heightPercentageToDP("7%"),
            }}
          >
            <Avatar rounded source={Logo} size="xlarge" />
          </View>
          <PhoneInput
            ref={phoneInput}
            defaultValue={mobileNumber}
            defaultCode="PH"
            layout="first"
            onChangeFormattedText={(text) => {
              setMobileNumber(text);
            }}
            withDarkTheme
            withShadow
            autoFocus
            containerStyle={styles.input}
          />

          <Button
            buttonStyle={styles.btn}
            onPress={handleLogin}
            title="LOGIN"
          />
        </View>
      </View>
    </Auth>
  );
};

export default LoginScreen;

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
  input: {
    justifyContent: "center",
    alignContent: "center",
    width: widthPercentageToDP("80"),
    marginVertical: 10,
  },
});
