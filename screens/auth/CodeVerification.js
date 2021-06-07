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
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/public/actions";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CodeScreen = ({ navigation, route }) => {
  const { _verificationId, mobileNumber } = route.params;
  const phoneInput = useRef(null);
  const [verificationId, setVerificationId] = useState(null);
  const recaptchaVerifier = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setVerificationId(_verificationId);
  }, [_verificationId]);

  const [code, setCode] = useState("");
  const userRef = db.collection("users");

  const handleLogin = async () => {
    const credential = await firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      code
    );
    firebase
      .auth()
      .signInWithCredential(credential)
      .then(async (result) => {
        // Do something with the results here
        console.log(result, "result");
        const snapshot = await userRef
          .where("mobileNumber", "==", mobileNumber)
          .get();

        snapshot.forEach(async (doc) => {
          const user = { ...doc.data(), id: doc.id };
          console.log(user, "user");
          dispatch(setUser(user));
        });
      })
      .catch((err) => {
        console.log(err);
        Toast.show({
          position: "top",
          text1: err.message,
        });
      });
  };

  const handleResend = () => {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider
      .verifyPhoneNumber(mobileNumber, recaptchaVerifier.current)
      .then((res) => {
        setVerificationId(res);
      })
      .catch((err) => {
        Toast.show({
          position: "top",
          text1: err.message,
        });
      });
  };

  return (
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
          disabled={true}
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

        <Input
          value={code}
          onChangeText={(text) => setCode(text)}
          keyboardType="numeric"
          inputContainerStyle={styles.input}
          placeholder="Code"
          leftIcon={{ type: "font-awesome", name: "key" }}
        />

        <Button buttonStyle={styles.btn} onPress={handleLogin} title="LOGIN" />
        <Button
          buttonStyle={styles.btn}
          onPress={handleResend}
          title="RESEND CODE"
        />
      </View>
    </View>
  );
};

export default CodeScreen;

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
  btn: {
    marginVertical: 10,
  },
});
