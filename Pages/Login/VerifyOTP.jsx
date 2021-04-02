import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import * as Animatable from "react-native-animatable";

export default function VerifyOTP({ navigation, route }) {
  const [isLoading, setisLoading] = useState(false);
  var otp = "albert";

  const verifyUsersOtp = async () => {
    setisLoading(true);
    const url = "http://proj.ruppin.ac.il/bgroup18/prod/api/userLogin/checkOtp";
    let user = {
      Email: route.params.Email,
      OTP: otp,
    };
    let isOtpVerified = false;
    await fetch(url, {
      method: "POST",
      body: JSON.stringify(user),
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8",
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then(
        (result) => {
          isOtpVerified = result;
        },
        (error) => {
          console.log("err post=", error);
        }
      );
    setisLoading(false);
    if (isOtpVerified === true) {
      navigation.navigate("ResetPassword", { Email: route.params.Email });
    } else {
      alert("Passcode is worng");
    }
  };

  return (
    <View style={styles.container}>
      <Animatable.View style={styles.header} animation="bounceInRight">
        <Text style={styles.title}>step 2 of 3</Text>
      </Animatable.View>
      {isLoading ? (
        <Animatable.View
          style={[styles.footer, { justifyContent: "flex-start" }]}
          animation="bounceInDown"
          duration={1000}
        >
          <Text style={styles.title}>Checking 6 digits passcode...</Text>
          <ActivityIndicator size="large" />
        </Animatable.View>
      ) : (
        <View style={styles.footer}>
          <TextInput
            style={styles.textInput}
            keyboardType="numeric"
            placeholder="6 digit passcode"
            onChangeText={(value) => (otp = value)}
          />
          <TouchableOpacity style={styles.btn} onPress={verifyUsersOtp}>
            <Text style={styles.btbText}>OK</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#009387",
  },
  header: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-end",
    flexDirection: "row",
  },
  footer: {
    flex: 2,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
    borderWidth:3,
    borderColor: 'black',
  },

  title: {
    color: "#000000",
    fontSize: 40,
    fontWeight: "bold",
  },
  btn: {
    marginTop: 15,
    borderWidth:3,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    backgroundColor: "#009387",
    alignSelf: "center",
    width: 100,
    height: 40,
  },
  textInput: {
    alignSelf: "center",
    height: 50,
    width: 150,
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
  btbText: {
    fontWeight: "bold",
    color: "white",
  },
});
