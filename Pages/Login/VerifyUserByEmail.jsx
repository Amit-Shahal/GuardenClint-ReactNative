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

export default function VerifyUserByEmail({ navigation }) {
  const [isLoading, setisLoading] = useState(false);
  var email = "albert";

  const sendEmailToUser = async () => {
    setisLoading(true);
    const url =
      "http://proj.ruppin.ac.il/bgroup18/prod/api/userLogin/sendOtpByEmail";
    let user = {
      Email: email,
    };
    let isEmailSent = false;
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
          isEmailSent = result;
        },
        (error) => {
          console.log("err post=", error);
        }
      );
    setisLoading(false);
    if (isEmailSent === true) {
      navigation.navigate("VerifyOTP", { Email: email });
    } else {
      alert("Email not found in our Guarden");
    }
  };

  return (
    <View style={styles.container}>
      <Animatable.View style={styles.header} animation="bounceInRight">
        <Text style={styles.title}>step 1 of 3</Text>
      </Animatable.View>
      {isLoading ? (
        <Animatable.View
          style={[styles.footer, { justifyContent: "flex-start" }]}
          animation="bounceInDown"
          duration={1000}
        >
          <Text style={styles.title}>Sending you an Email...</Text>
          <ActivityIndicator size="large" />
        </Animatable.View>
      ) : (
        <View style={styles.footer}>
          <Text>
            Please enter your email address to receive a verification code
          </Text>
          <TextInput
            style={styles.textInput}
            keyboardType="email-address"
            placeholder="Email"
            leftIcon={{ type: "Entypo", name: "email" }}
            onChangeText={(value) => (email = value)}
          />
          <TouchableOpacity style={styles.btn} onPress={sendEmailToUser}>
            <Text style={styles.btbText}>Email me 6 digits passcode</Text>
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
  textInput: {
    height: 50,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
  btn: {
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    borderWidth:3,
    backgroundColor: "#009387",
    alignSelf: "center",
    width: 200,
    height: 40,
  },
  btbText: {
    fontWeight: "bold",
    color: "white",
  },
});
